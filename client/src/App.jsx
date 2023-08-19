import "./App.scss";

import { useEffect, useContext, useState } from "react";
import { themeChange } from "theme-change";
import { PalaceContext } from "./providers/palaceProvider";
import { BsHouseAdd } from "react-icons/bs";
import { FaRegEye, FaEdit, FaPlus, FaCheck, FaTimes } from "react-icons/fa";

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
      <div className="container m-auto mb-4 ">
        <div>
          <div className="carousel-container container mx-auto text-center">
            <h1 className="mt-6 text-left text-lg text-gray-600">
              Palace Collection
            </h1>
            <div className="carousel mx-auto rounded-lg">
              {memoryPalaceCarousel}
            </div>
          </div>
        </div>
      </div>
      <div className="container m-auto grid w-4/6 grid-cols-4 gap-4">
        <div className="col-span-3">
          <h1 className="mt-6 text-left text-lg text-gray-600">
            Favorite Palaces
          </h1>

          <div className="carousel rounded-box max-h-80 w-full cursor-pointer gap-x-1">
            {memoryPalaces.map((palace, index) => {
              return (
                <div key={index} className="carousel-item relative w-1/2">
                  <img src={palace.PalaceCoverImg} className="w-full" />
                  <div className="overlay absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-black opacity-0 hover:opacity-60">
                    <span className="mb-1 text-2xl text-white">
                      {palace.PalaceName}
                    </span>
                    <span
                      className="rounded px-2 py-1 text-lg text-white duration-200 hover:text-2xl hover:ease-in-out"
                      onClick={() => handlePalaceClick(palace)}
                    >
                      <FaRegEye />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div
            className="add-palace cursor-pointer rounded-xl bg-green-500 px-5 py-3 text-white hover:bg-green-600"
            onClick={() => window.add_palace_view.showModal()}
          >
            <BsHouseAdd></BsHouseAdd>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
