
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Link from 'next/link';

const NumberPlacementGame = () => {
  const [slots, setSlots] = useState(new Array(20).fill(null));
  const [randomNumber, setRandomNumber] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing');

  // Function to check if the slots are filled in ascending order
  function checkWinCondition(newSlots) {
    let j = 0;
    while(newSlots[j] === null){
      j++;
    }
    var last = newSlots[j];
    for (let i = j + 1; i < newSlots.length; i++) {
      if (newSlots[i] === null) {
        continue;
      }else {
        if (newSlots[i] <= last){
          return false;
        }
        last = newSlots[i];
      }
    }
    return true;
  }

  // Function to handle slot click
  function handleSlotClick(index) {
    if (slots[index] === null) {
      const updatedSlots = [...slots];
      updatedSlots[index] = randomNumber;
      setSlots(updatedSlots);
      if(!checkWinCondition(updatedSlots)){
        setGameStatus('gameOver');
      }
      setRandomNumber(generateRandomNumber());
    }
  }

  // Function to generate a random number between 1 and 1000 (inclusive)
  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  // Check if the game is over when slots or randomNumber change
  useEffect(() => {
    if (gameStatus === 'playing') {
      if (slots.every((slot) => slot !== null)) {
        // All slots are filled, check if the player won
        if (checkWinCondition()) {
          setGameStatus('won');
        } else {
          setGameStatus('gameOver');
        }
      }
    }
  }, [slots, randomNumber, gameStatus]);

  // Generate a random number when the component mounts
  useEffect(() => {
    setRandomNumber(generateRandomNumber());
  }, []);

  // Reset the game when the "Try Again" button is clicked
  function resetGame() {
    setSlots(new Array(20).fill(null));
    setRandomNumber(generateRandomNumber());
    setGameStatus('playing');
  }

  return (
    <div className="dark-mode" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Pick a location to place this number</h2>
        <p>Random Number: {randomNumber}</p>
        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Render the number slots with the inline styles for the hover effect */}
          {slots.map((number, index) => (
            <li
              key={index}
              style={{
                width: '100px',
                height: '30px', // Updated height to 30px
                border: '1px solid #ccc',
                textAlign: 'center',
                lineHeight: '30px',
                cursor: slots[index] === null ? 'pointer' : 'default',
                backgroundColor: number === null ? 'inherit' : '#ffffff',
                color: number !== null ? 'black' : 'inherit', // Set the text color to black when the slot is filled
                marginBottom: '5px',
                fontSize: '20px', // Adjust the font size as needed
              }}
              onClick={() => handleSlotClick(index)}
            >
              {number !== null ? number : index + 1}
            </li>
          ))}
        </ol>
        <p><Link href="/">Home</Link></p>
        <Modal
          isOpen={gameStatus === 'won'}
          contentLabel="Victory"
          style={{
            content: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              width: '300px',
              height: '150px',
              margin: 'auto',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#fff',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 'auto',
            },
          }}
        >
          <h3>Congratulations! You won!</h3>
          <button onClick={resetGame}>Play Again</button>
        </Modal>

        <Modal
          isOpen={gameStatus === 'gameOver'}
          contentLabel="Game Over"
          style={{
            content: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              width: '400px',
              height: '250px',
              margin: 'auto',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#fff',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 'auto',
            },
          }}
        >
          <h3>Game Over!</h3>
          <p>You have broken the sequence.</p>
          <br/>
          <button onClick={resetGame}>Try Again</button>
        </Modal>
      </div>
    </div>
  );
};

export default NumberPlacementGame;