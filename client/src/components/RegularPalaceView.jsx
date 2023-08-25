import { useContext, useState, useEffect } from "react";
import { PalaceContext } from "../providers/palaceProvider";
import {
  FaRegEye,
  FaPlus,
  FaMinus,
  FaEdit,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import AlertMessage from "./AlertMessage";
import RoomView from "./RoomView";
import PalaceCoverImage from "./PalaceCoverImage";
import DeleteConfirm from "./DeleteConfirm";

function RegularPalaceView({
  setShowAppAlert,
  setAppAlertMessage,
  setAppAlertType,
}) {
  const {
    selectedPalace,
    fetchMemoryPalaces,
    onCloseModal,
    isEditMode,
    setIsEditMode,
    setNewImageURL,
    selectRoom,
    selectedRoom,
    deletePalaceFromBackend,
  } = useContext(PalaceContext);

  //locat alert states
  const [showPalaceViewAlert, setShowPalaceViewAlert] = useState(false);
  const [palaceViewAlertMessage, setPalaceViewAlertMessage] = useState("");
  const [palaceViewAlertType, setPalaceViewAlertType] = useState("");

  const { PalaceName, Rooms } = selectedPalace;
  //rooms object into an array
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    if (Rooms) {
      const roomArray = Object.values(Rooms);
      setRooms(roomArray);
    }
  }, [Rooms]);

  useEffect(() => {
    console.log("selectedRoom updated:", selectedRoom);
  }, [selectedRoom]);

  //on room click
  const handleRoomClick = (roomId) => {
    selectRoom(roomId);
    setIsEditMode(false);
    setNewImageURL("");
    window.room_view.showModal();
    window.reg_view.close();
  };

  //add new room click
  const handleNewRoomClick = () => {
    setNewImageURL("");
    window.reg_view.close();
    window.add_room_view.showModal();
  };

  //on palace delete confirm
  const handleConfirmPalaceDelete = async () => {
    window.palace_delete_confirm.close();
    window.reg_view.close();

    const success = await deletePalaceFromBackend(selectedPalace._id);

    if (success) {
      //show success alert on app component
      setShowAppAlert(true);
      setAppAlertType("success");
      setAppAlertMessage("Palace successfully deleted!");
      setTimeout(() => {
        setShowAppAlert(false);
      }, 3000);

      fetchMemoryPalaces();
    } else {
      // Show app alert for failure
      setShowAppAlert(true);
      setAppAlertType("error");
      setAppAlertMessage("Error deleting palace!");
      setTimeout(() => {
        setShowAppAlert(false);
      }, 3000);
    }
  };

  //on room delete confirm
  const handleConfirmRoomDelete = async () => {
    console.log("confirmed to delete room");

    //DONE llready closing because of default behaviour of the form

    //reg palace view needs to refresh
    //the selectedPalace state needs to update upon deletion

    //need a client end function to make backend request.
    //backend route to delete the room of that selected palace in the database

    //return the new and updated palace.
  };

  //const handle room edit
  const [isEditRoomMode, setIsEditRoomMode] = useState(false);
  const handleRoomEdit = (roomId) => {
    console.log("handleroomedit");
    setIsEditRoomMode(true);

    //be able to edit room name
    //be able to delete room
    //be able to edit description
  };

  const onDeleteRoom = () => {
    console.log("deleteRoom");
    window.room_delete_confirm.showModal();
  };

  return (
    <>
      <DeleteConfirm
        modalId={"palace_delete_confirm"}
        handleConfirmDelete={handleConfirmPalaceDelete}
        deleteMessage={"Are you sure you want do delete this palace?"}
      ></DeleteConfirm>
      <DeleteConfirm
        modalId={"room_delete_confirm"}
        handleConfirmDelete={handleConfirmRoomDelete}
        deleteMessage={"Are you sure you want to delete this room?"}
      ></DeleteConfirm>
      <dialog id="reg_view" className="modal">
        <form method="dialog" className="modal-box">
          <AlertMessage
            showLocalAlert={showPalaceViewAlert}
            localAlertMessage={palaceViewAlertMessage}
            alertType={palaceViewAlertType}
          />
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={onCloseModal}
          >
            ✕
          </button>
          <h3 className="pb-2 text-4xl font-bold">
            {isEditMode && (
              <span
                className="mr-1 inline-block cursor-pointer rounded-full bg-red-500 p-1 text-lg text-white duration-200 hover:bg-red-600 hover:text-2xl hover:ease-in-out"
                onClick={() => {
                  window.palace_delete_confirm.showModal();
                }}
              >
                <FaMinus></FaMinus>
              </span>
            )}
            {PalaceName}
          </h3>
          <PalaceCoverImage
            setShowLocalAlert={setShowPalaceViewAlert}
            setLocalAlertMessage={setPalaceViewAlertMessage}
            setAlertType={setPalaceViewAlertType}
          ></PalaceCoverImage>
          <div className="reg_view-rooms mt-5">
            <div className="flex items-center pb-1 text-lg">
              <h4 className="mr-1 text-gray-700">Your rooms</h4>
              <span
                className="cursor-pointer text-gray-300 duration-200 hover:text-black hover:ease-in-out"
                onClick={handleNewRoomClick}
              >
                <FaPlus />
              </span>
            </div>
            <div className="carousel rounded-box max-h-80 w-full cursor-pointer gap-x-1">
              {rooms.map((room, index) => {
                return (
                  <div key={index} className="carousel-item relative w-1/2">
                    <img
                      src={room.roomImg}
                      alt={room.roomDescription}
                      className="w-full"
                    />
                    <div className="overlay absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-black opacity-0 hover:bg-black/60 hover:opacity-100">
                      <div className="flex items-center justify-center">
                        {isEditRoomMode && (
                          <span
                            className="mr-2 inline-block cursor-pointer rounded-full bg-red-500/100 p-0.5 text-xs text-white opacity-100 duration-200 hover:scale-150 hover:bg-red-600/100 hover:ease-in-out"
                            onClick={onDeleteRoom}
                          >
                            <FaMinus></FaMinus>
                          </span>
                        )}
                        <span className="text-2xl text-white opacity-60">
                          {room.roomName}
                        </span>
                      </div>
                      {isEditRoomMode ? (
                        <div className="mt-3">
                          <div
                            className="mb-2 cursor-pointer text-white opacity-60 duration-200 hover:scale-150 hover:opacity-90"
                            onClick={"needs an onClick handle"}
                          >
                            <FaCheck />
                          </div>
                          <div
                            className="cursor-pointer text-xs text-white opacity-60 duration-200 hover:scale-150 hover:opacity-90"
                            onClick={() => {
                              setIsEditRoomMode(false);
                              setNewImageURL(""); // Reset the newImageURL to the original URL
                            }}
                          >
                            <FaTimes />
                          </div>
                        </div>
                      ) : (
                        <div className="flex opacity-60">
                          <div
                            className="rounded px-2 py-1 text-lg text-white duration-200 hover:scale-150 hover:ease-in-out"
                            onClick={() => {
                              handleRoomClick(room._id);
                            }}
                          >
                            <FaRegEye />
                          </div>
                          <div
                            className="rounded px-2 py-1 text-lg text-white duration-200 hover:scale-150 hover:ease-in-out"
                            onClick={() => {
                              handleRoomEdit(room._id);
                            }}
                          >
                            <FaEdit />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </dialog>
      <RoomView />
    </>
  );
}

export default RegularPalaceView;
