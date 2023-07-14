import fetch from 'isomorphic-unfetch';

export default async function playerImage(req, res) {
  const { query } = req;
  const { playerID } = query;
  const imageUrl = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerID}.png`;

  try {
    const response = await fetch(imageUrl);
    const imageBuffer = await response.arrayBuffer();
    const imageBytes = new Uint8Array(imageBuffer);

    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from(imageBytes));
  } catch (error) {
    console.error('Error fetching player image:', error);
    res.status(500).end();
  }
}