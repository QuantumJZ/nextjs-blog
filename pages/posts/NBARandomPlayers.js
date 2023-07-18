
import { useEffect, useState } from 'react';
import PlayerImage from '../api/PlayerImage';
import Modal from 'react-modal';

const NBARandomPlayers = () => {
  const [playerData, setPlayerData] = useState([]);
  const [selectedStat, setSelectedStat] = useState(null);
  const [score, setScore] = useState(0);
  const [correctPlayerID, setCorrectPlayerID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [player1Stat, setPlayer1Stat] = useState(null);
  const [player2Stat, setPlayer2Stat] = useState(null);
  const [playerClicked, setPlayerClicked] = useState(false);

  useEffect(() => {
    const fetchRandomPlayers = async () => {
      try {
        const response = await fetch('/api/randomPlayers');
        const data = await response.json();
        const { randomPlayer1, player1Name, randomPlayer2, player2Name } = data;
        setPlayerData([{ id: randomPlayer1, name: player1Name }, { id: randomPlayer2, name: player2Name }]);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching random players:', error);
        setIsLoading(false); // Set loading to false in case of error
      }
    };

    fetchRandomPlayers();

    const stats = ['Points', 'Assists', 'Rebounds', 'Steals', 'Blocks', 'Turnovers', 'Field Goal %', 'Free Throw %', '3-Point %', 'Minutes Played', 'Games Played'];
    const randomStat = stats[Math.floor(Math.random() * stats.length)];
    setSelectedStat(randomStat);
  }, []);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      if (playerData.length >= 2 && selectedStat) {
        const player1Stat = await getPlayerStat(playerData[0].id, statMappings[selectedStat]);
        const player2Stat = await getPlayerStat(playerData[1].id, statMappings[selectedStat]);
        setPlayer1Stat(player1Stat);
        setPlayer2Stat(player2Stat);
        console.log('player1Stat:', player1Stat);
        console.log('player2Stat:', player2Stat);
      }
    };

    fetchPlayerStats();
  }, [playerData, selectedStat]);

  const statMappings = {
    'Points': 'PTS',
    'Assists': 'AST',
    'Rebounds': 'REB',
    'Steals': 'STL',
    'Blocks': 'BLK',
    'Turnovers': 'TOV',
    'Field Goal %': 'FG_PCT',
    'Free Throw %': 'FT_PCT',
    '3-Point %': 'FG3_PCT',
    'Minutes Played': 'MIN',
    'Games Played': 'GP'
  };

  const compareStats = (playerID) => {
    if (playerData.length >= 2 && player1Stat && player2Stat) {
      if (playerID === playerData[0].id && player1Stat.result >= player2Stat.result) {
        setScore((prevScore) => prevScore + 1);
        setCorrectPlayerID(playerData[0].id);
        setTimeout(() => {resetGame();}, 2000);
      } else if (playerID === playerData[1].id && player2Stat.result >= player1Stat.result) {
        setScore((prevScore) => prevScore + 1);
        setCorrectPlayerID(playerData[1].id);
        setTimeout(() => {resetGame();}, 3000);
      } else {
        handleIncorrectClick(); // Call the function only when the clicked player is incorrect
      }
      setPlayerClicked(true);
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

  const [showModal, setShowModal] = useState(false);

  const handleIncorrectClick = (playerID) => {
    if (correctPlayerID !== playerID) {
      setShowModal(true);
    }
  };

  const resetGame = () => {
    setIsLoading(true);
    setSelectedStat(null);
    setPlayerData([]);
    setPlayer1Stat(null);
    setPlayer2Stat(null);
    setCorrectPlayerID(null);
    setPlayerClicked(false);

    const fetchRandomPlayers = async () => {
      try {
        const response = await fetch('/api/randomPlayers');
        const data = await response.json();
        const { randomPlayer1, player1Name, randomPlayer2, player2Name } = data;
        setPlayerData([{ id: randomPlayer1, name: player1Name }, { id: randomPlayer2, name: player2Name }]);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching random players:', error);
        setIsLoading(false); // Set loading to false in case of error
      }
    };

    fetchRandomPlayers();

    const stats = ['Points', 'Assists', 'Rebounds', 'Steals', 'Blocks', 'Turnovers', 'Field Goal %', 'Free Throw %', '3-Point %', 'Minutes Played', 'Games Played'];
    const randomStat = stats[Math.floor(Math.random() * stats.length)];
    setSelectedStat(randomStat);
  };

  return (
    <div className="dark-mode" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="title">Which Player Has More {selectedStat}?</h1>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {playerData.map((player) => (
              <div key={player.id} style={{ textAlign: 'center', margin: '0 20px' }}>
                <h2>{player.name}</h2>
                <PlayerImage
                  playerID={player.id}
                  playerName={player.name}
                  onClick={() => {compareStats(player.id);}}
                  correctAnswer={correctPlayerID === player.id ? true : correctPlayerID === null ? null : false}
                />
                {playerClicked &&
                  ((player.id === playerData[0].id && (
                    <h3>{selectedStat}: {player1Stat ? player1Stat.result : 'N/A'}</h3>
                  )) || (player.id === playerData[1].id && (
                    <h3>{selectedStat}: {player2Stat ? player2Stat.result : 'N/A'}</h3>
                  )))
                }
              </div>
            ))}
          </div>
          <br />
          <div className="title">
            <h1>Score: {score}</h1>
          </div>
        </>
      )}

      {showModal && (
        <Modal
          isOpen={true}
          contentLabel="Game Over"
          style={{
            content: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              // Add more styles if needed
              width: '300px', // Adjust the width as needed
              height: '200px', // Adjust the height as needed
              margin: 'auto', // Centers the modal on the screen
              border: '1px solid #ccc', // Add a border for a visual effect
              borderRadius: '8px', // Rounded corners for a nicer look
              padding: '20px', // Add padding to the modal content
              backgroundColor: '#fff', // Background color for the modal
              position: 'absolute', // Position the modal absolutely within the screen
              top: 0, // Position from the top edge of the screen
              left: 0, // Position from the left edge of the screen
              right: 0, // Position from the right edge of the screen
              bottom: 0, // Position from the bottom edge of the screen
              margin: 'auto', // Center the modal both horizontally and vertically
            },
          }}
        >
          <h2>Game Over!</h2>
          <h4>Score: {score}</h4>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </Modal>
      )}
    </div>
  );
};

export default NBARandomPlayers;