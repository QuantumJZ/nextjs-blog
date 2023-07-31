

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    // Read the contents of the activePlayerIDs.txt file
    const filePath = path.join(process.cwd(), '/pages/api/activePlayerIDs.txt');
    const fileContents = await fs.promises.readFile(filePath, 'utf-8');

    // Split the file contents by newline to get an array of player IDs
    const activePlayerIDs = fileContents.trim().split('\n');

    // If no active player IDs found, return an error response
    if (activePlayerIDs.length === 0) {
      return res.status(500).json({ error: 'No active player IDs found' });
    }

    // Select random players from activePlayerIDs
    const randomPlayer1 = activePlayerIDs[Math.floor(Math.random() * activePlayerIDs.length)];
    const randomPlayer2 = activePlayerIDs[Math.floor(Math.random() * activePlayerIDs.length)];
    var player1 = randomPlayer1.split('|')[0];
    var player2 = randomPlayer2.split('|')[0];
    var player1Name = randomPlayer1.split('|')[1];
    var player2Name = randomPlayer2.split('|')[1];

    // You can use the player IDs to fetch player details or perform other operations

    res.status(200).json({ player1, player1Name, player2, player2Name });
  } catch (error) {
    console.error('Error fetching NBA player data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}