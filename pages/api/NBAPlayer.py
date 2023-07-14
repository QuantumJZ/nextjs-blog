
# https://github.com/swar/nba_api

from nba_api.stats.static import players # type: ignore
import random

all_players = players.get_active_players()
random_player1 = random.choice(all_players)
player_name1 = random_player1['full_name']
random_player2 = random.choice(all_players)
player_name2 = random_player2['full_name']

# print(random_player1['id'], player_name1, random_player2['id'], player_name2)
print(random_player1['id'])
print(player_name1)
print(random_player2['id'])
print(player_name2)