import React, { useEffect, useContext } from "react";
import { themeChange } from "theme-change";
import { PalaceContext } from "./providers/palaceProvider";
import "./App.scss";

//components
import Navbar from "./components/NavBar";
import PalaceCarouselItem from "./components/PalaceCarouselItem";
import RegularPalaceView from "./components/RegularPalaceView";


function App() {
  const { 
    memoryPalaces, 
    setMemoryPalaces,
    selectedPalace, 
    setSelectedPalace, 
    themes, 
    updateMemoryPalace,
    initAndFetchNewMemoryPalace,
  } = useContext(PalaceContext);

  useEffect(() => {
    themeChange(false);
  }, []);


  const handlePalaceClick = (selected) => {
    setSelectedPalace(selected) // clicked palace as the selected palace state
    window.reg_view.showModal()
  }

  const memoryPalaceCarousel = memoryPalaces.map((palace) => {
    return (
      <PalaceCarouselItem
        key={palace._id}
        palace={palace}
        onPalaceClick={handlePalaceClick}
      />
    );
  });

  //Change Individual Entires in Single Palace Object
  const changePalaceEntry = (key, name) => {
    if (memoryPalaces) {
      memoryPalaces[0][key] = name;
    }
  }
  
  // Delete an Entry by it's Key from Single Palace Object
  const deletePalaceEntry = (key) => {
    if (memoryPalaces) {
      delete memoryPalaces[0][key];
    }
  }

  //Saves the Entire Single Palace Object
  const savePalaceState = () => {
    updateMemoryPalace(memoryPalaces[0]?._id, memoryPalaces[0])
  }

  // Create New Palace. Need to Flesh out Object better
  // initAndFetchNewMemoryPalace();

  const findPalaceById = () => {
    
  }


  const handleTestClick = () => {
    
    // changePalaceEntry("PalaceName", "Hey Bob");
    // deletePalaceEntry("key");
    // savePalaceState();
  };

  return (
    <>
      <Navbar themes={themes}/>
      <RegularPalaceView/>
      <h1 className="mt-6 text-center text-4xl">My Palaces</h1>
      <div className="container carousel-container mx-auto">
        <div className="carousel mx-auto mt-7 rounded-lg">
          {memoryPalaceCarousel}
        </div>
      </div>


      <button onClick={handleTestClick}>SaveMemoryPalace</button>
    </>
  );
}

export default App;