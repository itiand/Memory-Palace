import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";
import { FaRegEye, FaEdit, FaPlus, FaCheck } from 'react-icons/fa';


function RegularPalaceView() {
  const { selectedPalace, updateMemoryPalce } = useContext(PalaceContext);
  const { PalaceName, PalaceCoverImg, Rooms, PalaceDescription } = selectedPalace;

  //rooms object into an array
  const [rooms, setRooms] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newImageURL, setNewImageURL] = useState('');

  //states for alert messages
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (Rooms) {
      const roomArray = Object.values(Rooms);
      setRooms(roomArray);
    }
  }, [Rooms]);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };
  
  const isImageUrl = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = url;
    });
  }

  const handleImageSubmit = () => {
    if (!isValidUrl(newImageURL)) {
      setAlertMessage('Please enter a valid URL.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    //api call to update the data
    //UPDATE PALACE --> (newImageURL)
    // setIsEditMode(false);
  };

  // console.log('roomArray', roomArray);

  return (
    <>
      <dialog id="reg_view" className="modal">
        <form method="dialog" className="modal-box">
          {showAlert && (
            <div className="alert alert-warning">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{alertMessage}</span>
            </div>
          )}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="font-bold text-lg">{PalaceName}</h3>
          <div className="relative">
            <img src={PalaceCoverImg} alt={`Cover of ${PalaceName}`} className="image-box w-70 mx-auto" />
            <div className="overlay absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center opacity-0 hover:opacity-60 bg-black">
              <span className="text-white p-2">{PalaceDescription}</span>
              {isEditMode ?
                (
                  <div className="flex flex-col items-center space-y-2">
                    <input
                      type="text"
                      value={newImageURL}
                      onChange={(e) => setNewImageURL(e.target.value)}
                      placeholder="Enter new image URL"
                      className="text-black p-1 rounded"
                    />
                    <span
                      className="text-xl py-1 px-2 cursor-pointer text-white hover:text-3xl hover:ease-in-out duration-200"
                      onClick={handleImageSubmit}
                    >
                      <FaCheck />
                    </span>
                  </div>
                ) :
                (
                  <span
                    className="text-xl py-1 px-2 cursor-pointer text-white hover:text-3xl hover:ease-in-out duration-200"
                    onClick={() => setIsEditMode(true)}
                  >
                    <FaEdit />
                  </span>
                )
              }
            </div>
          </div>
          <div className="reg_view-rooms pt-3">
            <div className="text-sm flex items-center pb-1">
              <h4 className="mr-1 text-gray-700">Your rooms</h4>
              <span className="cursor-pointer text-gray-300 hover:text-black hover:ease-in-out duration-200" >
                <FaPlus />
              </span>
            </div>
            <div className="carousel rounded-box w-full gap-x-1 cursor-pointer">
              {rooms.map((room, index) => {
                return (
                  <div key={index} className="carousel-item w-1/2 relative">
                    <img src={room.roomImg} alt={room.description} className="w-full" />
                    <div className="overlay absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center opacity-0 hover:opacity-60 bg-black">
                      <span className="mb-1 text-white text-xs">{room.name}</span>
                      <span className="text-lg py-1 px-2 rounded text-white hover:text-2xl hover:ease-in-out duration-200"><FaRegEye /></span>
                    </div>
                  </div>
                );
              })}
            </div>
            {/****TONY ADDED*****/}
            <button className="btn" onClick={() => {
              window.reg_view.close();
            }} > Story-Mode </button>
            <button className="btn" onClick={() => {
              window.reg_view.close();
              window.add_room_view.showModal();
            }}> Add New Room </button>
            <button className="btn" onClick={() => window.reg_view.close()}  >Close</button>
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