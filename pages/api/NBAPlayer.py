
# https://github.com/swar/nba_api

from nba_api.stats.endpoints import playercareerstats # type: ignore
from nba_api.stats.static import players # type: ignore
import random

all_players = players.get_players()
random_player1 = random.choice(all_players)
player_name1 = random_player1['full_name']
random_player2 = random.choice(all_players)
player_name2 = random_player2['full_name']

# Nikola Jokić
# career1 = playercareerstats.PlayerCareerStats(player_id=random_player1['id']) 
# career2 = playercareerstats.PlayerCareerStats(player_id=random_player2['id']) 

print(random_player2)
# print(player_name2, " Points: ", career2.get_data_frames()[0]['PTS'].mean())