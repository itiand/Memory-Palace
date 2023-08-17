import React, { useState, useContext } from "react";
import AddMemory from "./AddMemory";
import { PalaceContext } from "../providers/palaceProvider";
import '../view/addNewPalace.scss';

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
    setSelectedRoom,
    savePalaceState,
    changePalaceEntry,
    tasks,
    setTasks,
    createNewRoom,

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


  // Creating New Room (with basic frame)
  //   const createNewRoom = () => {
  //     const newRoomObject = {
  //       _id: Date.now(),
  //         roomImg: roomUrl,
  //         roomName: roomName,
  //         roomDescription: roomDescription,
  //         ToDoList: null,
  //       };
  //     const newArray = selectedPalace["Rooms"];
  //     newArray.push(newRoomObject);
  //     changePalaceEntry("Rooms", newArray);

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
      createNewRoom(roomUrl, roomName, roomDescription);
      // setSelectedRoom(selectedPalace.Rooms);
      window.reg_view.showModal();
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
      <div className="modal-box w-4/12 max-w-5xl">
        <h3 className="font-bold text-3xl text-center mb-4">Add Room</h3>
        <div className="max-w-9/12">
          <img
            src="https://media.giphy.com/media/fxLFhcMtyGDL4k7kXA/giphy.gif"
            className="image-box w-64 mx-auto rounded drop-shadow-lg"
            alt="Room Image"
          />
          <div className="py-4">
            <div className="input-section pb-3">
              <label htmlFor="roomName" className="block font-semibold">
                Room Name:
              </label>
              <input
                type="text"
                id="roomName"
                placeholder="Room Name"
                value={roomName}
                onChange={handleRoomNameChange}
                className="input border-none input-info input-xs w-full max-w-xs input-field"
              />
              {errors.roomName && <p className="text-red-500">{errors.roomName}</p>}
            </div>
            <div className="input-section pb-3">
              <label htmlFor="roomDescription" className="block font-semibold mt-4">
                Room Description:
              </label>
              <textarea
                id="roomDescription"
                placeholder="Room Description"
                value={roomDescription}
                onChange={handleRoomDescriptionChange}
                className="input-section textarea input-xs textarea-info max-h-20 w-full input-field  border-none overflow-hidden"
              />
              {errors.roomDescription && <p className="text-red-500">{errors.roomDescription}</p>}
            </div>

            <div className="input-section pb-3">
              <label htmlFor="roomUrl" className="block font-semibold mt-4">
                Add URL:
              </label>
              <input
                type="text"
                placeholder="Cover image for your room"
                id="roomUrl"
                className="input-section textarea input-xs textarea-info h-4 w-full input-field resize-none border-none overflow-hidden"
                value={roomUrl}
                onChange={handleRoomUrlChange}
              />
              {errors.roomUrl && <p className="text-red-500">{errors.roomUrl}</p>}
            </div>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleCancel}
            >
              ✕
            </button>
          </div>
          <div className="flex justify-start mt-4">
            <button className="btn btn-default mr-2" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default AddRoom;