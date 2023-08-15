import "./App.scss";

import { useEffect, useContext, useState} from "react";
import { themeChange } from "theme-change";
import { PalaceContext } from "./providers/palaceProvider";

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
    // initAndFetchNewMemoryPalace,
    //   deleteAndSwitchToLastPalace,
    //   updateMemoryPalace,
    //   fetchMemoryPalaces,
    // setMemoryPalaces,
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
  startReadingAndActions,
} = useContext( PalaceContext );


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



// const handleTestClick1 = () => {
// };
const handleTestClick2 = () => {
};
const handleTestClick3 = () => {
};


return (
  <>
      <Navbar themes={themes} />
      <RegularPalaceView />
      <AddNewPalace />
      <AddPalaceImage />
      <AddRoom />
      <AddMemory />
      <div className="-mt-8 flex flex-col items-center justify-around h-5/6">
        <h1 className="mt-6 text-center text-5xl">My Palaces</h1>
        <div className="container  text-center carousel-container mx-auto">
          <div className="carousel mx-auto mt-7 rounded-lg">
            {memoryPalaceCarousel}
          </div>
        </div>
        <br></br>
        <div>
          <h2>Tester Buttons</h2>
          <button className="btn" onClick={startReadingAndActions}>Click 1</button>
          <button className="btn" onClick={handleTestClick2}>Click 2</button>
          <button className="btn" onClick={handleTestClick3}>Click 3</button>
        </div>
        <img src={selectedPalace.NewImage}></img>

      </div>
    </>
  );
};

export default App;