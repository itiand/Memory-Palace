import "./App.scss";

import { useEffect, useContext, useState } from "react";
import { themeChange } from "theme-change";
import { PalaceContext } from "./providers/palaceProvider";
import { BsHouseAdd } from 'react-icons/bs';

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
      <div className="-mt-8 flex flex-col items-center justify-around h-5/6">
        <div>
          <h1 className="mt-6 text-center text-neutral text-5xl">Palace Collection</h1>
          <div className="container  text-center carousel-container mx-auto">
            <div className="carousel mx-auto mt-7 rounded-lg">
              {memoryPalaceCarousel}
            </div>
          </div>
        </div>
        <div className=" text-gray-400 bg-base-200 py-3 px-5 rounded-xl hover:bg-base-300 cursor-pointer add-palace" onClick={() => window.add_palace_view.showModal()}>
          <BsHouseAdd></BsHouseAdd>
        </div>
        <br></br>
      </div>
    </>
  );
};

export default App;