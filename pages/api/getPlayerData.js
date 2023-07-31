
import { get_total_stat } from './NBAPlayerData'; // Import the function for fetching player career stats

export default async function handler(req, res) {
  const { playerID, stat } = req.query;

  try {
    // Get the total stat for the player using the function from NBAPlayerData.js
    const total_stat = await get_total_stat(playerID, stat);

    res.status(200).json({ total_stat });
  } catch (error) {
    console.error('Error fetching player data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}