import React, { useState, useRef } from 'react';
import { BsFillPinFill } from 'react-icons/Bs';


const ImageWithIcons = ({ imageUrl }) => {
  const [icons, setIcons] = useState([]);
  const imageRef = useRef(null);

  const handleImageClick = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const xPercentage = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercentage = ((e.clientY - rect.top) / rect.height) * 100;

    setIcons(oldIcons => [...oldIcons, { x: xPercentage, y: yPercentage }]);  };

  return (
    <div className='relative'>
      <img src={imageUrl} alt='Clickable' onClick={handleImageClick} className='w-full' ref={imageRef} />
      {icons.map((icon, index) => (
        <BsFillPinFill
          key={index}
          style={{
            position: 'absolute',
            top: `calc(${icon.y}% - 6px)`,  // adjust to middle 0,0
            left: `calc(${icon.x}% - 6px)`, // adjust to middle 0,0
            cursor: 'pointer',
            animation: 'pop-in 0.1s ease-out',
            color: 'white',
            boxShadow: '2px 10px 15px -3px rgba(0,0,0,0.8)',
          }}
          size={12}
        />
      ))}
    </div>
  );
};

export default ImageWithIcons;