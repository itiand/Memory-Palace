// import React from "react";
import AddRoom from "./AddRoom";


const RegularPalaceModal = () => {


  return ( 
    <dialog id="my_modal_4" className="modal">
    <div className="modal-box w-11/12 max-w-5xl">
      <h3 className="font-bold text-lg">
        Regular Palace Modal
      </h3>
      <img
        src="https://cornwall.historic-cornwall.org.uk/when_was_the_east_front_of_buckingham_palace_built.jpg"
        className="image-box w-70 mx-auto"
      ></img>
      <p className="py-4">
        Regular Palace Modal: * Clicking Main Photo to Edit
        Cover * Hover for Descriptions * Click Rooms to Edit
        Rooms{" "}
      </p>
      <div className="modal-action">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => window.my_modal_4.close()}>
          ✕
        </button>
      </div>
      {/* Individual Rooms */}
      <div className="regular-modal-rooms w-60 flex">
        <img src="https://i.imgur.com/EdZmnSg.jpeg" alt="Room 1" />
        <img src="https://i.imgur.com/rXkxaAo.jpeg" alt="Room 2" />
        <img src="https://i.imgur.com/gNoTLLj.jpeg" alt="Room 3" />
        <img src="https://i.imgur.com/NIYnoFP.jpeg" alt="Room 4" />
        <img src="https://i.imgur.com/QokO0HE.jpeg" alt="Room 5" />
      </div>

      <div>
        {/* Story-Mode Button */}
        <button
          className="btn"
          onClick={() => window.my_modal_0.showModal()}
        >
          Story-Mode
        </button>

        {/* Add Room Modal */}
        <button
          className="btn"
          onClick={() => window.my_modal_5.showModal()}
        >
          Add New Room
        </button>
       
       <AddRoom/>
      </div>
    </div>
  </dialog>
  );
};


export default RegularPalaceModal;