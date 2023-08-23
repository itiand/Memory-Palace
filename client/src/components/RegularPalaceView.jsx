import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";
import {
  FaRegEye,
  FaEdit,
  FaPlus,
  FaCheck,
  FaTimes,
  FaMinusCircle,
  FaMinus,
} from "react-icons/fa";
import AlertMessage from "./AlertMessage";
import RoomView from "./RoomView";
import PalaceCoverImage from "./PalaceCoverImage";

function RegularPalaceView() {
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
    showAlert,
    setShowAlert,
  } = useContext(PalaceContext);

  const { PalaceName, Rooms } = selectedPalace;

  //rooms object into an array
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (Rooms) {
      const roomArray = Object.values(Rooms);
      setRooms(roomArray);
    }
  }, [Rooms]);

  useEffect(() => {
    console.log("selectedRoom updated:", selectedRoom);
  }, [selectedRoom]);

  const handleRoomClick = (roomId) => {
    selectRoom(roomId);
    setIsEditMode(false);
    setNewImageURL("");
    window.room_view.showModal();
    window.reg_view.close();
  };

  const handleNewRoomClick = () => {
    setNewImageURL("");
    window.reg_view.close();
    window.add_room_view.showModal();
  };

  const handleCancelDelete = () => {
    window.delete_confirm.close();
  };

  const deletePalaceFromBackend = async (palaceId) => {
    try {
      const response = await fetch(`api/deleteMemoryPalace/${palaceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          palaceId,
        }),
      });

      const data = await response.json();

      console.log("Response from backend deletion: ", data);

      if (data.success) {
        return true;
      } else {
        console.error(data.message);
        return false;
      }
    } catch (error) {
      console.error("Error deleting palace:", error);
      return false;
    }
  };

  const handleConfirmDelete = async () => {
    window.delete_confirm.close();
    window.reg_view.close();

    const success = await deletePalaceFromBackend(selectedPalace._id);

    if (success) {
      console.log("Palace successfully deleted!");
      alert("Palace Deleted!");
      fetchMemoryPalaces();
    }
  };

  return (
    <>
      {/*delete confirm modal*/}
      <dialog
        id="delete_confirm"
        className="modal m-auto w-1/4 min-w-fit  text-gray-600"
      >
        <form method="dialog" className="modal-box bg-gray-100 text-center">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
          <h3 className="mb-4 text-lg font-bold">
            Are you sure you want do delete this palace?
          </h3>
          <div className="confirm-selection">
            <button
              className="btn mr-2 bg-gray-200 hover:bg-gray-300"
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
            <button
              className="btn bg-red-500 text-white hover:bg-red-600"
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </dialog>

      <dialog id="reg_view" className="modal">
        <form method="dialog" className="modal-box">
          <AlertMessage />
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={onCloseModal}
          >
            ✕
          </button>
          <h3 className="pb-2 text-4xl font-bold">
            {isEditMode && (
              <span
                className="mr-1 inline-block cursor-pointer rounded-full bg-red-500 p-1 text-lg text-white duration-200 hover:bg-red-600 hover:text-2xl hover:ease-in-out"
                onClick={() => {
                  window.delete_confirm.showModal();
                }}
              >
                <FaMinus></FaMinus>
              </span>
            )}
            {PalaceName}
          </h3>
          <PalaceCoverImage></PalaceCoverImage>
          <div className="reg_view-rooms mt-5">
            <div className="flex items-center pb-1 text-lg">
              <h4 className="mr-1 text-gray-700">Your rooms</h4>
              <span
                className="cursor-pointer text-gray-300 duration-200 hover:text-black hover:ease-in-out"
                onClick={handleNewRoomClick}
              >
                <FaPlus />
              </span>
            </div>
            <div className="carousel rounded-box max-h-80 w-full cursor-pointer gap-x-1">
              {rooms.map((room, index) => {
                return (
                  <div key={index} className="carousel-item relative w-1/2">
                    <img
                      src={room.roomImg}
                      alt={room.roomDescription}
                      className="w-full"
                    />
                    <div className="overlay absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-black opacity-0 hover:opacity-60">
                      <span className="mb-1 text-2xl text-white">
                        {room.roomName}
                      </span>
                      <span
                        className="rounded px-2 py-1 text-lg text-white duration-200 hover:text-2xl hover:ease-in-out"
                        onClick={() => {
                          handleRoomClick(room._id);
                        }}
                      >
                        <FaRegEye />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </dialog>
      <RoomView />
    </>
  );
}

export default RegularPalaceView;
