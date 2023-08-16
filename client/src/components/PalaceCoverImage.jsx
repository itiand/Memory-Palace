import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';

const PalaceCoverImage = () => {
  const { selectedPalace, updateMemoryPalace, changePalaceEntry, savePalaceState, fetchMemoryPalaces, setSelectedPalace, onCloseModal, isEditMode, setIsEditMode, newImageURL, setNewImageURL, selectRoom, selectedRoom, isValidUrl, setShowAlert, showAlert, setAlertMessage, alertMessage } = useContext(PalaceContext);
  const { PalaceName, PalaceCoverImg, Rooms, PalaceDescription } = selectedPalace;

  //on submit update
  const handleCoverImageSubmit = () => {
    if (!isValidUrl(newImageURL)) {
      setAlertMessage('Please enter a valid URL.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    changePalaceEntry('PalaceCoverImg', newImageURL);  // changes the state. //WALDO: BUGHERE
    setIsEditMode(false);  // exit edit mode after submitting.
  };


  return (
    <div className="relative">
      <img src={PalaceCoverImg} alt={`Cover of ${PalaceName}`} className="image-box w-70 mx-auto rounded" />
      <div className="overlay absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center opacity-0 hover:opacity-60 bg-black rounded">
        <span className="text-white p-2 text-4xl">{PalaceDescription}</span>
        {isEditMode ?
          (
            <div className="flex flex-col items-center space-y-2">
              <input
                type="text"
                value={newImageURL}
                onChange={(e) => setNewImageURL(e.target.value)}
                placeholder="Enter new image URL"
                className="text-black p-1 rounded"
              />
              <span
                className="text-xl py-1 px-2 cursor-pointer text-white hover:text-3xl hover:ease-in-out duration-200"
                onClick={handleCoverImageSubmit}
              >
                <FaCheck />
              </span>
              <span
                className="text-xs py-1 px-2 cursor-pointer text-white hover:text-xl hover:ease-in-out duration-200"
                onClick={() => {
                  setIsEditMode(false);
                  setNewImageURL(""); // Reset the newImageURL to the original URL
                }}
              >
                <FaTimes />
              </span>
            </div>
          ) :
          (
            <span
              className="text-xl py-1 px-2 cursor-pointer text-white hover:text-3xl hover:ease-in-out duration-200"
              onClick={() => setIsEditMode(true)}
            >
              <FaEdit />
            </span>
          )
        }
      </div>
    </div>
  );
};

export default PalaceCoverImage;
