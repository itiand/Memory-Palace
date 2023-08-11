import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";
import { GrView } from 'react-icons/gr';


function RegularPalaceView() {
  const { selectedPalace } = useContext(PalaceContext);
  const { PalaceName, PalaceCoverImg, Rooms } = selectedPalace;

  //rooms object into an array
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (Rooms) {
      const roomArray = Object.values(Rooms);
      setRooms(roomArray);
    }
  }, [Rooms]);


  // console.log('roomArray', roomArray);

  return (
    <>
      <dialog id="reg_view" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="font-bold text-lg">{selectedPalace.PalaceName}</h3>
          <img src={PalaceCoverImg} alt={`Cover of ${PalaceName}`} className="image-box w-70 mx-auto" />
          <div className="reg_view-rooms pt-3">
            <h4 className="text-sm">Your rooms</h4>
            <div className="carousel rounded-box w-full gap-x-1 cursor-pointer">
              {rooms.map((room, index) => {
                return (
                  <div key={index} className="carousel-item w-1/2 relative">
                    <img src={room.roomImg} alt={room.roomDescription} className="w-full" />
                    <div className="overlay absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-50 bg-black">
                      <span className="text-white p-2 bg-gray-300 rounded"><GrView/></span>
                    </div>
                  </div>
                );
              })}
              </div>
              {/****TONY ADDED*****/}
                <button className="btn" onClick={() => {
                    window.reg_view.close()
                  }} > Story-Mode </button>
                <button className="btn" onClick={() => {
                  window.reg_view.close();
                  window.add_room_view.showModal();
                }}> Add New Room </button>
                <button className="btn"onClick={() => window.reg_view.close()}  >Close</button>
             {/****TONY END*****/}
              
          </div>
        </form>
      </dialog>
    </>
  );
}


// {/* Regular Palace Modal: * Clicking Main Photo to Edit
//           Cover * Hover for Descriptions * Click Rooms to Edit
//           Rooms{" "} */}

// {/* <div className="regular-modal-rooms w-full flex">
//             <img src="https://i.imgur.com/EdZmnSg.jpeg" alt="Room 1" />
//             <img src="https://i.imgur.com/rXkxaAo.jpeg" alt="Room 2" />
//             <img src="https://i.imgur.com/gNoTLLj.jpeg" alt="Room 3" />
//             <img src="https://i.imgur.com/NIYnoFP.jpeg" alt="Room 4" />
//             <img src="https://i.imgur.com/QokO0HE.jpeg" alt="Room 5" />
//           </div> */}

export default RegularPalaceView;