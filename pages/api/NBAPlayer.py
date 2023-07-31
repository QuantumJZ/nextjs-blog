
# https://github.com/swar/nba_api

from nba_api.stats.static import players # type: ignore

all_players = players.get_active_players()

with open('activePlayerIDs.txt', 'w') as file:
    for player in all_players:
        file.write(f"{player['id']}|{player['full_name']}\n")