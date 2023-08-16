import React from 'react';

const InfoCard = ({ keyword, definition, image, positionY, positionX }) => {
  

  {/* <h3>{keyword}</h3>
      <p>{definition}</p> */}

  return (
    <div className="info-card"
    style={{ position: 'absolute',
    top: `${positionY}%`, // Use percentage for positioning
    left: `${positionX}%`, // Use percentage for positioning
    transform: 'translate(-50%, -50%)', // Center the card
    zIndex: 1000, // Ensure it's on top
    // fontSize: '100px',
  }}
  >
      <img src={image} alt="generatedImage"  />
    </div>
  );
};

export default InfoCard;

