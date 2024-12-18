import redis
import json
import os
import dotenv


dotenv.load_dotenv()
print(os.getenv('BETTING_LINES_URL'))
print(os.getenv('BETTING_LINES_PORT'))
print(os.getenv('BETTING_LINES_CACHE_KEY'))
# Connect to Redis (Betting Cache Instance)
r = redis.Redis(
  host=os.getenv('BETTING_LINES_URL'),
  port=os.getenv('BETTING_LINES_PORT'),
  password=os.getenv('BETTING_LINES_CACHE_KEY')
)

    
def read_from_file(filename):
    with open(filename, 'r') as file:
        return json.load(file)


def remove_lines():
    r.delete("player_lines:*")


def clean_player_data(player_data):
    for player in player_data:
        player_data[player] = {k: v for k, v in player_data[player].items() if v is not None}
    for player in player_data:
        player_data[player].pop("bets", None)
    return player_data


def write_lines_to_redis(player_data):
    try:
        for player, data in player_data.items():
            r.set(f'player_lines:{data["player_id"]}', json.dumps(data))
    except Exception as e:
        print(f"An unexpected error occurred writing lines to Redis: {e}")

def main():
    remove_lines()
    player_data = read_from_file('./player_data.json')
    player_data = clean_player_data(player_data)
    write_lines_to_redis(player_data)
    print("Lines loaded to Redis")
if __name__ == "__main__":
    main()

    
