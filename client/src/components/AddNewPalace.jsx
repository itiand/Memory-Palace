import React, { useState, useContext } from "react";
import { PalaceContext } from "../providers/palaceProvider";
import "../view/addNewPalace.scss"; // Make sure to import your stylesheet
import PalaceCoverImageNew from "./PalaceCoverImageNew";

const AddNewPalace = () => {
  const {
    memoryPalaces,
    selectedPalace,
    switchSelectPalaceById,
    switchToLastPalace,
    deleteCurrentSelectedPalace,
    deletePalaceEntry,
    changePalaceEntry,
    savePalaceState,
    createNewPalace,
    isValidUrl,
    isImageUrl,
    newImageURL,
  } = useContext(PalaceContext);

  const [newPalaceName, setNewPalaceName] = useState("");
  const [newPalaceDescription, setNewPalaceDescription] = useState("");
  const [newPalaceUrl, setNewPalaceUrl] = useState("");

  const handleNewPalaceNameChange = (event) => {
    setNewPalaceName(event.target.value);
  };

  const handleNewPalaceDescriptionChange = (event) => {
    setNewPalaceDescription(event.target.value);
  };

  const handleNewPalaceUrl = (e) => {
    setNewPalaceUrl(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    isValidUrl(newPalaceUrl);
    isImageUrl(newPalaceUrl);
    createNewPalace(newPalaceName, newPalaceDescription, newImageURL);
    window.add_palace_view.close();
    window.reg_view.showModal();
  };

  return (
    <dialog id="add_palace_view" className="modal">
      <div className="modal-box add-palace-modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">New Palace:</h3>

        <div className="textInput">


          <div className="input-section">
            <label>Add Palace Name: </label>
            <input
              type="text"
              placeholder="Palace Name"
              value={newPalaceName}
              onChange={(e) => setNewPalaceName(e.target.value)}
              className="input input-bordered input-info input-xs w-full max-w-xs"
            />
          </div>

          <div className="input-section-Description">
            <label className="Palace Description">Add Palace Description: </label>
            <textarea
              placeholder="PalaceDescription"
              value={newPalaceDescription}
              onChange={handleNewPalaceDescriptionChange}
              className="textarea textarea-info"
            />
          </div>
          <div className="input-section">
            <PalaceCoverImageNew newPalaceUrl={newPalaceUrl} handleNewPalaceUrl={handleNewPalaceUrl} setNewPalaceUrl={setNewPalaceUrl} />
          </div>
          <div className="EditAndSubmitButton">
          <button
            className="btn btn-success"
            onClick={handleSave}
          >
            Continue
          </button>
        </div>
        </div>
        <div className="modal-action">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => window.add_palace_view.close()}
          >
            ✕
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddNewPalace;
