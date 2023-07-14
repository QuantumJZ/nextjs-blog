
import sys
from nba_api.stats.endpoints import playercareerstats # type: ignore

def get_total_stat(player_id, stat):
    career_stats = playercareerstats.PlayerCareerStats(player_id=player_id)
    career_stats_data = career_stats.get_data_frames()[0]
    total_stat = career_stats_data[stat].sum()
    return total_stat

# Retrieve command line arguments
player_id = int(sys.argv[1])
stat = sys.argv[2]

# Get the total stat for the player
total_stat = get_total_stat(player_id, stat)
print(total_stat)