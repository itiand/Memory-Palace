import React, { useState, useContext } from "react";
import AddMemory from "./AddMemory"
import { PalaceContext } from "../providers/palaceProvider";

const AddRoom = () => {
  const {
    findPalaceById,
    switchSelectPalaceById,  
    switchToLastPalace,
    createNewPalace,
    deleteCurrentSelectedPalace,  
    deletePalaceEntry, 
    createPalaceExample,
    
    selectedPalace,
    savePalaceState,
    changePalaceEntry,
    tasks,
    setTasks,
    createNewRoom
    
  } = useContext(PalaceContext);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomUrl, setRoomUrl] = useState("");
  const [errors, setErrors] = useState({});

   // Async Version
  // const createNewRoom = async () => {
  //   try {
  //     // make name = roomName etc
  //     const newRoomObject = {
  //       roomImg: roomUrl,
  //         name: roomName,
  //         roomdescription: roomDescription,
  //         Pins: [
  //           {
  //             x: null,
  //             y: null,
  //             toDoItem: null,
  //           }
  //         ]
  //       }
  
  //     console.log(selectedPalace.Rooms);
  //     const newArray = selectedPalace["Rooms"];
  //     newArray.push((newRoomObject))
  //     console.log(selectedPalace["Rooms"])
  //     console.log(newArray);
  //     // console.log(newRoomArray);
  //     // const newRoomArray = selectedPalace.Rooms
  //     // console.log(selectedPalace.Rooms);
  //     // selectedPalace.Rooms.push(newRoomObject);
  //     // Wait for changePalaceEntry to complete
      
  //     // Now call savePalaceState
  //     await changePalaceEntry("Rooms", newArray);
  //     // await savePalaceState();
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };


  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleRoomDescriptionChange = (event) => {
    setRoomDescription(event.target.value);
  };

  const handleRoomUrlChange = (event) => {
    setRoomUrl(event.target.value);
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
          src="https://media.tenor.com/tvFWFDXRrmMAAAAd/blow-mind-mind-blown.gif"
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