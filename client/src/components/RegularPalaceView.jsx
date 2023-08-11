import { useContext } from "react";
import { PalaceContext } from "../providers/palaceProvider";


function RegularPalaceView() {
  const { selectedPalace } = useContext(PalaceContext);
  return (
    <>
      <dialog id="reg_view" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="font-bold text-lg">Palace Name</h3>
          <img src="https://cornwall.historic-cornwall.org.uk/when_was_the_east_front_of_buckingham_palace_built.jpg" className="image-box w-70 mx-auto"></img>
          {/* Regular Palace Modal: * Clicking Main Photo to Edit
          Cover * Hover for Descriptions * Click Rooms to Edit
          Rooms{" "} */}
          <div>

          </div>
          {/* <div className="regular-modal-rooms w-full flex">
            <img src="https://i.imgur.com/EdZmnSg.jpeg" alt="Room 1" />
            <img src="https://i.imgur.com/rXkxaAo.jpeg" alt="Room 2" />
            <img src="https://i.imgur.com/gNoTLLj.jpeg" alt="Room 3" />
            <img src="https://i.imgur.com/NIYnoFP.jpeg" alt="Room 4" />
            <img src="https://i.imgur.com/QokO0HE.jpeg" alt="Room 5" />
          </div> */}
          <div className="reg_view-rooms">

          </div>
        </form>
      </dialog>
    </>
  );
}

export default RegularPalaceView;