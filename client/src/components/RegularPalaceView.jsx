import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";
import { FaRegEye, FaEdit, FaPlus, FaCheck, FaTimes } from 'react-icons/fa';
import AlertMessage from "./AlertMessage";


function RegularPalaceView() {
  const { selectedPalace, updateMemoryPalace, changePalaceEntry, savePalaceState, fetchMemoryPalaces } = useContext(PalaceContext);
  const { PalaceName, PalaceCoverImg, Rooms, PalaceDescription } = selectedPalace;

  //rooms object into an array
  const [rooms, setRooms] = useState([]);

  //for edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [newImageURL, setNewImageURL] = useState('');

  //states for alert messages
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  //////
  //helpers 
  ///
  useEffect(() => {
    if (Rooms) {
      const roomArray = Object.values(Rooms);
      setRooms(roomArray);
    }
  }, [Rooms]);

  const isValidUrl = (url) => { // checks if it's a valid url
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isImageUrl = (url) => { //checks if the url is actually an img url
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = url;
    });
  };
  ////
  //helpers END//
  /////

  //on submit update
  const handleImageSubmit = () => {
    if (!isValidUrl(newImageURL)) {
      setAlertMessage('Please enter a valid URL.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    isImageUrl(newImageURL)
      .then(() => {
        changePalaceEntry('PalaceCoverImg', newImageURL);  // Update the local state.
        savePalaceState();  // save the updated state to the database.
        setIsEditMode(false);  // exit edit mode after submitting.
      })

      .catch(() => {
        setAlertMessage('This URL does not point to a valid image.');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  return (
    <>
      <dialog id="reg_view" className="modal">
        <form method="dialog" className="modal-box">
          {<AlertMessage alertMessage={alertMessage} isVisible={showAlert} />}
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
                    <span
                      className="text-xs py-1 px-2 cursor-pointer text-white hover:text-xl hover:ease-in-out duration-200"
                      onClick={() => {
                        setIsEditMode(false);
                        // setNewImageURL(PalaceCoverImg); // Reset the newImageURL to the original URL
                      }}
                    >
                      <FaTimes />
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