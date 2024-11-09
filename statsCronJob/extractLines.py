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
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)


def readFromFile(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
    return data


def getEventIds():
    print("Reading event IDs from file")
    eventIds = readFromFile("./data/eventIds.json")
    print("Event IDs read from file")
    return eventIds


def getLines(eventId):
    count = 0
    for event in eventId:
        print(event["id"])
        if count > 2:
            break
        url = "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events/{id}/odds?apiKey={API_KEY}&regions=us&markets={markets}&oddsFormat=american"
        url = url.format(id=event['id'], API_KEY=API_KEY, markets=Markets)
        response = requests.get(url)
        print(response.status_code)
        data = response.json()
        print(data)
        count += 1
    return data

def getPlayerLines():
    players = {}
    lines = readFromFile("./data/lines.json")
    for bookmaker in lines.get("bookmakers", []):
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
    writeToFile(lines, "./data/lines.json")
    print("Lines written to file")
    player_lines = getPlayerLines()
    writeToFile(player_lines, "./data/player_lines.json")
    print("Player lines written to file")
    
