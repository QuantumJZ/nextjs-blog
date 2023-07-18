import { useEffect, useState } from 'react';

const PlayerImage = ({ playerID, playerName, onClick, correctAnswer }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchPlayerImage = async () => {
      try {
        const response = await fetch(`/api/image?playerID=${playerID}`);
        const imageBlob = await response.blob();
        const objectUrl = URL.createObjectURL(imageBlob);
        setImageUrl(objectUrl);
      } catch (error) {
        console.error('Error fetching player image:', error);
      }
    };

    fetchPlayerImage();
  }, [playerID]);

  return (
    <div
      style={{
        border: correctAnswer ? '3px solid green' : correctAnswer === false ? '3px solid red' : '3px solid transparent',
        padding: '10px',
        borderRadius: '10px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <img src={imageUrl} alt={playerName} style={{ width: '280px', height: '280px', objectFit: 'cover' }} />
    </div>
  );
};

export default PlayerImage;