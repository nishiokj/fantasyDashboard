import certifi
import os
import ssl
import urllib3
import nfl_data_py as nfl
import pandas as pd
import pickle
import redis
import json
import math
# Set certificate path explicitly for macOS
cert_path = '/Library/Frameworks/Python.framework/Versions/3.11/etc/openssl/cert.pem'
os.environ['SSL_CERT_FILE'] = cert_path
os.environ['REQUESTS_CA_BUNDLE'] = cert_path

# If still having issues, uncomment the following line (less secure but will work)
# ssl._create_default_https_context = ssl._create_unverified_context

r = redis.Redis(
    host='redis-11531.c73.us-east-1-2.ec2.redns.redis-cloud.com',
    port=11531,
    password='6YlddKvp2Dtwg7I97jMeCOk3Pu8bcKjA')

def get_player_stats(player_list):
    import json

    data_list = nfl.import_weekly_data([2024])
    df = data_list
    """
    Extracts specific statistics for a list of players based on their positions.

    Parameters:
        Players (list of tuples): A list where each tuple contains the player's name and position.
                                  Example: [("Drake London", "WR"), ("Patrick Mahomes", "QB")]

    Returns:
        dict: A dictionary where each key is a player's name and the value is another dictionary
              containing the requested statistics.
    """
    stats = {}
    for player_name, position in player_list:
        # Filter the dataframe for the current player
        player_df = df[df['player_display_name'] == player_name]
        
        if player_df.empty:
            print(f"No data found for player: {player_name}")
            continue

        try:
            # Extract all available statistics for the player
            player_stats = player_df.iloc[-1].to_dict()

            for key, value in player_stats.items():
                if isinstance(value, float) and math.isnan(value):
                    player_stats[key] = None
            # Ensure all values are JSON serializable
            for key, value in player_stats.items():
                if not isinstance(value, (str, int, float, bool, list, dict, type(None))):
                    continue
                    print(f"Non-serializable value: {value} for key: {key}")

            stats[player_name] = player_stats
        except (TypeError, ValueError) as e:
            print(f"Serialization error for player '{player_name}': {e}")
            # Optionally, you can log the error or handle it as needed
            continue

    return stats

def main():
    PLAYER_LIST = pickle.load(open('player_list.pkl', 'rb'))
    try:
        stats = get_player_stats(PLAYER_LIST)
    except Exception as e:
        print(f"An unexpected error occurred get player stats: {e}")
        stats = {}

    # Store each player's stats as a separate JSON entry in Redis
    pipeline = r.pipeline()
    # print(stats['Drake London'])
    for player, data in stats.items():
        key = f"player_stats:{player}"
        try:
            pipeline.set(key, json.dumps(data))
        except Exception as e:
            print(f"Error setting data for player '{player}': {e}")
    try:
        pipeline.execute()
        print("Player stats successfully updated in Redis.")
    except Exception as e:
        print(f"An error occurred while executing the Redis pipeline: {e}")

if __name__ == "__main__":
    main()