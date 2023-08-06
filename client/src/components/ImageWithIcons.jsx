import React, { useState } from 'react';
import { BsFillPinFill } from 'react-icons/Bs';

const ImageWithIcons = ({ imageUrl }) => {
  const [icons, setIcons] = useState([]);

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position
    const y = e.clientY - rect.top;  // y position 

    setIcons(oldIcons => [...oldIcons, { x, y }]);
  }

  return (
    <div className='relative'> {/* need to be sure the parent div is relative */}
      <img src={imageUrl} alt='Clickable' onClick={handleImageClick} />
      {icons.map((icon, index) => (
        <BsFillPinFill
          key={index}
          style={{
            position: 'absolute',
            top: `calc(${icon.y}px - 12px)`,  // adjust to middle 0,0
            left: `calc(${icon.x}px - 12px)`, // adjust to middle 0,0
            cursor: 'pointer',
            animation: 'pop-in 0.1s ease-out',
          }}
          size={24} 
        />
      ))}
    </div>
  );
}

export default ImageWithIcons;
