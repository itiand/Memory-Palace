import TodoList from "./TodoList";


const AddMemory = () => {

  return (
    <dialog id="add_memory_view" className="modal">
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
            window.add_memory_view.close()
          }
        >
          ✕
        </button>
      </div>

      <div>
        <button
          className="btn"
          onClick={() => {
            window.add_memory_view.close();
            window.reg_view.showModal();
          }}
        >Save Memory (doesnt save yet)</button>
      </div>
    </div>
  </dialog>
  )


}


export default AddMemory;