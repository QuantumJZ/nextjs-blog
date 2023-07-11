import fetch from 'isomorphic-unfetch';

export default async function playerImage(req, res) {
  const { query } = req;
  const { playerID } = query;
  const imageUrl = `https://stats.nba.com/media/img/players/230x185/${playerID}.png`;

  try {
    const response = await fetch(imageUrl);
    const imageBuffer = await response.buffer();

    res.send(imageBuffer);
  } catch (error) {
    console.error('Error fetching player image:', error);
    res.status(500).end();
  }
}