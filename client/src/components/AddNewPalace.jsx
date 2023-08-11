import { useState, useEffect, useContext } from "react";
// import React, { useEffect } from 'react';
// import RegularPalaceModal from './RegularPalaceModal';
import { PalaceContext } from "../providers/palaceProvider";

const AddNewPalace = () => {


  // const { initAndFetchNewMemoryPalace } = useContext(PalaceContext)

  const [newPalaceName, setNewPalaceName] = useState("");
  const [newPalaceDescription, setNewPalaceDescription] = useState("");



  const handleNewPalaceNameChange = (event) => {
    setNewPalaceName(event.target.value);
  };

  const handleNewPalaceDescriptionChange = (event) => {
    setNewPalaceDescription(event.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log(newPalaceName)
  //   console.log(newPalaceDescription)

    // initAndFetchNewMemoryPalace({
    //   PalaceName: newPalaceName,
    //   PalaceDescription: newPalaceDescription
    // })
    // initAndFetchNewMemoryPalace({
    //   name: newPalaceName,
    //   description: newPalaceDescription
    // })
    // try {
    //   const response = await fetch('/api/initMemoryPalace', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    // name: newPalaceName,
    // description: newPalaceDescription,
    //     }),
    //   });

    //   if (response.ok) {
    //     // Redirect to the palace list after successful submission
    //     window.location.href = '/list';
    //   } else {
    //     console.error('Failed to add palace.');
    //   }
    // } catch (error) {
    //   console.error('An error occurred:', error);
    // }
  // };

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
            className="input-box"
          />
          <textarea
            placeholder="Palace Description"
            value={newPalaceDescription}
            onChange={handleNewPalaceDescriptionChange}
            className="input-box"
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
          <div>
            <button
              className="btn"
              onClick={() => {
                window.add_palace_view.close();
                window.add_palace_image_view.showModal();
              }}
            > Add Palace Image </button>
          </div>
        </div>
      </dialog>   
  );
};


export default AddNewPalace;

