import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";
import { BsFillPinFill } from 'react-icons/bs';
import ImageWithIcons from "./ImageWithIcons";
import TodoList from "./TodoList";


function RoomView() {
  const { selectedPalace, updateMemoryPalace, changePalaceEntry, savePalaceState, fetchMemoryPalaces, setSelectedPalace, onCloseModal, isEditMode, setIsEditMode, newImageURL, setNewImageURL, selectRoom, selectedRoom, setSelectedRoom, tasks, updateToDoList } = useContext(PalaceContext);

  const [isEditRoomMode, setIsEditRoomMode] = useState(false);
  const [icons, setIcons] = useState(selectedRoom.roomPins);


  const { PalaceName, PalaceCoverImg, Rooms, PalaceDescription } = selectedPalace;
  const { roomImg, roomName } = selectedRoom;


  const handleRoomClose = () => {
    //   setSelectedRoom({}) $$$
    window.reg_view.showModal();
  };

  const handleSaveMemory = async (e, palaceId, roomId, tasksState) => {
    e.preventDefault();

    const updateResponse = await updateToDoList(palaceId, roomId, tasksState);
    console.log('updateRepose', updateResponse);

    if (updateResponse.success) {
      alert("Successfully saved!");
      setIsEditRoomMode(false);
    }
  };

  // const handleRoomClose = () => {
  //   setSelectedRoom({})
  // }

  const randomOddState = (keyword) => {
    // takes in keyword and returns "keyword + funny string"
    const odd = [
      " playing poker.",
      " juggling chainsaws.",
      " on fire.",
      " skydiving.",
      " wearing scuba gear.",
      " doing taxes.",
      " playing the xylophone.",
      " doing yoga.",
      " bungie jumping.",
      " surfing a wave.",
      " programming on a laptop.",
      " staging a sit-in.",
      " holding a lightsaber.",
      " riding a unicycle.",
      " riding a hot air balloon.",
      " riding a roller-coaster.",
      " ice skating.",
      " playing chess.",
      " wearing a ski-mask.",
      " reading a newspaper.",
      " eating tacos.",
      " wearing clown shoes.",
      " blowing bubbles.",
      " feeding pigeons.",
      " in a bunny suit.",
      " dancing salsa.",
      " wielding a frying pan.",
      " drinking from a coconut.",
      " flying a kite.",
      " wearing an astronaut helmet.",
      " on a pogo stick.",
      " doodling on a notepad.",
      " wearing a tutu.",
      " holding a giant lollipop.",
      " having a tea party.",
      " with a magnifying glass.",
      " floating with an umbrella.",
      " wearing a superhero cape.",
      " playing a harmonica.",
      " drawing on a chalkboard.",
      " chasing a butterfly.",
      " sitting on an egg.",
      " in a hula skirt.",
      " using a jackhammer.",
      " with a feathered quill.",
      " in a sumo wrestler outfit.",
      " making a snow angel.",
      " rock climbing.",
      " popping popcorn.",
      " wearing 3D glasses.",
      " gazing through a telescope.",
      " in a chef's hat.",
    ];
    const randomIndex = Math.floor(Math.random() * odd.length);
    const randomAction = odd[randomIndex];
    return `${keyword}${randomAction}`;
  };

  const toggleIsEditRoomMode = (e) => {
    e.preventDefault();
    if (isEditRoomMode) {
      setIsEditRoomMode(false);
    } else {
      setIsEditRoomMode(true);
    }
  };

  return (
    <>
      <dialog id="room_view" className="modal">
        <form method="dialog" className="modal-box room-view-modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onCloseModal}>✕</button>
          <h4 className="text-sm"><em>{PalaceName}</em></h4>
          <h3 className="font-bold text-lg">{roomName}</h3>
          <img src={roomImg} className="m-auto shadow-lg rounded" alt="" />
          {/* <ImageWithIcons imageUrl={roomImg} icons={selectedRoom.roomPins} setIcons={setIcons}></ImageWithIcons> */}
          <section className="mt-4">
            <button className={`btn btn-accent btn-sm ${isEditRoomMode ? 'btn-outline' : 'btn-active'}`} onClick={(e) => { toggleIsEditRoomMode(e); }}><em>To memorize</em></button>
            {isEditRoomMode && <section id="to_make_list">
              <TodoList randomOddState={randomOddState} isEditRoomMode={isEditRoomMode} setIsEditRoomMode={setIsEditRoomMode} />
              <button
                className="btn"
                onClick={(e) => { handleSaveMemory(e, selectedPalace._id, selectedRoom._id, tasks); }}
              >Save Memory</button>
            </section>}
          </section>
        </form>
      </dialog>
    </>
  );
}

export default RoomView;