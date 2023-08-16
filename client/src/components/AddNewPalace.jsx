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

  const handleSave = async (e) => {
    e.preventDefault();
    isValidUrl(newPalaceUrl);
    isImageUrl(newPalaceUrl);
    createNewPalace(newPalaceName, newPalaceDescription, newPalaceUrl);
    window.add_palace_view.close();
    window.reg_view.showModal();
  };

  return (
    <dialog id="add_palace_view" className="modal">
      <div className="modal-box add-palace-modal-box w-4/12 max-w-5xl">
        <div className="modal-action">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => window.add_palace_view.close()}
          >
            ✕
          </button>
        </div>
        <h3 className="font-bold text-3xl text-center mb-4">New Palace</h3>
        <div className="max-w-9/12">
          <div className="textInput">
            <div className="input-section pb-3">
              <label className="text-sm">Add Palace Name: </label>
              <input
                type="text"
                placeholder="Palace Name"
                value={newPalaceName}
                onChange={(e) => setNewPalaceName(e.target.value)}
                className="input border-none input-info input-xs w-full max-w-xs input-field"
              />
            </div>

            <div className="input-section pb-3">
              <label className="text-sm palace-description">Add Palace Description: </label>
              <textarea
                placeholder="Palace Description"
                value={newPalaceDescription}
                onChange={(e) => setNewPalaceDescription(e.target.value)}
                className="input-section textarea input-xs textarea-info h-4 w-full input-field resize-none"
              />
            </div>
            <div className="input-section mb-6 flex justify-center">
              <PalaceCoverImageNew newPalaceUrl={newPalaceUrl} setNewPalaceUrl={setNewPalaceUrl} />
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
        </div>
      </div>
    </dialog>
  );
};

export default AddNewPalace;
