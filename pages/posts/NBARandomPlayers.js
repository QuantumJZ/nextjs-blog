
import { useEffect, useState } from 'react';
import PlayerImage from '../api/PlayerImage';

const NBARandomPlayers = () => {
  const [playerData, setPlayerData] = useState([]);
  const [selectedStat, setSelectedStat] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchRandomPlayers = async () => {
      try {
        const response = await fetch('/api/randomPlayers');
        const data = await response.json();
        const { randomPlayer1, player1Name, randomPlayer2, player2Name } = data;
        setPlayerData([{ id: randomPlayer1, name: player1Name }, { id: randomPlayer2, name: player2Name }]);
      } catch (error) {
        console.error('Error fetching random players:', error);
      }
    };

    fetchRandomPlayers();

    const stats = ['Points', 'Assists', 'Rebounds', 'Steals', 'Blocks', 'Turnovers', 'Field Goal %', 'Free Throw %', '3-Point %', 'Minutes Played', 'Games Played'];
    const randomStat = stats[Math.floor(Math.random() * stats.length)];
    setSelectedStat(randomStat);
  }, []);

  const statMappings = {
    'Points': 'PTS',
    'Assists': 'AST',
    'Rebounds': 'REB',
    'Steals': 'STL',
    'Blocks': 'BLK',
    'Turnovers': 'TOV',
    'Field Goal %': 'FG%',
    'Free Throw %': 'FT%',
    '3-Point %': '3P%',
    'Minutes Played': 'MP',
    'Games Played': 'G'
  };

  const compareStats = async (playerID) => {
    if (playerData.length >= 2) {
      const player1Stat = await getPlayerStat(playerData[0].id, statMappings[selectedStat]);
      const player2Stat = await getPlayerStat(playerData[1].id, statMappings[selectedStat]);

      if (playerID === playerData[0].id && player1Stat.result > player2Stat.result) {
        setScore(score + 1);
      } else if (playerID === playerData[1] && player2Stat.result > player1Stat.result) {
        setScore(score + 1);
      }else {
        // setScore(0);
      }
    }
  };

  const getPlayerStat = async (playerID, selectedStat) => {
    try {
      const response = await fetch(`/api/getPlayerData?playerID=${playerID}&stat=${selectedStat}`);
      const playerStat = await response.json();
      return playerStat;
    } catch (error) {
      console.error('Error fetching player stat:', error);
    }
  };

  return (
    <div className="dark-mode" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2 className="title">Which Player Has More {selectedStat}?</h2>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {playerData.map((player) => (
          <div key={player.id} style={{ textAlign: 'center', margin: '0 20px' }}>
            <h3>{player.name}</h3>
            <div onClick={() => compareStats(player.id)}><PlayerImage playerID={player.id} onClick={() => compareStats(player.id)} /></div>
          </div>
        ))}
      </div>
      <br />
      <div className="title">
        <h1>Score: {score}</h1>
      </div>
    </div>
  );
};

export default NBARandomPlayers;