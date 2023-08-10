import React, { useState, useEffect } from "react";
import { themeChange } from "theme-change";
import useApplicationData from "./hooks/useApplicationData";
import "./App.scss";
import TodoList from "./components/TodoList";

function App() {
  const { themes, memoryPalace } = useApplicationData();

  useEffect(() => {
    themeChange(false);
  }, []);

  const memoryPalaceCarousel = memoryPalace.map((palace) => {
    return (
      <div className="carousel-item w-full flex flex-col items-center justify-center cursor-pointer" key={palace.id} onClick={() => window.my_modal_4.showModal()}>
        <div className="h-64 flex items-center justify-center overflow-hidden">
          <img src={palace.front_img_url} className="object-cover" alt="" />
        </div>
        <div className='carousel-body bg-neutral/50 py-1 px-4 -mt-8 text-gray-200 self-start rounded-br'>
          <p className='text-m'>{palace.name}</p>
        </div>
      </div>
    );
  });
  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Access form data using DOM manipulation
    const name = document.querySelector('#palaceName').value;
    const description = document.querySelector('#palaceDescription').value;
  
    // Perform actions, such as sending data to a server or updating UI
    console.log('Submitted Name:', name);
    console.log('Submitted Description:', description);
  
    // Close the modal or perform other actions if needed
    window.my_modal_1.close();
  }
  
  // Attach event handler to the form
  const form = document.querySelector('.palaceForm');
  form.addEventListener('submit', handleSubmit);

  return (
    <>
      <div className="navbar bg-primary">
        <div className="navbar-start">
          <select className="px-2 py-3" data-choose-theme>
            <option value="">default</option>
            {themes.map((value) => (
              <option key={value.toLowerCase()} value={value.toLowerCase()}>
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
          {/* Add New Palace */}
          <button className="btn" onClick={() => window.my_modal_1.showModal()}>
            Add New Palace
          </button>
          <dialog id="my_modal_1" className="modal">
            <form className="palaceForm">

              <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg">
                  Add New Palace Description (name, description)
                </h3>
                <img
                  src="https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  className="image-box w-60 mx-auto"
                ></img>
                <p className="py-4">
                  Description: New Palace Modal pops up and prompts: * Name of New
                  Palace * Description of Palace * Save New Palace * Change to
                  Add-Palace-Image-Modal
                </p>
                <div className="modal-action">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => window.my_modal_1.close()}>
                    ✕
                  </button>
                </div>

                <div>
                  <button
                    className="btn"
                    onClick={() => window.my_modal_2.showModal()}
                  >
                    {" "}
                    Add Palace Image{" "}
                  </button>
                  
                  <button className="btn" id="submitPalaceButton" onSubmit= {handleSubmit}>Submit Palace</button>

                  {/* Add Palace Image */}
                  <dialog id="my_modal_2" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <h3 className="font-bold text-lg">
                        Add Palace Image (upload img){" "}
                      </h3>
                      <img
                        src="https://images.unsplash.com/photo-1635945416566-6302b54c056b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2060&q=80"
                        className="image-box w-60 mx-auto"
                      ></img>
                      <p className="py-4">
                        Description: Add image for cover of Palace * Add
                        Description of Room * Save Palace Cover Photo &
                        Description * Changes to Regular Palace Modal
                      </p>
                      <div className="modal-action">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => window.my_modal_2.close()}>
                          ✕
                        </button>
                      </div>

                      {/* Save Add Palace Image */}
                      <div>
                        <button
                          className="btn"
                          onClick={() => window.my_modal_4.showModal()}
                        >
                          Save Add Palace Image
                        </button>

                        {/* Regular Palace Modal */}
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
                              {/* Insert Nested Modal */}
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
                                  </div>
                                </div>
                              </dialog>
                            </div>
                          </div>
                        </dialog>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
              
            </form>
          </dialog>
        </div>
        {/* End Modal */}
      </div>
      <h1 className="mt-6 text-center text-4xl">My Palaces</h1>
      <div className="container carousel-container mx-auto">
        <div className="carousel mx-auto mt-7 rounded-lg">
          {memoryPalaceCarousel}
        </div>
      </div>
    </>
  );
}

export default App;