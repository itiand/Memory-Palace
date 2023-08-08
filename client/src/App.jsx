import { useState, useEffect } from "react";
import { themeChange } from "theme-change";
import useApplicationData from "./hooks/useApplicationData";
import axios from "axios";
import "./App.scss";

function App() {
  const { themes, memoryPalace } = useApplicationData();

  useEffect(() => {
    themeChange(false);
  });


  // const memoryPalaceCarousel = memoryPalace.map((palace) => {
  //   return (
  //     <div className="carousel-item w-full flex flex-col">
  //       <div>
  //         <img src={palace.front_img_url} className="" alt="Tailwind CSS Carousel component" />
  //       </div>
  //       <div className='carousel-body bg-base-300 py-2 px-4'>
  //         <p className='text-center'>{palace.name}</p>
  //       </div>
  //     </div>
  //   );
  // });


  const memoryPalaceCarousel = memoryPalace.map((palace) => {
    return (
      <div className="carousel-item w-full flex flex-col items-center justify-center">
        <div className="card"></div>
        <div className="h-72 flex items-center justify-center overflow-hidden">
          <img src={palace.front_img_url} className="object-cover" alt="Tailwind CSS Carousel component" />
        </div>
        <div className='carousel-body bg-base-300 py-2 px-4 w-full'>
          <p className='text-xl'>{palace.name}</p>
        </div>
      </div>
    );
  });


  return (
    <>
      <div className="navbar bg-primary">
        <div className="navbar-start">
          <select className="px-2 py-3" data-choose-theme>
            <option value="" className="">
              default
            </option>
            {themes.map((value) => (
              <option
                className=""
                key={value.toLocaleLowerCase()}
                value={value.toLocaleLowerCase()}
              >
                {value}
              </option>
            ))}
          </select>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Pensieve</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>


        {/* Start Modal */}
        <div className="navbar-end">
          <button className="btn" onClick={() => window.my_modal_1.showModal()}>
            Add New Palace
          </button>
          <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">Add New Palace Description (name, description)</h3>
              <img src="https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="image-box w-60 mx-auto"></img>
              <p className="py-4">Description: New Palace Modal pops up and prompts: * Name of New Palace * Description of Palace * Save New Palace * Change to Add-Palace-Image-Modal</p>
              <div className="modal-action">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕ </button>
              </div>

              {/* Add Palace Image */}
              <div>
                <button className="btn" onClick={() => window.my_modal_2.showModal()}>Add Palace Image</button>

                <dialog id="my_modal_2" className="modal">
                  <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Add Palace Image (upload image)</h3>

                    <img src=" https://images.unsplash.com/photo-1635945416566-6302b54c056b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2060&q=80" className="image-box w-60 mx-auto"></img>
                    <p className="py-4">Description: Add image for cover of Palace * Add Description of Room * Save Palace Cover Photo & Description * Changes to Regular Palace Modal</p>
                    <div className="modal-action">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕ </button>
                    </div>

                    {/* Save Palace Image */}
                    <div>
                      <button className="btn" onClick={() => window.my_modal_4.showModal()}>Save Add Palace Image</button>


                      {/* Regular Palace Modal */}
                      <dialog id="my_modal_4" className="modal">
                        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                          <h3 className="font-bold text-lg">Regular Palace Modal</h3>
                          <img src="https://cornwall.historic-cornwall.org.uk/when_was_the_east_front_of_buckingham_palace_built.jpg" className="image-box w-70 mx-auto"></img>
                          <p className="py-4">Regular Palace Modal:
                            * Clicking Main Photo to Edit Cover * Hover for Descriptions * Click Rooms to Edit Rooms </p>
                          <div className="modal-action">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕ </button>
                          </div>

                          {/* Individual Rooms */}
                          <div className="regular-modal-rooms w-60 flex">
                            <img src="https://i.imgur.com/EdZmnSg.jpeg"></img>
                            <img src="https://i.imgur.com/rXkxaAo.jpeg"></img>
                            <img src="https://i.imgur.com/gNoTLLj.jpeg"></img>
                            <img src="https://i.imgur.com/NIYnoFP.jpeg"></img>
                            <img src="https://i.imgur.com/QokO0HE.jpeg"></img>
                          </div>

                          <div>
                            {/* Story-Mode Button */}
                            <button className="btn" onClick={() => window.my_modal_0.showModal()}>Story-Mode</button>

                            {/* Add Room Modal */}
                            <button className="btn" onClick={() => window.my_modal_5.showModal()}>Add New Room</button>
                            {/* Insert Nested Modal */}
                            <dialog id="my_modal_5" className="modal">
                              <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                                <h3 className="font-bold text-lg">Add Room Modal</h3>
                                <img src="https://i.imgur.com/ZEpq5CO.jpeg" className="image-box w-60 mx-auto"></img>
                                <p className="py-4">Add Room Modal:
                                  - Can input Subject of Room
                                  -To do List
                                  - Button: Add-Memory</p>
                                <div className="modal-action">
                                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => window.my_modal_4.showModal()}>
                                    ✕ </button>
                                </div>

                                <div>
                                  {/* Add Memory Modal */}
                                  <button className="btn" onClick={() => window.my_modal_6.showModal()}>Add Memory</button>
                                  {/* Insert Nested Modal */}
                                  <dialog id="my_modal_6" className="modal">
                                    <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                                      <h3 className="font-bold text-lg">Add Memory Modal</h3>
                                      <img src="https://i.imgur.com/ZEpq5CO.jpeg" className="image-box w-60 mx-auto"></img>
                                      <p className="py-4">Add Memory Modal: List of What you want to save * This is where ChatGPT and Dall-E come in</p>
                                      <div className="modal-action">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => window.my_modal_4.showModal()}>
                                          ✕ </button>
                                      </div>

                                      <div>
                                        {/* Set Memory*/}
                                        <button className="btn" onClick={() => window.my_modal_4.showModal()}>Save Memory</button>
                                        {/* Insert Nested Modal */}

                                      </div>
                                    </form>
                                  </dialog>

                                </div>
                              </form>
                            </dialog>

                          </div>
                        </form>
                      </dialog>

                    </div>
                  </form>
                </dialog>

              </div>
            </form>
          </dialog>

        </div>
        {/* End Modal */}

      </div>

      <div className="container carousel-container mx-auto">
        <div className="carousel mx-auto mt-7 rounded-lg">
          {memoryPalaceCarousel}
        </div>
      </div>
    </>
  );
}

export default App;
