import nfl_data_py as nfl
import pandas as pd
import pickle
import redis
import json

r = redis.Redis(
    host='redis-11531.c73.us-east-1-2.ec2.redns.redis-cloud.com',
    port=11531,
    password='6YlddKvp2Dtwg7I97jMeCOk3Pu8bcKjA')

def get_player_stats(Players):
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
    for player_name, position in Players:
        # Filter the dataframe for the current player
        player_df = df[df['player_display_name'] == player_name]
        
        if player_df.empty:
            print(f"No data found for player: {player_name}")
            continue

        # Define requested columns based on position
        requested_columns = get_requested_columns(position, player_name, df)
        if not requested_columns:
            continue

        # Extract the requested statistics
        player_stats = player_df[requested_columns].iloc[-1].to_dict()
        stats[player_name] = player_stats

    return stats

def get_requested_columns(position, player_name, df):
    position_columns = {
        "WR": [
            'fantasy_points',
            'target_share',
            'receiving_yards',
            'receiving_tds',
            'receptions',
            'receiving_fumbles',
            'fantasy_points_ppr',
            'receiving_yards_after_catch'
        ],
        "QB": [
            'fantasy_points',
            'passing_yards',
            'passing_tds',
            'interceptions',
            'rushing_yards',
            'rushing_tds',
            'rushing_fumbles',
            'fantasy_points_ppr'
        ],
        "RB": [
            'fantasy_points',
            'target_share',
            'rushing_yards',
            'rushing_tds',
            'receptions',
            'carries',
            'rushing_fumbles',
            'receiving_yards',
            'receiving_tds',
            'fantasy_points_ppr'
        ],
        "TE": [
            'fantasy_points',
            'target_share',
            'receiving_yards',
            'receiving_tds',
            'receptions',
            'fantasy_points_ppr'
        ],
        "K": [
            'fantasy_points',
            'extra_points_made',
            'extra_points_attempted'
        ]
    }

    requested_columns = position_columns.get(position)
    if not requested_columns:
        print(f"Unsupported position '{position}' for player '{player_name}'. Skipping.")
        return None

    # Check if all requested columns exist in the dataframe
    missing_columns = [col for col in requested_columns if col not in df.columns]
    if missing_columns:
        print(f"Missing columns for player '{player_name}': {missing_columns}")
        return None

    return requested_columns

def main():
    PLAYER_LIST = pickle.load(open('player_list.pkl', 'rb'))
    try:
        stats = get_player_stats(PLAYER_LIST)
    except Exception as e:
        print(f"An unexpected error occurred get player stats: {e}")
        stats = {}

    # Store each player's stats as a separate JSON entry in Redis
    pipeline = r.pipeline()
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