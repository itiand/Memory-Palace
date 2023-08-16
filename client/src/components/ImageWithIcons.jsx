import React, { useState, useRef, useContext } from 'react';
import { BsFillPinFill } from 'react-icons/bs';
import InfoCard from './InfoCard';
import { PalaceContext } from '../providers/palaceProvider';

const ImageWithIcons = (props) => {
  const { imageUrl, icons, setIcons } = props;
  const {hoveredIndex, setHoveredIndex } = useContext(PalaceContext);

  const imageRef = useRef(null);
  const [pinsVisible, setPinsVisible] = useState(true);
  const [infoCardsVisble, setInfoCardsVisible] = useState(true);
  const [showAllInfoCards, setShowAllInfoCards] = useState(false);

  const [clickedIndex, setClickedIndex] = useState(-1); // Track clicked index
  
  
  let hoverTimeout; // Variable to store the timeout
  const handleMouseEnter = (index) => {
    hoverTimeout = setTimeout(() => {
      if (!icons[index].isDragging) {
        setHoveredIndex(index);
      }
    }, 2000); // 2000 milliseconds (2 seconds)
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout); // Clear the timeout when leaving the element
    setHoveredIndex(null);
    setClickedIndex(null);
  };
  // const handleHeartHover = (index) => {
  //   setHoveredIndex(index);
  //   console.log(icons[index].generatedImage);
  // };

  const handleHeartClick = (index) => {
    setClickedIndex(index);
  };

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
    if (pinsVisible) {
      setPinsVisible(false);
      setShowAllInfoCards(true);
    } 
    if (showAllInfoCards) {
      setShowAllInfoCards(false);
    } else {
      setPinsVisible(true);
    }
  };

  // const toggleInfoCardsVisibility = () => {
  //   setInfoCardsVisible(prevInfoCardsVisible => !prevInfoCardsVisible);
  // };

  // const toggleViewMode = () => {
  //   let count = 0;
  //   if (count === 0) {
  //     count = 1;
  //     setPinsVisible(true);
  //   }
  //   if (count === 1) {
  //     count = 2;
  //     setPinsVisible(false);
  //     setInfoCardsVisible(true);
  //   }
  //   if (count === 2) {
  //     count = 0;
  //     setPinsVisible(false);
  //     setInfoCardsVisible(false);
  //   }
  // }

  return (
    <div className='relative mb-4'>
      <img src={imageUrl} alt='Clickable' onClick={handleImageClick} className='w-full rounded drop-shadow-xl' ref={imageRef} />
      {icons && pinsVisible && icons.map((icon, index) => (
  <span
    key={index}
    draggable={!icon.isDragging}
    onDragStart={(event) => handleDragStart(event, index)}
    onDragEnd={handleDragEnd(index)}
    onMouseEnter={() => handleMouseEnter(index)}
    onMouseLeave={handleMouseLeave}
    onClick={() => handleHeartClick(index)}
    style={{
      position: 'relative', // Set position to relative for the container
            top: `calc(${icon.y}% - 30px)`,
            left: `calc(${icon.x}% - 30px)`,
            cursor: 'pointer',
          position: 'absolute',
          top: `calc(${icon.y}% - 30px)`,
          left: `calc(${icon.x}% - 30px)`,
          cursor: 'grab',
          animation: 'pop-in 0.1s ease-out',
          zIndex: icons.length - index, 
          transition: 'top 0s ease-out, left 0.0s ease-out',
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
            transform: 'rotate(45deg)',
            zIndex: 3,
          }}
          >
            {index + 1}
          </span>
        </div>
       {/* ... Heart icon ... */}
       {infoCardsVisble && (showAllInfoCards || hoveredIndex === index || clickedIndex === index) && (
            <InfoCard
              keyword={icons[index].keyword}
              definition={icons[index].definition}
              image={icons[index].generatedImage}
              positionX={icons[index].x}
              positionY={icons[index].y}
            />
          )}
        </span>
      ))}
      <button type="button" onClick={togglePinsVisibility}>
        Toggle View
      </button>
    </div>
  );
};

export default ImageWithIcons;
