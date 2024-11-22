import os
import json
import dotenv
import requests

dotenv.load_dotenv()
API_KEY = os.getenv("ODDS_API_KEY")
if not API_KEY:
    raise ValueError("ODDS_API_KEY not found in environment variables")
Markets = "player_pass_tds,player_receptions,player_rush_yds,player_pass_yds,player_tds_over,player_anytime_td,player_pass_interceptions,player_field_goals,player_pass_tds_alternate,player_receptions_alternate,player_rush_yds_alternate,player_reception_yds_alternate,player_pass_yds_alternate"


def writeToFile(data, filename):
    print(f"Writing {len(data)} events to {filename}")
    abs_path = os.path.abspath(filename)
    print(f"Writing to {abs_path}")
    with open(abs_path, 'w') as file:
        json.dump(data, file, indent=4)


def readFromFile(filename):
    print(f"Reading {filename}")
    with open(filename, 'r') as file:
        data = json.load(file)
    return data


def getEventIds():
    print("Reading event IDs from file")
    eventIds = readFromFile("./eventIds.json")
    print("Event IDs read from file")
    return eventIds


def getLines(eventId):
    try:
        lines = {}
        for event in eventId:
            url = "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events/{id}/odds?apiKey={API_KEY}&regions=us&markets={markets}&oddsFormat=american"
            url = url.format(id=event['id'], API_KEY=API_KEY, markets=Markets)
            response = requests.get(url)
            data = response.json()
            lines[event['id']] = data
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    return lines


def getPlayerLines():
    players = {}
    lines = readFromFile("./lines.json")
    print(f"Loaded {len(lines)} events from lines.json")
    for eventId, data in lines.items():
        for bookmaker in data.get("bookmakers", []):
            for market in bookmaker.get("markets", []):
                for outcome in market.get("outcomes", []):
                    player_name = outcome.get("description")
                    if not player_name:
                        continue  # Skip if there's no player description
                    bet = { 
                        "bookmaker": bookmaker.get("key"),
                        "market": market.get("key"),
                        "name": outcome.get("name"),
                        "price": outcome.get("price"),
                        "point": outcome.get("point")
                    }
                    if player_name not in players:
                        players[player_name] = []
                    players[player_name].append(bet)
    return players

if __name__ == "__main__":
    eventIds = getEventIds()
    lines = getLines(eventIds)
    writeToFile(lines, "./lines.json")
    print("Lines written to file")
    player_lines = getPlayerLines()
    writeToFile(player_lines, "./player_lines.json")
    print("Player lines written to file")
    
