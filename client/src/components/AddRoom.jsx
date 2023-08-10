import React from "react";
import AddMemory from "./AddMemory";

const AddRoom = () => {

  return ( 
     <dialog id="my_modal_5" className="modal">
     <div className="modal-box w-11/12 max-w-5xl">
       <h3 className="font-bold text-lg">
         Add Room Modal
       </h3>
       <img
         src="https://i.imgur.com/ZEpq5CO.jpeg"
         className="image-box w-60 mx-auto"
         alt="Room Image"
       ></img>
       <p className="py-4">
         Add Room Modal: * Can input Subject of Room *
         To do List * Button: Add-Memory
       </p>
       <div className="modal-action">
         <button
           className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
           onClick={() =>
             window.my_modal_5.close()
           }
         >
           ✕
         </button>
       </div>

       <div>
         {/* Add Memory Modal */}
         <button
           className="btn"
           onClick={() =>
             window.my_modal_6.showModal()
           }
         >
           Add Memory
         </button>

        < AddMemory />

       </div>
     </div>
   </dialog>

  )
};

export default AddRoom;