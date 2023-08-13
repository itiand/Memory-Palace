import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";


function RoomView() {
  const { selectedPalace, updateMemoryPalace, changePalaceEntry, savePalaceState, fetchMemoryPalaces, setSelectedPalace, resetTemporaryStates, isEditMode, setIsEditMode, newImageURL, setNewImageURL } = useContext(PalaceContext);

  return (
    <>
      <dialog id="room_view" className="modal">
        <form method="dialog" className="modal-box">
        </form>
      </dialog>
    </>
  );
}

export default RoomView