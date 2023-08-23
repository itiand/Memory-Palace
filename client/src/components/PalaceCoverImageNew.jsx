import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";

/// FOR ADDING NEW PALACE
const PalaceCoverImageNew = ({ newPalaceUrl, setNewPalaceUrl }) => {
  const {
    selectedPalace,
    updateMemoryPalace,
    changePalaceEntry,
    savePalaceState,
    fetchMemoryPalaces,
    setSelectedPalace,
    onCloseModal,
    isEditMode,
    setIsEditMode,
    newImageURL,
    setNewImageURL,
    selectRoom,
    selectedRoom,
    isValidUrl,
    setShowAlert,
    showAlert,
    setAlertMessage,
    alertMessage,
  } = useContext(PalaceContext);
  const { PalaceName, PalaceCoverImg, Rooms, PalaceDescription } =
    selectedPalace;

  //on submit update
  // const handleCoverImageSubmit = () => {
  //   if (!isValidUrl(newImageURL)) {
  //     setAlertMessage('Please enter a valid URL.');
  //     setShowAlert(true);
  //     setTimeout(() => setShowAlert(false), 3000);
  //     return;
  //   }

  //   changePalaceEntry('PalaceCoverImg', newImageURL);  // changes the state. //WALDO: BUGHERE
  //   setIsEditMode(false);  // exit edit mode after submitting.
  // };

  const handleCoverImageInput = () => {
    if (!isValidUrl(newImageURL)) {
      alert("Please enter a valid URL.");
      return;
    }

    setNewPalaceUrl(newImageURL);
  };

  return (
    <div className="relative w-72 rounded">
      <img
        src={
          newPalaceUrl
            ? newPalaceUrl
            : "https://www.vinebrookhomes.com/img/default.png"
        }
        alt={`Cover of ${PalaceName}`}
        className="image-box w-70 mx-auto rounded"
      />
      <div className="overlay absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center rounded bg-black opacity-0 hover:opacity-60">
        <span className="p-2 text-white">...cover image for your palace</span>
        {isEditMode ? (
          <div className="flex flex-col items-center space-y-2">
            <input
              type="text"
              value={newImageURL}
              onChange={(e) => setNewImageURL(e.target.value)}
              placeholder="Enter new image URL"
              className="rounded p-1 text-black"
            />
            <span
              className="cursor-pointer px-2 py-1 text-xl text-white duration-200 hover:text-3xl hover:ease-in-out"
              onClick={handleCoverImageInput}
            >
              <FaCheck />
            </span>
            <span
              className="cursor-pointer px-2 py-1 text-xs text-white duration-200 hover:text-xl hover:ease-in-out"
              onClick={() => {
                setIsEditMode(false);
                setNewImageURL(""); // Reset the newImageURL to the original URL
              }}
            >
              <FaTimes />
            </span>
          </div>
        ) : (
          <span
            className="cursor-pointer px-2 py-1 text-xl text-white duration-200 hover:text-3xl hover:ease-in-out"
            onClick={() => setIsEditMode(true)}
          >
            <FaEdit />
          </span>
        )}
      </div>
    </div>
  );
};

export default PalaceCoverImageNew;
