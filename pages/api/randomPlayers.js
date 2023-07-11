
import { exec } from 'child_process';

export default function handler(req, res) {
  // Execute the Python script
  exec('python ./pages/api/NBAPlayer.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Parse the output of the Python script
      const [randomPlayer1, player1Name, randomPlayer2, player2Name] = stdout.trim().split('\n');

      res.status(200).json({ randomPlayer1, player1Name, randomPlayer2, player2Name });
    }
  });
}