//https://nba-stats-db.herokuapp.com/api/

import axios from 'axios';

export async function get_total_stat(player_id, stat) {
  try {
    const response = await axios.get(`https://nba-stats-db.herokuapp.com/api/playerdata/name/${player_id}/?format=json`);
    const career_stats_data = response.data.results[0];
    const total_stat = career_stats_data[stat];
    return total_stat;
  } catch (error) {
    throw new Error('Error fetching player career stats');
  }
}