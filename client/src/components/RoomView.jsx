import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";
import { BsFillPinFill } from 'react-icons/bs';
import ImageWithIcons from "./ImageWithIcons";
import TodoList from "./TodoList";


function RoomView() {

  const { selectedPalace, updateMemoryPalace, changePalaceEntry, savePalaceState, fetchMemoryPalaces, setSelectedPalace, onCloseModal, isEditMode, setIsEditMode, newImageURL, setNewImageURL, selectRoom, selectedRoom, setSelectedRoom, tasks, updateToDoList, startReadingAndActions } = useContext(PalaceContext);

  const [isEditRoomMode, setIsEditRoomMode] = useState(false);
  const [icons, setIcons] = useState(selectedRoom.roomPins);


  const { PalaceName, PalaceCoverImg, Rooms, PalaceDescription } = selectedPalace;
  const { roomImg, roomName, ToDoList } = selectedRoom;
  const selectedRoomId = selectedRoom._id;
  //   if(isEditRoomMode === false)  
  //     {
  //       const h2 = selectedPalace.Rooms[selectedRoomId].ToDoList.map((item) => 
  //       (
  //         <div key={item.id}>
  //         {<strong>{item.keyword}</strong>}
  //         {<span> {item.definition}</span>}
  //         </div>

  //         )
  // )
  //       console.log(h2)
  //   }
  // console.log("selectedPalace", selectedPalace.Rooms[selectedRoomId].ToDoList[0].keyword)
  // console.log("selectedroom", selectedRoom)
  // selectedRoom.map(task => {
  //   console.log(task)
  // })

  const handleRoomClose = () => {
    //   setSelectedRoom({}) $$$
    window.reg_view.showModal();
  };

  const handleSaveMemory = async (e, palaceId, roomId, tasksState) => {
    e.preventDefault();

    console.log('RIGHT HERE', palaceId, roomId, tasksState);

    const updateResponse = await updateToDoList(palaceId, roomId, tasksState);

    if (updateResponse.success === true) {
      console.log('updateResponse', updateResponse)
      setSelectedRoom(updateResponse.updatedRoom)
      alert("Save Successful!")
      setIsEditRoomMode(false)
      const newId = selectedRoom._id;
      selectedPalace.Rooms[newId].ToDoList = tasks;
      savePalaceState();
    } else {
      alert("Failed to save! " + (updateResponse.message || ""));
    }

    // window.add_memory_view.close();
    // window.reg_view.showModal();
  };


  const handleStoryMode = (e) => {
    e.preventDefault()
    startReadingAndActions();
  }
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
          {/* <img src={roomImg} className="m-auto shadow-lg rounded" alt="" /> */}
          {/* <ImageWithIcons imageUrl={roomImg} icons={selectedRoom.roomPins} setIcons={setIcons}></ImageWithIcons> */}
          <ImageWithIcons imageUrl={roomImg} icons={selectedRoom.ToDoList} setIcons={setIcons}></ImageWithIcons>
          <section className="mt-4">
            <button className={`btn btn-accent btn-sm ${isEditRoomMode ? 'btn-outline' : 'btn-active'}`} onClick={(e) => { toggleIsEditRoomMode(e); }}><em>To memorize</em></button>
            {isEditRoomMode && <section id="to_make_list">
              <TodoList randomOddState={randomOddState} isEditRoomMode={isEditRoomMode} setIsEditRoomMode={setIsEditRoomMode} />
              <button
                className="btn"
                onClick={(e) => { handleSaveMemory(e, selectedPalace._id, selectedRoom._id, tasks); }}
              >Save Memory</button>

            </section>}
            {selectedPalace && selectedRoomId && selectedPalace.Rooms[selectedRoomId] ? (
              <ul>
                {selectedPalace.Rooms[selectedRoomId].ToDoList.map(item => (
                  <li key={item.id}>
                    <strong>{item.keyword}</strong>
                    <span>{item.definition}</span>
                    <span className="text-green-800">
                      <em>{item.drawDescription}</em>
                    </span>
                    {item.roomImg &&
                      <img
                        className="w-40 border-2 border-neutral-500 rounded-lg"
                        src={item.roomImg}
                        alt={item.keyword}
                      />
                    }
                  </li>
                ))}
              </ul>
            ) : (
              <p>No ToDoList data available.</p>
            )}
          </section>

          <button className="btn" onClick={handleStoryMode}>StoryMode</button>
        </form>

      </dialog>
    </>
  );
}

export default RoomView;