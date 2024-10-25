import nfl_data_py as nfl
import pickle


PLAYER_LIST = []

def build_player_list():
    data_list = nfl.import_weekly_data([2024])
    df = data_list
    for index, row in df.iterrows():
        PLAYER_LIST.append((row['player_display_name'], row['position']))
    return PLAYER_LIST

def save_player_list_to_file(file_path):
    player_tuple = tuple(PLAYER_LIST)
    with open(file_path, 'wb') as file:
        pickle.dump(player_tuple, file)

if __name__ == "__main__":
    build_player_list()
    save_player_list_to_file('player_list.pkl')
