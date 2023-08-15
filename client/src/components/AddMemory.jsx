import TodoList from "./TodoList";
import { PalaceContext } from "../providers/palaceProvider";
import { useContext } from "react";


const AddMemory = () => {
// const { 
//   tasks,
//   changePalaceEntry,
//   setSelectedRoom,
//   selectedPalace,
//   savePalaceState,
//   selectedRoom
//  } = useContext(PalaceContext);

  const {
    tasks,
    updateToDoList,
    selectedRoom,
    // changePalaceEntry,
  } = useContext(PalaceContext);


//  
//  const updateRoomToDo = async () => {
//   setSelectedRoom[0].ToDoList(tasks);
//   await savePalaceState;
//  }
// 



// 
  const handleSaveMemory = async () => {
    console.log(selectedRoom._id);
    updateToDoList(selectedRoom._id, tasks);
    // updateRoomToDo(tasks);
    
    window.add_memory_view.close();
    window.reg_view.showModal();
  };

  return (
    <dialog id="add_memory_view" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">
          Add Memory Modal
        </h3>
        <img
          src="https://media.tenor.com/tvFWFDXRrmMAAAAd/blow-mind-mind-blown.gif"
          className="image-box w-60 mx-auto"
          alt="Memory"
        />
        <p className="py-4">
          Add what you want to remember, and we can help you remember it! (hold down on items to arrange your list!).
        </p>
        <div>
          <TodoList />
        </div>

        <div className="modal-action">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() =>
              window.add_memory_view.close()
            }
          >
            ✕
          </button>
        </div>

        <div>

          <button
            className="btn"
            onClick={handleSaveMemory}
          >Save Memory</button>
        </div>
      </div>
    </dialog>
  );


};


export default AddMemory;