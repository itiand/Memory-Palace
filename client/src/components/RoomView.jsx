import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";
import { BsFillPinFill } from 'react-icons/bs';
import ImageWithIcons from "./ImageWithIcons";
import TodoList from "./TodoList";


function RoomView() {
  const { selectedPalace, updateMemoryPalace, changePalaceEntry, savePalaceState, fetchMemoryPalaces, setSelectedPalace, onCloseModal, isEditMode, setIsEditMode, newImageURL, setNewImageURL, selectRoom, selectedRoom, setSelectedRoom, tasks} = useContext(PalaceContext);
  const [icons, setIcons] = useState(selectedRoom.roomPins);


  const { PalaceName, PalaceCoverImg, Rooms, PalaceDescription } = selectedPalace;
  const { roomImg, name } = selectedRoom;


  const handleRoomClose = () => {
  //   setSelectedRoom({}) $$$
  window.reg_view.showModal();
  }

  const handleSaveMemory = () => {
    console.log(tasks)
    // changePalaceEntry(Rooms, tasks);
    // window.add_memory_view.close();
    // window.reg_view.showModal();
  };
  
  // const handleRoomClose = () => {
  //   setSelectedRoom({})
  // }

  return (
    <>
      <dialog id="room_view" className="modal">
        <form method="dialog" className="modal-box room-view-modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onCloseModal}>✕</button>
          <h4 className="text-sm"><em>{PalaceName}</em></h4>
          <h3 className="font-bold text-lg">{name}</h3>
          <img src={roomImg} className="m-auto" alt="" />
          {/* <ImageWithIcons imageUrl={roomImg} icons={selectedRoom.roomPins} setIcons={setIcons}></ImageWithIcons> */}
          <section id="to_memorize">
            <TodoList/>
            <button
            className="btn"
            onClick={handleSaveMemory}
          >Save Memory</button>
          </section>
        </form>
      </dialog>
    </>
  );
}

export default RoomView;