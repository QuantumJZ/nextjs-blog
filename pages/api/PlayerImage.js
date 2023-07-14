import { useEffect, useState } from 'react';

const PlayerImage = ({ playerID }) => {
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

  return <img src={imageUrl} alt="Player Image" />;
};

export default PlayerImage;