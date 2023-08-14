import React, { useState, useRef, useContext } from 'react';
import { BsFillPinFill } from 'react-icons/bs';
import { PalaceContext } from '../providers/palaceProvider';


const ImageWithIcons = ({ imageUrl, icons, setIcons }) => {
  const { selectedPalace, updateMemoryPalace, changePalaceEntry, savePalaceState, fetchMemoryPalaces, setSelectedPalace, onCloseModal, isEditMode, setIsEditMode, newImageURL, setNewImageURL, selectRoom, selectedRoom, setSelectedRoom } = useContext(PalaceContext);

  const imageRef = useRef(null);

  const handleImageClick = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const xPercentage = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercentage = ((e.clientY - rect.top) / rect.height) * 100;
    setIcons(oldIcons => [...oldIcons, { x: xPercentage, y: yPercentage }]);
  };

  return (
    <div className='relative mb-4'>
      <img src={imageUrl} alt='Clickable' onClick={handleImageClick} className='w-full' ref={imageRef} />
      {icons && icons.map((icon, index) => (
        <span onClick={() => {console.log('pin click')}}>
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
        </span>
      ))}
    </div>
  );
};

export default ImageWithIcons;


//still need the pin functionality
  //for each toDoListItem a room has
    //grabs the x and y coordinates,
//need the pins to be associated with the toDoItem.

//so a selectedPalace

