import { useState, useEffect, useContext } from "react";
// import React, { useEffect } from 'react';
// import RegularPalaceModal from './RegularPalaceModal';
import { PalaceContext } from "../providers/palaceProvider";

const AddNewPalace = () => {
  const {
    initAndFetchNewMemoryPalace,
    deleteAndSwitchToLastPalace,
    updateMemoryPalace,
    fetchMemoryPalaces,

    themes,
    memoryPalaces,
    setMemoryPalaces,
    selectedPalace,
    setSelectedPalace,

    findPalaceById,
    switchSelectPalaceById,
    switchToLastPalace,
    createNewPalace,
    deleteCurrentSelectedPalace,
    changePalaceEntry,
    deletePalaceEntry,
    savePalaceState,

    isValidUrl,
    isImageUrl,
  } = useContext(PalaceContext);


  // const { initAndFetchNewMemoryPalace } = useContext(PalaceContext)

  const [newPalaceName, setNewPalaceName] = useState("");
  const [newPalaceDescription, setNewPalaceDescription] = useState("");
  const [newPalaceUrl, setNewPalaceUrl] = useState("");


  const handleNewPalaceNameChange = (event) => {
    console.log(event.target.value)
    setNewPalaceName(event.target.value);
  };
  const handleNewPalaceDescriptionChange = (event) => {
    console.log(event.target.value)
    setNewPalaceDescription(event.target.value);
  };
  const handleNewPalaceUrl = (e) => {
    console.log(e.target.value)
    setNewPalaceUrl(e.target.value)
  }

  // const submitSelectedPalaceNameDesc =(newPalaceName, newPalaceDescription) => {
  //   console.log("PalaceCreated with PalaceName and Description");
  //   createNewPalace(newPalaceName.toString, newPalaceDescription.toString);
  // }


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(newPalaceName)
    console.log(newPalaceDescription)

    isValidUrl(newPalaceUrl)
    isImageUrl(newPalaceUrl)
    createNewPalace(newPalaceName, newPalaceDescription, newPalaceUrl);
    window.add_palace_view.close();
  };

  return (
    <dialog id="add_palace_view" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">
          Add New Palace Description (name, description)
        </h3>

        <input
          type="text"
          placeholder="Palace Name"
          value={newPalaceName}
          onChange={handleNewPalaceNameChange}
          className="input input-bordered input-info input-xs w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Palace Cover Image Url"
          value={newPalaceUrl}
          onChange={handleNewPalaceUrl}
          className="input input-bordered input-info input-xs w-full max-w-xs"
        />
        <textarea
          placeholder="Palace Description"
          value={newPalaceDescription}
          onChange={handleNewPalaceDescriptionChange}
          className="textarea textarea-info"
        />

        <img
          src="https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="image-box w-60 mx-auto"
        ></img>

        <div className="modal-action">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => window.add_palace_view.close()}
          >✕</button>
        </div>

        <div className="addAndSubmitButton">
          <button
            className="btn btn-success"
            onClick={() => {
              window.add_palace_view.close();
              window.add_palace_image_view.showModal();
            }}
          > Add Palace Image </button>
          <button
            className="btn btn-success"
            onClick={handleSubmit}
          > Submit Palace </button>
        </div>
        <div>
          <button
            className="btn"
            onClick={() => {
              window.add_palace_image_view.close();
              window.reg_view.showModal();
            }}
          >Save room </button>
        </div>
      </div>
    </dialog>
  );
};


export default AddNewPalace;

