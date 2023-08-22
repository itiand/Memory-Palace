import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";
import {
  FaRegEye,
  FaEdit,
  FaPlus,
  FaCheck,
  FaTimes,
  FaMinusCircle,
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

  return (
    <>
      <dialog id="reg_view" className="modal">
        <form method="dialog" className="modal-box">
          <AlertMessage />
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={onCloseModal}
          >
            ✕
          </button>
          <h3 className="pb-2 text-4xl font-bold">{PalaceName}</h3>
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
