import React from "react";

const DeleteConfirm = ({ handleConfirmDelete, deleteMessage, modalId }) => {
  //on palace delete cancel
  const handleCancelDelete = () => {
    window.palace_delete_confirm.close();
  };

  return (
    <>
      {/*delete confirm modal*/}
      <dialog
        id={modalId}
        className="modal m-auto w-1/4 min-w-fit  text-gray-600"
      >
        <form method="dialog" className="modal-box bg-gray-100 text-center">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
          <h3 className="mb-4 text-lg font-bold">{deleteMessage}</h3>
          <div className="confirm-selection">
            <button
              className="btn mr-2 bg-gray-200 hover:bg-gray-300"
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
            <button
              className="btn bg-red-500 text-white hover:bg-red-600"
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default DeleteConfirm;
