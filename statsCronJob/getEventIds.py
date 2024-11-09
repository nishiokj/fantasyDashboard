import os
import json
import dotenv
import requests

dotenv.load_dotenv()

API_KEY = os.getenv("ODDS_API_KEY")


def getEventIds():
    url = "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events?apiKey=" + API_KEY
    response = requests.get(url)
    data = response.json()
    return data


def writeToFile(data, filename):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)


if __name__ == "__main__":
    eventIds = getEventIds()
    print(eventIds)
    writeToFile(eventIds, "eventIds.json")
    print("Event IDs written to file")
