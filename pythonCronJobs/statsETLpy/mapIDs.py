import nfl_data_py as nfl
import pandas as pd
import math
import pickle
import json
import redis
import os
import dotenv
dotenv.load_dotenv()
r = redis.Redis(
    host=os.getenv('WEEKLY_URL'),
    port=os.getenv('WEEKLY_PORT'),
    password=os.getenv('WEEKLY_CACHE_KEY'))



def map_id_to_player(player_list):
    data_list = nfl.import_seasonal_data([2024])
    df = data_list
    map = {}
    for player_name, player_id, position in player_list:
        map[player_name] = player_id
    return map
       
def delete_player_id_to_player_name():
    r.delete("player_id_to_player_name:*")

def main():
    PLAYER_LIST = pickle.load(open('player_list.pkl', 'rb'))
    try:
        map = map_id_to_player(PLAYER_LIST)
    except Exception as e:
        print(f"An unexpected error occurred get player stats: {e}")
    pipeline = r.pipeline()
    for player_name, player_id in map.items():
        pipeline.set(f"player_name_to_player_id:{player_name}", json.dumps(player_id))
    try:
        pipeline.execute()
        print("Player name to player id successfully updated in Redis.")
    except Exception as e:
        print(f"An error occurred while executing the Redis pipeline: {e}")

    # delete_player_id_to_player_name()
    # # Store each player's stats as a separate JSON entry in Redis
    # pipeline = r.pipeline()
    # # print(stats['Drake London'])
    # for player, data in stats.items():
    #     key = f"player_season_stats:{player}"
    #     try:
    #         pipeline.set(key, json.dumps(data))
    #     except Exception as e:
    #         print(f"Error setting data for player '{player}': {e}")
    # try:
    #     pipeline.execute()
    #     print("Player stats successfully updated in Redis.")
    # except Exception as e:
    #     print(f"An error occurred while executing the Redis pipeline: {e}")

if __name__ == "__main__":
    main()