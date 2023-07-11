
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import PlayerImage from '../api/image';

const RandomPlayerPage = () => {
  const [playerIDs, setPlayerIDs] = useState([]);

  useEffect(() => {
    const fetchRandomPlayerIDs = async () => {
      try {
        const response = await fetch('/api/randomPlayers');
        const data = await response.json();
        const { randomPlayer1, player1Name, randomPlayer2, player2Name } = data;

        setPlayerIDs([randomPlayer1, randomPlayer2]);
      } catch (error) {
        console.error('Error fetching random player IDs:', error);
      }
    };

    fetchRandomPlayerIDs();
  }, []);

  return (
    <Layout>
      <Head>
        <title>NBA Player Matchup</title>
      </Head>
      <div>
        {playerIDs.map((playerID) => (
          <PlayerImage key={playerID} playerID={encodeURIComponent(playerID)} />
        ))}
      </div>
    </Layout>
  );
};

export default RandomPlayerPage;