import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";


function RoomView() {
  const { selectedPalace, updateMemoryPalace, changePalaceEntry, savePalaceState, fetchMemoryPalaces, setSelectedPalace, onCloseModal, isEditMode, setIsEditMode, newImageURL, setNewImageURL, selectRoom, selectedRoom } = useContext(PalaceContext);
  
  const { PalaceName, PalaceCoverImg, Rooms, PalaceDescription } = selectedPalace;

  const { roomImg } = selectedRoom;
  return (
    <>
      <dialog id="room_view" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="font-bold text-lg">{PalaceName}</h3>
          <h4 className="font-bold text-md"></h4>
          <img src={roomImg} alt="" className="w-full" />
        </form>
      </dialog>
    </>
  );
}

export default RoomView;