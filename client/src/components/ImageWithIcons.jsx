import React, { useState, useRef, useContext } from 'react';
import { BsFillPinFill } from 'react-icons/bs';
import { PalaceContext } from '../providers/palaceProvider';
import PropTypes from 'prop-types';



// const ImageWithIcons = ({ imageUrl, icons, setIcons }) => {
//   const { selectedPalace, updateMemoryPalace, changePalaceEntry, savePalaceState, fetchMemoryPalaces, setSelectedPalace, onCloseModal, isEditMode, setIsEditMode, newImageURL, setNewImageURL, selectRoom, selectedRoom, setSelectedRoom } = useContext(PalaceContext);

  const ImageWithIcons = (props) => {

    const { imageUrl, setIcons, icons } = props;

    const { selectedPalace, updateMemoryPalace, changePalaceEntry, savePalaceState, fetchMemoryPalaces, setSelectedPalace, onCloseModal, isEditMode, setIsEditMode, newImageURL, setNewImageURL, selectRoom, selectedRoom, setSelectedRoom } = useContext(PalaceContext);

 
    // ImageWithIcons.propTypes = {
    //   imageUrl: PropTypes.string.isRequired,
    //   icons: PropTypes.arrayOf(
    //     PropTypes.shape({
    //       x: PropTypes.number.isRequired,
    //       y: PropTypes.number.isRequired,
    //       isDragging: PropTypes.bool,
    //     })
    //   ).isRequired,
    //   setIcons: PropTypes.func.isRequired,
    // };
    

  // const imageRef = useRef(null);
  const imageRef = useRef(null);
  const [pinsVisible, setPinsVisible] = useState(true); // Add state to control pin visibility

  const handleImageClick = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const xPercentage = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercentage = ((e.clientY - rect.top) / rect.height) * 100;
    setIcons(oldIcons => [...oldIcons, { x: xPercentage, y: yPercentage }]);
  };

  // const handleImageClick = (e) => {
  //   const rect = imageRef.current.getBoundingClientRect();
  //   const xPercentage = ((e.clientX - rect.left) / rect.width) * 100;
  //   const yPercentage = ((e.clientY - rect.top) / rect.height) * 100;
  //   setIcons(oldIcons => [...oldIcons, { x: xPercentage, y: yPercentage }]);
  // };

  const handleDragStart = (event, index) => {
    const updatedIcons = [...icons];
    updatedIcons[index].isDragging = true;
    setIcons(updatedIcons);
    
    event.dataTransfer.setData("text/plain", JSON.stringify({ x: icons[index].x, y: icons[index].y }));
  };

  const handleDragEnd = (index) => {
    const updatedIcons = [...icons];
    updatedIcons[index].isDragging = false;
    setIcons(updatedIcons);
  };

  const togglePinsVisibility = () => {
    console.log(icons);
    setPinsVisible(prevVisible => !prevVisible);
  };


  return (
    // <div className='relative mb-4'>
    //   <img src={imageUrl} alt='Clickable' onClick={handleImageClick} className='w-full' ref={imageRef} />
    //   {icons && icons.map((icon, index) => (
    //     <span onClick={() => {console.log('pin click')}}>
    //       <BsFillPinFill
    //         key={index}
    //         style={{
    //           position: 'absolute',
    //           top: `calc(${icon.y}% - 6px)`,  // adjust to middle 0,0
    //           left: `calc(${icon.x}% - 6px)`, // adjust to middle 0,0
    //           cursor: 'pointer',
    //           animation: 'pop-in 0.1s ease-out',
    //           color: 'white',
    //           boxShadow: '2px 10px 15px -3px rgba(0,0,0,0.8)',
    //         }}
    //         size={12}
    //       />
    //     </span>
    //   ))}
    // </div>

    <div className='relative mb-4'>
    <img src={imageUrl} alt='Clickable' onClick={handleImageClick} className='w-full' ref={imageRef} />
    {icons && pinsVisible && icons.map((icon, index) => (
      <span
        key={index}
        draggable={!icon.isDragging}
        onDragStart={(event) => handleDragStart(event, index)}
        onDragEnd={() => handleDragEnd(index)}
        style={{
          position: 'absolute',
          top: `calc(${icon.y}% - 6px)`,
          left: `calc(${icon.x}% - 6px)`,
          cursor: 'grab',
          animation: 'pop-in 0.1s ease-out',
          color: 'red',
          fontSize: '40px',
          boxShadow: '2px 10px 15px -3px rgba(0,0,0,0.8)',
          ...(icon.isDragging && {
            boxShadow: '2px 10px 15px -3px rgba(0,0,0,0.4)',
          }),
        }}
      >
        <BsFillPinFill size={12} />
      </span>
    ))}
    <button type="button" onClick={togglePinsVisibility}>
      {pinsVisible ? 'Hide Pins' : 'Show Pins'}
    </button>
  </div>

    
  );
};

export default ImageWithIcons;


//still need the pin functionality
  //for each toDoListItem a room has
    //grabs the x and y coordinates,
//need the pins to be associated with the toDoItem.

//so a selectedPalace

