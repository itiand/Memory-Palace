import React from "react";
import TodoList from "./TodoList";


const AddMemory = () => {


  return (

    <dialog id="my_modal_6" className="modal">
    <div className="modal-box w-11/12 max-w-5xl">
      <h3 className="font-bold text-lg">
        Add Memory Modal
      </h3>
      <img
        src="https://i.imgur.com/ZEpq5CO.jpeg"
        className="image-box w-60 mx-auto"
        alt="Memory"
      />
      <div>
        <TodoList />
      </div>
      <p className="py-4">
        Add Memory Modal: List of What you want
        to save * This is where ChatGPT and
        Dall-E come in
      </p>

      <div className="modal-action">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() =>
            window.my_modal_6.close()
          }
        >
          ✕
        </button>
      </div>

      <div>
        <button
          className="btn"
          onClick={() =>
            window.my_modal_4.showModal()
          }
        >
          Save Memory (doesnt save yet)
        </button>

      </div>
    </div>
  </dialog>
  )


}


export default AddMemory;