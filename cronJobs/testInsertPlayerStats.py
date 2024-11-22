import redis
import json
import os
# Connect to Redis
r = redis.Redis(
    host='redis-11531.c73.us-east-1-2.ec2.redns.redis-cloud.com',
    port=11531,
    password=os.getenv('STATS_CACHE_KEY'))

def test_player_stats_insertion():
    players = ["Drake London", "Malik Nabers", "Justin Jefferson"]
    missing_players = []

    for player in players:
        key = f"player_stats:{player}"
        try:
            data = r.get(key)
            if data is None:
                missing_players.append(player)
            else:
                stats = json.loads(data)
                print(f"Data for {player}: {stats}")
                print(stats['fantasy_points_ppr'])
        except Exception as e:
            print(f"Error retrieving data for player '{player}': {e}")
            missing_players.append(player)

    if missing_players:
        print(f"Stats not found for players: {', '.join(missing_players)}")
    else:
        print("All player stats successfully found in Redis.")


def test_player_season_stats_insertion():
    player_list = ["Drake London", "Malik Nabers", "Justin Jefferson"]
    missing_players = []
    for player in player_list:
        try:    
            key = f"player_season_stats:{player}"
            data = r.get(key)
            print(data)
        except Exception as e:
            print(f"Error retrieving data for player '{player}': {e}")
            missing_players.append(player)
    if missing_players:
        print(f"Stats not found for players: {', '.join(missing_players)}")
    else:
        print("All player stats successfully found in Redis.")


def test_player_name_to_player_id_insertion():
    player_list = ["Aaron Rodgers", "Patrick Mahomes", "Justin Jefferson"]
    missing_players = []
    for player in player_list:
        key = f"player_name_to_player_id:{player}"
        data = r.get(key)
        data = json.loads(data)
        print(data)
        player_id = data
        player = r.get(f"player_stats:{player_id}")
        print(player)


if __name__ == "__main__":
    test_player_stats_insertion()
    test_player_season_stats_insertion()
    test_player_name_to_player_id_insertion()

