from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS
import redis
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Redis configuration
REDIS_HOST = os.getenv('REDIS_HOST', 'redis-11531.c73.us-east-1-2.ec2.redns.redis-cloud.com')
REDIS_PORT = int(os.getenv('REDIS_PORT', 11531))
REDIS_PASSWORD = os.getenv('REDIS_PASSWORD', '6YlddKvp2Dtwg7I97jMeCOk3Pu8bcKjA')

# Initialize Redis client
redis_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    password=REDIS_PASSWORD,
    decode_responses=True  # Automatically decode responses to strings
)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        redis_client.ping()
        return jsonify({'status': 'healthy', 'redis': 'connected'})
    except redis.ConnectionError:
        return jsonify({'status': 'unhealthy', 'redis': 'disconnected'}), 503
    

@app.route('/player/<player_name>', methods=['GET'])
def get_player(player_name):
    """Get player stats by name"""
    try:
        # Try to get player stats from Redis
        player_stats = redis_client.get(f'player_stats:{player_name}')
        
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
    
def get_player_id(player_name):
    return redis_client.get(f"player_name_to_player_id:{player_name}")


@app.route('/player/<player_name>/id', methods=['GET'])
def get_player_id(player_name):
    return get_player_id(player_name)


@app.route('/player/<player_name>/season', methods=['GET'])
def get_player_season_stats(player_name):
    player_id = get_player_id(player_name)
    player_stats = redis_client.get(f"player_season_stats:{player_id}")
    player_season_stats = json.loads(player_stats)['season_stats']
    return jsonify(player_season_stats)
    

@app.route('/player/<player_name>/weekly', methods=['GET'])
def get_player_weekly_stats(player_name):
    player_id = get_player_id(player_name)
    player_stats = redis_client.get(f"player_weekly_stats:{player_id}")
    player_weekly_stats = json.loads(player_stats)['weekly_stats']
    return jsonify(player_weekly_stats)


@app.route('/players', methods=['GET'])
def get_all_players():
    """Get all players"""
    try:
        # Get all keys matching the pattern
        keys = redis_client.keys('player_stats:*')
        players = []
        
        for key in keys:
            player_data = redis_client.get(key)
            if player_data:
                players.append(json.loads(player_data))
        
        return jsonify(players)
    except Exception as e:
        app.logger.error(f"Error fetching players: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.getenv('PORT', 5001))
    
    # Set debug mode based on environment
    debug = os.getenv('FLASK_ENV') == 'development'
    
    app.run(host='0.0.0.0', port=port, debug=debug)

