
export default function handler(req, res) {
    const { exec } = require('child_process');
  
    // Retrieve playerID and stat from the request query parameters
    const { playerID, stat } = req.query;
  
    // Execute the Python script with the provided playerID and stat
    exec(`python ./pages/api/NBAPlayerData.py ${playerID} ${stat}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        try {
          const result = parseFloat(stdout.trim());
          res.status(200).json({ result });
        } catch (error) {
          console.error(`Error parsing Python script output: ${error}`);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    });
  }