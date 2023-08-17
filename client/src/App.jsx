import "./App.scss";

import { useEffect, useContext, useState } from "react";
import { themeChange } from "theme-change";
import { PalaceContext } from "./providers/palaceProvider";
import { BsHouseAdd } from 'react-icons/bs';
import { FaRegEye, FaEdit, FaPlus, FaCheck, FaTimes } from 'react-icons/fa';


// Components
import Navbar from "./components/NavBar";
import PalaceCarouselItem from "./components/PalaceCarouselItem";
import RegularPalaceView from "./components/RegularPalaceView";
import AddPalaceImage from "./components/AddPalaceImage";
import AddNewPalace from "./components/AddNewPalace";
import AddRoom from "./components/AddRoom";
import AddMemory from "./components/AddMemory";


const App = () => {

  const {
    themes,
    memoryPalaces,
    selectedPalace,
    setSelectedPalace,
    selectedRoom,
    findPalaceById,

    switchSelectPalaceById,
    switchToLastPalace,
    createNewPalace,
    deleteCurrentSelectedPalace,
    changePalaceEntry,
    deletePalaceEntry,
    savePalaceState,
    createPalaceExample,
    getChatResponseFromServer,
    getImageResponseFromServer,
    setSelectedRoom,
    tasks,
  } = useContext(PalaceContext);


  useEffect(() => {
    themeChange(false);
  }, []);

  const handlePalaceClick = (selected) => {
    setSelectedPalace(selected); // clicked palace as the selected palace state
    window.reg_view.showModal();
  };

  const memoryPalaceCarousel = memoryPalaces.map((palace) => {
    return (
      <PalaceCarouselItem
        key={palace._id}
        palace={palace}
        onPalaceClick={handlePalaceClick}
      />
    );
  });

  return (
    <>

      <Navbar themes={themes} />
      <RegularPalaceView />
      <AddNewPalace />
      <AddPalaceImage />
      <AddRoom />
      <AddMemory />
      <div className="-mt-8 flex flex-col items-center justify-start">
        <div>
          <h1 className="mt-6 text-center text-neutral text-5xl">Palace Collection</h1>
          <div className="container  text-center carousel-container mx-auto">
            <div className="carousel mx-auto mt-7 rounded-lg">
              {memoryPalaceCarousel}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 w-4/6 m-auto">
        <div className="flex items-center justify-center">
          <div className="text-gray-400 bg-base-200 py-3 px-5 rounded-xl hover:bg-base-300 cursor-pointer add-palace" onClick={() => window.add_palace_view.showModal()}>
            <BsHouseAdd></BsHouseAdd>
          </div>
        </div>
        <div className="col-span-3">
          <h1 className="mt-6 text-center text-neutral text-3xl">Favorite Palaces</h1>

          <div className="carousel rounded-box w-full gap-x-1 cursor-pointer max-h-80">
            {memoryPalaces.map((palace, index) => {
              return (
                <div key={index} className="carousel-item w-1/2 relative">
                  <img src={palace.PalaceCoverImg} className="w-full" />
                  <div className="overlay absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center opacity-0 hover:opacity-60 bg-black">
                    <span className="mb-1 text-white text-2xl">{palace.PalaceName}</span>
                    <span className="text-lg py-1 px-2 rounded text-white hover:text-2xl hover:ease-in-out duration-200" onClick={() => handlePalaceClick(palace)}><FaRegEye /></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;