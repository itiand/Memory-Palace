import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";
import { BsFillPinFill } from 'react-icons/bs';
import ImageWithIcons from "./ImageWithIcons";
import TodoList from "./TodoList";
import { themeChange } from "theme-change";
import '../view/RoomView.scss'

function RoomView() {

  const { selectedPalace, updateMemoryPalace, changePalaceEntry, savePalaceState, fetchMemoryPalaces, setSelectedPalace, onCloseModal, isEditMode, setIsEditMode, newImageURL, setNewImageURL, selectRoom, selectedRoom, setSelectedRoom, tasks, updateToDoList, startReadingAndActions, isEditRoomMode, setIsEditRoomMode } = useContext(PalaceContext);
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
      console.log('updateResponse', updateResponse);
      // setSelectedRoom(updateResponse.updatedRoom)
      alert("Save Successful!");
      setIsEditRoomMode(false);
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
    e.preventDefault();

    startReadingAndActions();
  };



  const randomOddState = (keyword, responseMetaphor) => {
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
      // ... (your existing array of funny strings)
    ];

    function containsBeepBoop(inputString) {
      if  (inputString.includes(keyword)) {
        return true;
      }
      return false;
    }

    if ( containsBeepBoop(responseMetaphor) === true ) {
      const randomIndex = Math.floor(Math.random() * odd.length);
      const randomAction = odd[randomIndex];
      if (Math.random() < 0.5) {
        return keyword;
      } return `${keyword}${randomAction}`;
    } else {
      const randomIndex = Math.floor(Math.random() * odd.length);
      const randomAction = odd[randomIndex];
      if (Math.random() < 0.5) {
        return keyword;
      } return `${responseMetaphor}${randomAction}`;
    }
  }
  

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
            <button className={`btn btn-accent btn-sm rounded-full ${isEditRoomMode ? 'btn-outline' : 'btn-active'}`} onClick={(e) => { toggleIsEditRoomMode(e); }}><em>Memorize</em></button>
            {isEditRoomMode && <section id="to_make_list">
              <TodoList randomOddState={randomOddState} isEditRoomMode={isEditRoomMode} setIsEditRoomMode={setIsEditRoomMode} />
              <button
                className="btn btn-outline btn-info rounded-full"
                onClick={(e) => { handleSaveMemory(e, selectedPalace._id, selectedRoom._id, tasks); }}
              >Save Memory</button>

              {isEditRoomMode === false &&
                <section>
                  {selectedRoom &&
                    <div>
                      <p>{selectedRoom.ToDoList[0].keyword}</p>
                    </div>
                  }
                </section>}

            </section>}

            {
              isEditRoomMode === false && <div>
                {selectedPalace && selectedRoomId && selectedPalace.Rooms[selectedRoomId] ? (
                  <ul>
                    {selectedPalace.Rooms[selectedRoomId].ToDoList.length > 0 &&
                      <button className="mt-4 btn btn-accent btn-sm rounded-full" onClick={handleStoryMode}>StoryMode</button>
                    }
                    {selectedPalace.Rooms[selectedRoomId].ToDoList.map(item => (
                      <li key={item.id}>

                        <strong>{item.keyword}: </strong>
                        <span>{item.definition} </span>
                        <div className="hoverArea">
                          <span className="text-green-800">
                            <em>{item.drawDescription}</em>
                          </span>
                          <img
                            className="pinImage w-24 border-2 border-neutral-500 rounded-lg"
                            src={item.generatedImage}
                            alt={item.keyword}
                          />
                        </div>

                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No ToDoList data available.</p>
                )}

              </div>
            }
          </section>


        </form>

      </dialog>
    </>
  );
}

export default RoomView;