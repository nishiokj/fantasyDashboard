
import redis
import json
import os


r = redis.Redis(
    host='redis-15731.c93.us-east-1-3.ec2.redns.redis-cloud.com',
    port=15731,
    password=os.getenv('BETTING_CACHE_KEY'))


def read_from_file(filename):
    with open(filename, 'r') as file:
        return json.load(file)


def clean_player_data(player_data):
    for player in player_data:
        player_data[player] = {k: v for k, v in player_data[player].items() if v is not None}
    return player_data


def test_load_lines():
    player_data = read_from_file('./data/player_data.json')
    for player, data in player_data.items():
        try:
            data = json.loads(r.get(f'player_lines:{data["player_id"]}'))
        except Exception as e:
            print(f"Error getting data for player '{player}': {e}")
        if data:
            print(data.keys())

if __name__ == "__main__":
    test_load_lines()
    print("done")