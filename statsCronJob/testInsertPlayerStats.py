import redis
import json

# Connect to Redis
r = redis.Redis(
    host='redis-11531.c73.us-east-1-2.ec2.redns.redis-cloud.com',
    port=11531,
    password='6YlddKvp2Dtwg7I97jMeCOk3Pu8bcKjA')

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

if __name__ == "__main__":
    test_player_stats_insertion()

