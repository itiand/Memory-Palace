// import React, { useState, useEffect, useContext } from "react";
// import RegularPalaceModal from './RegularPalaceModal';
// import { PalaceContext } from "../providers/palaceProvider";

const AddPalaceImage = () => {
  return (
    <dialog id="add_palace_image_view" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="text-lg font-bold">Add Palace Image (upload img)</h3>
        <img
          src="https://images.unsplash.com/photo-1635945416566-6302b54c056b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2060&q=80"
          className="image-box mx-auto w-60"
        ></img>
        <p className="py-4">
          Description: Add image for cover of Palace * Add Description of Room *
          Save Palace Cover Photo & Description * Changes to Regular Palace
          Modal
        </p>
        <div className="modal-action">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={() => window.add_palace_image_view.close()}
          >
            ✕
          </button>
        </div>

        <div>
          <button
            className="btn"
            onClick={() => {
              window.add_palace_image_view.close();
              window.reg_view.showModal();
            }}
          >
            Save Add Palace Image{" "}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddPalaceImage;
