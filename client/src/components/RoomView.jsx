import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";
import { BsFillPinFill } from 'react-icons/Bs';
import ImageWithIcons from "./ImageWithIcons";


function RoomView() {
  const { selectedPalace, updateMemoryPalace, changePalaceEntry, savePalaceState, fetchMemoryPalaces, setSelectedPalace, onCloseModal, isEditMode, setIsEditMode, newImageURL, setNewImageURL, selectRoom, selectedRoom, setSelectedRoom} = useContext(PalaceContext);

  const { PalaceName, PalaceCoverImg, Rooms, PalaceDescription } = selectedPalace;

  const { roomImg, name } = selectedRoom;

  const handleRoomClose = () => {
    setSelectedRoom({})
  }
  return (
    <>
      <dialog id="room_view" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onCloseModal}>✕</button>
          <h4 className="text-sm">{PalaceName}</h4>
          <h3 className="font-bold text-lg">{name}</h3>
          <img src={roomImg} alt="" className="w-full" />
          <ImageWithIcons imageUrl={roomImg}></ImageWithIcons>
        </form>
      </dialog>
    </>
  );
}

export default RoomView;