import React, { useState, useEffect } from "react";
import RegularPalaceModal from './RegularPalaceModal';

const AddNewPalace = () => {

  const [newPalaceName, setNewPalaceName] = useState("");
  const [newPalaceDescription, setNewPalaceDescription] = useState("");

  const handleNewPalaceNameChange = (event) => {
    setNewPalaceName(event.target.value);
  };

  const handleNewPalaceDescriptionChange = (event) => {
    setNewPalaceDescription(event.target.value);
  };

  return (
    <div className="navbar-end">
      {/* Add New Palace */}
      <button className="btn" onClick={() => window.my_modal_1.showModal()}>
        Add New Palace
      </button>
      <dialog id="my_modal_1" className="modal">
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
              onClick={() => window.my_modal_1.close()}
            >
              ✕
            </button>
          </div>
          <div>
            <button
              className="btn"
              onClick={() => window.my_modal_2.showModal()}
            >
            {" "}
            Add Palace Image{" "}
          </button>

          {/* Add Palace Image */}
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">
                Add Palace Image (upload img){" "}
              </h3>
              <img
                src="https://images.unsplash.com/photo-1635945416566-6302b54c056b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2060&q=80"
                className="image-box w-60 mx-auto"
              ></img>
              <p className="py-4">
                Description: Add image for cover of Palace * Add
                Description of Room * Save Palace Cover Photo &
                Description * Changes to Regular Palace Modal
              </p>
              <div className="modal-action">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => window.my_modal_2.close()}>
                  ✕
                </button>
              </div>

              {/* Save Add Palace Image */}
              <div>
                <button
                  className="btn"
                  onClick={() => window.my_modal_4.showModal()}
                >
                  Save Add Palace Image
                </button>

                <RegularPalaceModal/>

              </div>
            </div>
          </dialog>
        </div>
      </div>
    </dialog>
  </div>
    )
    };


  export default AddNewPalace;

