
import axios from 'axios';

export default async function handler(req, res) {
  const url = 'https://www.speedrun.com/api/v1/leaderboards/o1y9wo6q/category/n2y55mko?top=100&embed=players&platform=N64';

  try {
    const response = await axios.get(url);
    const data = response.data;
    const wrTime = data.data.runs[0].run.times.primary_t;

    const names = data.data.runs.map((run, count) => {
      const time = (data.data.runs[count].run.times.primary_t - wrTime) / wrTime * 100;
      const name = data.data.players.data[count].names?.international || data.data.players.data[0].name;
      return `${name}|${time.toFixed(2)}`;
    });

    res.status(200).json({ names });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}