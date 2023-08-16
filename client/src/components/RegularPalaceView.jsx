import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";
import { FaRegEye, FaEdit, FaPlus, FaCheck, FaTimes } from 'react-icons/fa';
import AlertMessage from "./AlertMessage";
import RoomView from "./RoomView";
import PalaceCoverImage from "./PalaceCoverImage";


function RegularPalaceView() {

  const { selectedPalace, updateMemoryPalace, changePalaceEntry, savePalaceState, fetchMemoryPalaces, setSelectedPalace, onCloseModal, isEditMode, setIsEditMode, newImageURL, setNewImageURL, selectRoom, selectedRoom, isValidUrl, showAlert, setShowAlert } = useContext(PalaceContext);

  const { PalaceName, Rooms, } = selectedPalace;

  //rooms object into an array
  const [rooms, setRooms] = useState([]);


  useEffect(() => {
    if (Rooms) {
      const roomArray = Object.values(Rooms);
      setRooms(roomArray);
    }
  }, [Rooms]);

  useEffect(() => {
    console.log('selectedRoom updated:', selectedRoom);
  }, [selectedRoom]);

  const handleRoomClick = (roomId) => {
    selectRoom(roomId);
    setIsEditMode(false);
    setNewImageURL('');
    window.room_view.showModal();
    window.reg_view.close();
  };

  const handleNewRoomClick = () => {
    setNewImageURL('');
    window.reg_view.close();
    window.add_room_view.showModal();
  };

  return (
    <>
      <dialog id="reg_view" className="modal">
        <form method="dialog" className="modal-box">
          <AlertMessage />
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onCloseModal}>✕</button>
          <h3 className="font-bold text-lg">{PalaceName}</h3>
          <PalaceCoverImage ></PalaceCoverImage>
          <div className="reg_view-rooms pt-3">
            <div className="text-sm flex items-center pb-1">
              <h4 className="mr-1 text-gray-700">Your rooms</h4>
              <span className="cursor-pointer text-gray-300 hover:text-black hover:ease-in-out duration-200" onClick={handleNewRoomClick} >
                <FaPlus />
              </span>
            </div>
            <div className="carousel rounded-box w-full gap-x-1 cursor-pointer">
              {rooms.map((room, index) => {
                return (
                  <div key={index} className="carousel-item w-1/2 relative">
                    <img src={room.roomImg} alt={room.roomDescription} className="w-full" />
                    <div className="overlay absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center opacity-0 hover:opacity-60 bg-black">
                      <span className="mb-1 text-white text-lg">{room.roomName}</span>
                      <span className="text-lg py-1 px-2 rounded text-white hover:text-2xl hover:ease-in-out duration-200" onClick={() => { handleRoomClick(room._id); }}><FaRegEye /></span>
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