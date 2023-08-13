import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";


function RoomView() {
  const { selectedPalace, updateMemoryPalace, changePalaceEntry, savePalaceState, fetchMemoryPalaces, setSelectedPalace, resetTemporaryStates, isEditMode, setIsEditMode, newImageURL, setNewImageURL } = useContext(PalaceContext);
  const { PalaceName, PalaceCoverImg, Rooms, PalaceDescription } = selectedPalace;

  return (
    <>
      <dialog id="room_view" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">{PalaceName}</h3>
          <h4 className="font-bold text-md"></h4>
        </form>
      </dialog>
    </>
  );
}

export default RoomView;