import React, { useState, useContext } from "react";
import AddMemory from "./AddMemory"
import { PalaceContext } from "../providers/palaceProvider";

const AddRoom = () => {
  const {
    selectedPalace,
    findPalaceById,
    switchSelectPalaceById,  
    switchToLastPalace,
    createNewPalace,
    deleteCurrentSelectedPalace,  
    deletePalaceEntry, 
    createPalaceExample,
    savePalaceState,
    changePalaceEntry,

  } = useContext(PalaceContext);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomUrl, setRoomUrl] = useState("");
  const [errors, setErrors] = useState({});

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleRoomDescriptionChange = (event) => {
    setRoomDescription(event.target.value);
  };

  const handleRoomUrlChange = (event) => {
    setRoomUrl(event.target.value);
  };

  const createNewRoom = async () => {
    try {
    
      const newRoomObject = {
        roomName: roomName,
          roomDescription: roomDescription,
          roomImage: roomUrl,
          Pins: [
            {
              x: null,
              y: null,
              toDoItem: null,
            }
          ]
        }
  
      // console.log(newRoomObject);
  
      // Wait for changePalaceEntry to complete
      await changePalaceEntry("Rooms", newRoomObject);
  
      // Now call savePalaceState
      console.log('savePal');
      await savePalaceState;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  const handleSave = () => {
    const newErrors = {};

    if (!roomName.trim()) {
      newErrors.roomName = "Room Name is required.";
    }
    if (!roomDescription.trim()) {
      newErrors.roomDescription = "Room Description is required.";
    }
    if (!roomUrl.trim()) {
      newErrors.roomUrl = "URL is required.";
    }

    if (Object.keys(newErrors).length === 0) {
      createNewRoom();
      window.add_memory_view.showModal();
      window.add_room_view.close();
    } else {
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    window.add_room_view.close();
  };


  return (
    <dialog id="add_room_view" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Add Room Modal</h3>
        <img
          src="https://i.imgur.com/ZEpq5CO.jpeg"
          className="image-box w-60 mx-auto"
          alt="Room Image"
        />
        <div className="py-4">
          <label htmlFor="roomName" className="block font-semibold">
            Room Name:
          </label>
          <input
            type="text"
            id="roomName"
            className="input-box"
            value={roomName}
            onChange={handleRoomNameChange}
          />
          {errors.roomName && <p className="text-red-500">{errors.roomName}</p>}

          <label htmlFor="roomDescription" className="block font-semibold mt-4">
            Room Description:
          </label>
          <textarea
            id="roomDescription"
            className="input-box"
            value={roomDescription}
            onChange={handleRoomDescriptionChange}
          />
          {errors.roomDescription && <p className="text-red-500">{errors.roomDescription}</p>}

          <label htmlFor="roomUrl" className="block font-semibold mt-4">
            Add URL:
          </label>
          <input
            type="text"
            id="roomUrl"
            className="input-box"
            value={roomUrl}
            onChange={handleRoomUrlChange}
          />
          {errors.roomUrl && <p className="text-red-500">{errors.roomUrl}</p>}
        </div>
        <div className="modal-action">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCancel}
          >
            ✕
          </button>
        </div>
        <div className="flex justify-end mt-4">
          <button className="btn btn-secondary mr-2" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddRoom;