from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS
import redis
import json
import os
from dotenv import load_dotenv
from espn_api.football import League

# Load environment variables
load_dotenv()
app = Flask(__name__)

# Configure CORS to allow requests from localhost:3000
CORS(app, resources={r"/*": {"origins": "http://localhost:3001"}})

# Redis configuration
REDIS_HOST = os.getenv('WEEKLY_URL')
REDIS_PORT = int(os.getenv('WEEKLY_PORT'))
REDIS_PASSWORD = os.getenv('WEEKLY_CACHE_KEY')


# Initialize Redis client
redis_stats_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    password=REDIS_PASSWORD,
    decode_responses=True  # Automatically decode responses to strings
)


REDIS_LINES_PASSWORD = os.getenv('BETTING_LINES_CACHE_KEY')
REDIS_LINES_HOST = os.getenv('BETTING_LINES_URL', 'redis-10594.c270.us-east-1-3.ec2.redns.redis-cloud.com')
REDIS_LINES_PORT = int(os.getenv('BETTING_LINES_PORT', 10594))

redis_lines_client = redis.Redis(
    host=REDIS_LINES_HOST,
    port=REDIS_LINES_PORT,
    password=REDIS_LINES_PASSWORD,
 # Automatically decode responses to strings
)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        redis_stats_client.ping()
        return jsonify({'status': 'healthy', 'redis': 'connected'})
    except redis.ConnectionError:
        return jsonify({'status': 'unhealthy', 'redis': 'disconnected'}), 503
    

@app.route('/player/<player_name>', methods=['GET'])
def get_player(player_name):
    """Get player stats by name"""
    try:
        id = get_player_id_by_name(player_name)
        # Try to get player stats from Redis
        player_stats = redis_stats_client.get(f'player_stats:{id}')
        
        if player_stats:
            return jsonify(json.loads(player_stats))
        else:
            return jsonify({'error': 'Player not found'}), 404
            
    except redis.RedisError as e:
        app.logger.error(f"Redis error: {str(e)}")
        return jsonify({'error': 'Database error'}), 500
    except json.JSONDecodeError as e:
        app.logger.error(f"JSON decode error: {str(e)}")
        return jsonify({'error': 'Data format error'}), 500
    except Exception as e:
        app.logger.error(f"Unexpected error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/fantasy/<league_id>', methods=['GET'])
def get_fantasy_league(league_id):
    try:
        league = League(league_id, year=2024)
        print(league.teams)
        return_teams = {}
        for team in league.teams:
            return_teams[team.team_id] = team.team_name
        return jsonify(return_teams)
    except Exception as e:
        app.logger.error(f"Unexpected error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/fantasy/<league_id>/roster/<team_id>', methods=['GET'])
def get_fantasy_roster_by_team_id(league_id, team_id):
    try:
        league = League(league_id, year=2024)
        roster = league.teams[int(team_id)-1].roster
        return_roster = {}
        for player in roster:
            return_roster[player.playerId] = player.name
        return jsonify(return_roster)
    except Exception as e:
        app.logger.error(f"Unexpected error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


def get_player_id_by_name(player_name):
    return json.loads(redis_stats_client.get(f"player_name_to_player_id:{player_name}"))


@app.route('/player/<player_name>/id', methods=['GET'])
def get_player_id(player_name):
    return get_player_id_by_name(player_name)


@app.route('/player/<player_name>/season', methods=['GET'])
def get_player_season_stats(player_name):
    player_id = get_player_id_by_name(player_name)
    player_stats = redis_stats_client.get(f"player_season_stats:{player_id}")
    player_season_stats = json.loads(player_stats)['season_stats']
    return jsonify(player_season_stats)
    

@app.route('/player/<player_name>/weekly', methods=['GET'])
def get_player_weekly_stats(player_name):
    player_id = get_player_id_by_name(player_name)
    player_stats = redis_stats_client.get(f"player_weekly_stats:{player_id}")
    player_weekly_stats = json.loads(player_stats)['weekly_stats']
    return jsonify(player_weekly_stats)


@app.route('/player/<player_name>/lines', methods=['GET'])
def get_player_lines(player_name):
    print(player_name)
    player_id = get_player_id_by_name(player_name)
    print(player_id)
    player_lines = redis_lines_client.get(f"player_lines:{player_id}")
    return jsonify(json.loads(player_lines))


@app.route('/players', methods=['GET'])
def get_all_players():
    """Get all players"""
    try:
        # Get all keys matching the pattern
        keys = redis_stats_client.keys('player_stats:*')
        players = []
        
        for key in keys:
            player_data = redis_stats_client.get(key)
            if player_data:
                players.append(json.loads(player_data))
        
        return jsonify(players)
    except Exception as e:
        app.logger.error(f"Error fetching players: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.getenv('PORT', 5001))
    
    # Set debug mode based on environment
    debug = os.getenv('FLASK_ENV') == 'development'
    
    app.run(host='0.0.0.0', port=port, debug=debug)

