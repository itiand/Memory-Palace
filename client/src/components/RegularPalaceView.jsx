import React, { useContext, useEffect, useState } from "react";
import { PalaceContext } from "../providers/palaceProvider";


function RegularPalaceView() {
  const { selectedPalace } = useContext(PalaceContext);
  const { PalaceName, PalaceCoverImg, Rooms } = selectedPalace;

  //rooms object into an array
  const [ rooms, setRooms ] = useState([])

  useEffect(() => {
    if (Rooms) {
      const roomArray = Object.values(Rooms);
      setRooms(roomArray)
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
          <div className="reg_view-rooms">
            {rooms.map((room, index) => (
              <img key={room.id} src={room.roomImg} alt={room.roomDescription} className="room-img" />
            ))}
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