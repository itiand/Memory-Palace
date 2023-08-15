import React, { useState, useRef } from 'react';
import { BsFillPinFill } from 'react-icons/bs';

const ImageWithIcons = (props) => {
  const { imageUrl, icons, setIcons } = props;

  const imageRef = useRef(null);
  const [pinsVisible, setPinsVisible] = useState(true);

  const handleImageClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating
    const rect = imageRef.current.getBoundingClientRect();
    const xPercentage = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercentage = ((e.clientY - rect.top) / rect.height) * 100;
    setIcons(oldIcons => [...oldIcons, { x: xPercentage, y: yPercentage }]);
  };

  const handleDragStart = (event, index) => {
    const updatedIcons = [...icons];
    updatedIcons[index].isDragging = true;
    setIcons(updatedIcons);

    event.dataTransfer.setData("text/plain", JSON.stringify({ index }));
  };

  const handleDragEnd = (index) => (event) => {
    const updatedIcons = [...icons];
    updatedIcons[index].isDragging = false;

    const rect = imageRef.current.getBoundingClientRect();
    const xPercentage = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercentage = ((event.clientY - rect.top) / rect.height) * 100;

    updatedIcons[index].x = xPercentage;
    updatedIcons[index].y = yPercentage;

    setIcons(updatedIcons);
  };

  const togglePinsVisibility = () => {
    setPinsVisible(prevVisible => !prevVisible);
  };

  return (
    <div className='relative mb-4'>
    <img src={imageUrl} alt='Clickable' onClick={handleImageClick} className='w-full' ref={imageRef} />
    {icons && pinsVisible && icons.map((icon, index) => (
      <span
        key={index}
        draggable={!icon.isDragging}
        onDragStart={(event) => handleDragStart(event, index)}
        onDragEnd={handleDragEnd(index)}
        style={{
          position: 'absolute',
          top: `calc(${icon.y}% - 30px)`,
          left: `calc(${icon.x}% - 30px)`,
          cursor: 'grab',
          animation: 'pop-in 0.1s ease-out',
          transition: 'top 0.2s ease-out, left 0.2s ease-out',
          ...(icon.isDragging && {
            boxShadow: '2px 10px 15px -3px rgba(0,0,0,0.4)',
          }),
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '25px',
            height: '40px',
            borderRadius: '50%',
            background: 'red', // Heart color
            color: 'red',
            fontSize: '60px',
            position: 'relative',
            boxShadow: '2px 10px 15px -3px rgba(0,0,0,0.8)',
            transform: 'rotate(-45deg)', // Rotate to make it heart-shaped
          }}
        >
          <div style={{ transform: 'rotate(45deg)' }}>
            &hearts;
          </div>
          <span
           style={{
            fontWeight: 'bold', // Make the number bolder
            fontSize: '21px', // Make the number smaller
            color: 'white', // Change color to black
            position: 'absolute',
            // top: '50%', // Adjust vertical position
            // left: '50%',
            transform: 'rotate(45deg)',
            // transform: 'translate(-50%, -50%) scale(1.5)', // Enlarge the number
            zIndex: 3,
          }}
          >
            {index + 1}
          </span>
        </div>
      </span>
    ))}
    <button type="button" onClick={togglePinsVisibility}>
      {pinsVisible ? 'Hide Pins' : 'Show Pins'}
    </button>
  </div>
  );
};

export default ImageWithIcons;
