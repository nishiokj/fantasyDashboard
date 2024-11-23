import json 
import os
import pickle
import statistics
# Get the directory where the script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class Bet:
    def __init__(self, bookmaker, market, price, point):
        self.bookmaker = bookmaker
        self.market = market
        self.price = price
        self.point = point
    def to_json(self):
        return {
            "bookmaker": self.bookmaker,
            "market": self.market,
            "price": self.price,
            "point": self.point
        }


class PlayerData:
    def __init__(self, player_name):
        self.player_id = None
        self.player_name = player_name
        self.projections = {}
        self.boom_or_bust = {}
        self.position = None
        self.bets = []
    
    def to_json(self):
        return {
            "player_id": self.player_id,
            "player_name": self.player_name,
            "projections": self.projections,
            "boom_or_bust": self.boom_or_bust,
            "position": self.position,
            "bets": [bet.to_json() for bet in self.bets]
        }
    
    def add_bet(self, bet):
        self.bets.append(bet)


    def findBookerMakersAverages(self):
        pass


    def set_projections(self):
        try:
            match self.position:
                case "QB":
                    bet_totals = {
                        "passing_yards": 0.0,
                        "passing_tds": 0.0,
                        "interceptions": 0.0,
                        "rushing_yards": 0.0,
                        "anytime_td": 0.0
                    }
                    bet_counts = {
                        "passing_yards": 0,
                        "passing_tds": 0,
                        "interceptions": 0,
                        "rushing_yards": 0,
                        "anytime_td": 0
                    }
                    temp_anytime_tds = []
                    for bet in self.bets:
                        if bet.market == "player_pass_yds":
                            bet_totals["passing_yards"] = bet_totals["passing_yards"] + bet.point if bet.point else 0
                            bet_counts["passing_yards"] += 1
                        elif bet.market == "player_pass_tds":
                            if bet.point:
                                bet_totals["passing_tds"] = bet_totals["passing_tds"] + bet.point
                                bet_counts["passing_tds"] += 1
                        elif bet.market == "player_pass_interceptions":
                            if bet.point:
                                bet_totals["interceptions"] = bet_totals["interceptions"] + bet.point
                                bet_counts["interceptions"] += 1
                        elif bet.market == "player_rush_yds":
                            if bet.point:
                                bet_totals["rushing_yards"] = bet_totals["rushing_yards"] + bet.point
                                bet_counts["rushing_yards"] += 1
                        elif bet.market == "player_anytime_td":
                            if bet.price:
                                temp_anytime_tds.append(bet.price)
                    for key in bet_totals:
                        if bet_counts[key] > 0:
                            self.projections[key] = round(bet_totals[key] / bet_counts[key], 1)
                        else:
                            self.projections[key] = 0
                        if key == "anytime_td":
                            self.projections[key] = statistics.median(temp_anytime_tds) if temp_anytime_tds else 0
                            self.projections["tds_adj_odds"] = convert_anytime_td_to_tds_adj_odds(self.projections[key])
                case "RB":
                    bet_totals = {
                        "rushing_yards": 0.0,
                        "anytime_td": 0.0,
                        "receptions": 0.0,
                        "receiving_yards": 0.0
                    }
                    bet_counts = {
                        "rushing_yards": 0,
                        "anytime_td": 0,
                        "receptions": 0,
                        "receiving_yards": 0
                    }
                    temp_anytime_tds = []
                    for bet in self.bets:
                        if bet.market == "player_rush_yds":
                            bet_totals["rushing_yards"] = bet_totals["rushing_yards"] + bet.point if bet.point else 0
                            bet_counts["rushing_yards"] += 1
                        elif bet.market == "player_anytime_td":
                            if bet.price:
                                temp_anytime_tds.append(bet.price)
                        elif bet.market == "player_receptions":
                            if bet.point:
                                bet_totals["receptions"] = bet_totals["receptions"] + bet.point
                                bet_counts["receptions"] += 1
                        elif bet.market == "player_reception_yds":
                            if bet.point:
                                bet_totals["receiving_yards"] = bet_totals["receiving_yards"] + bet.point
                                bet_counts["receiving_yards"] += 1
                    for key in bet_totals:
                        if key == "anytime_td":
                            self.projections[key] = statistics.median(temp_anytime_tds) if temp_anytime_tds else 0
                            self.projections["tds_adj_odds"] = convert_anytime_td_to_tds_adj_odds(self.projections[key])
                        elif bet_counts[key] > 0:
                            self.projections[key] = round(bet_totals[key] / bet_counts[key], 1)
                        else:
                            self.projections[key] = 0
                case "WR":
                    bet_totals = {
                        "receptions": 0.0,
                        "receiving_yards": 0.0,
                        "anytime_td": 0.0
                    }
                    bet_counts = {
                        "receptions": 0,
                        "receiving_yards": 0,
                        "anytime_td": 0
                    }
                    temp_anytime_tds = []
                    for bet in self.bets:
                        if bet.market == "player_receptions":
                            if bet.point:
                                bet_totals["receptions"] = bet_totals["receptions"] + bet.point
                                bet_counts["receptions"] += 1
                        elif bet.market == "player_reception_yds":
                            if bet.point:
                                bet_totals["receiving_yards"] = bet_totals["receiving_yards"] + bet.point
                                bet_counts["receiving_yards"] += 1
                        elif bet.market == "player_anytime_td":
                            if bet.price:
                                temp_anytime_tds.append(bet.price)
                    for key in bet_totals:
                        if key == "anytime_td":
                            self.projections[key] = statistics.median(temp_anytime_tds) if temp_anytime_tds else 0
                            self.projections["tds_adj_odds"] = convert_anytime_td_to_tds_adj_odds(self.projections[key])
                        elif bet_counts[key] > 0:
                            self.projections[key] = round(bet_totals[key] / bet_counts[key], 1)
                        else:
                            self.projections[key] = 0
                case "TE":
                    bet_totals = {
                        "receptions": 0.0,
                        "receiving_yards": 0.0,
                        "anytime_td": 0.0
                    }
                    bet_counts = {
                        "receptions": 0,
                        "receiving_yards": 0,
                        "anytime_td": 0
                    }
                    temp_anytime_tds = []
                    for bet in self.bets:
                        if bet.market == "player_receptions":
                            if bet.point:
                                bet_totals["receptions"] = bet_totals["receptions"] + bet.point
                                bet_counts["receptions"] += 1
                        elif bet.market == "player_reception_yds":
                            if bet.point:
                                bet_totals["receiving_yards"] = bet_totals["receiving_yards"] + bet.point
                                bet_counts["receiving_yards"] += 1
                        elif bet.market == "player_anytime_td":
                            if bet.price:
                                temp_anytime_tds.append(bet.price)
                    for key in bet_totals:
                        if key == "anytime_td":
                            self.projections[key] = statistics.median(temp_anytime_tds) if temp_anytime_tds else 0
                            self.projections["tds_adj_odds"] = convert_anytime_td_to_tds_adj_odds(self.projections[key])
                        elif bet_counts[key] > 0:
                            self.projections[key] = round(bet_totals[key] / bet_counts[key], 1)     
                        else:
                            self.projections[key] = 0
                case "K":
                    pass
        except Exception as e:
            print(f"An unexpected error occurred setting projections: {e}")


    def set_boom_or_bust(self):
        pass


    def set_player_id_and_position(self, player_map):
        try:
            self.player_id = player_map.get(self.player_name)[0] if player_map.get(self.player_name) else print(f"Player {self.player_name} not found in player map")
            self.position = player_map.get(self.player_name)[1] if player_map.get(self.player_name) else print(f"Player {self.player_name} not found in player map")
        except Exception as e:
            print(f"An unexpected error occurred setting player id and position: {e}")
    stat_values = {
        "passing_yards": 0.04,
        "passing_tds": 4.0,
        "interceptions": -2.0,
        "rushing_yards": 0.1,
        "tds_adj_odds": 6.0,
        "receptions": 1.0,
        "receiving_yards": 0.1,
        "receiving_tds": 6.0
    }
    def set_expected_points(self):
        ppr_projection = 0
        for stat, value in self.projections.items():
            if stat in self.stat_values:
                ppr_projection = ppr_projection + (value * self.stat_values[stat])
        self.projections['PPRProjection'] = round(ppr_projection, 1)
        self.projections.pop("tds_adj_odds", None)



def make_map_player_name_to_id_and_position():
    player_map = {}
    try:
        player_list = pickle.load(open('./player_list.pkl', 'rb'))
        for player in player_list:
            player_map[player[0]] = (player[1], player[2])
    except Exception as e:
        print(f"An unexpected error occurred mapping player name to id and position: {e}")
    print("Player map created")
    return player_map


def read_from_file(filename):
    filepath = os.path.join(BASE_DIR, filename)
    with open(filepath, 'r') as file:
        return json.load(file)
    

def write_to_file(data, filename):
    filepath = os.path.join(BASE_DIR, filename)
    with open(filepath, 'w') as file:
        json.dump(data, file)

def casino_juice_normalization(implied_probability):
    distance_from_even = abs(.5 - implied_probability)
    juice_factor = (distance_from_even * .25) + .1
    actual_probability = implied_probability - (implied_probability * juice_factor)
    return actual_probability

def convert_anytime_td_to_tds_adj_odds(anytime_td_line):
    if anytime_td_line > 0:
        probability_of_td = casino_juice_normalization(100 / (anytime_td_line+100))
        
        return probability_of_td
    else:
        probability_of_td = casino_juice_normalization(abs(anytime_td_line) / (abs(anytime_td_line)+100))
        return probability_of_td

def main(player_lines,player_map):
    player_dict = {}
    for player_name, bets in player_lines.items():
        if player_name not in player_map:
            continue
        player_data = PlayerData(player_name)
        for bet in bets:
            player_data.add_bet(Bet(bet["bookmaker"], bet["market"], bet["price"], bet["point"]))
        player_data.set_player_id_and_position(player_map)
        player_data.set_boom_or_bust()
        player_data.set_projections()
        player_data.set_expected_points()
        player_dict[player_name] = player_data.to_json()
    
    return player_dict


if __name__ == "__main__":
    lines = read_from_file("./player_lines.json")
    player_map = make_map_player_name_to_id_and_position()
    player_dict = main(lines,player_map)
    write_to_file(player_dict, "./player_data.json")
    print("Player data written to file")