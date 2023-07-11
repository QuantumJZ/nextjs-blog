import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const PlayerImage = () => {
  const router = useRouter();
  const { playerID } = router.query;
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchPlayerImage = async () => {
      try {
        const response = await fetch(`/api/playerImage?playerID=${playerID}`);
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error('Error fetching player image:', error);
      }
    };

    if (playerID) {
      fetchPlayerImage();
    }
  }, [playerID]);

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="Player Image" />
      ) : (
        <div>Loading player image...</div>
      )}
    </div>
  );
};

export default PlayerImage;