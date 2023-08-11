import "./App.scss";

import { useEffect, useContext } from "react";
import { themeChange } from "theme-change";
import { PalaceContext } from "./providers/palaceProvider";

// Components
import Navbar from "./components/NavBar";
import PalaceCarouselItem from "./components/PalaceCarouselItem";
import RegularPalaceView from "./components/RegularPalaceView";


function App() {
  const { 
    setMemoryPalaces,
    memoryPalaces, 
    selectedPalace, 
    setSelectedPalace, 
    themes, 
    updateMemoryPalace,
    initAndFetchNewMemoryPalace,
    deleteAndSwitchToLastPalace,
    fetchMemoryPalaces,
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



  // Update Single Entry in Selected Palace
    // use savePalaceState() to apply to Mongo
  const changePalaceEntry = (key, value) => {
    if (selectedPalace) {
      setSelectedPalace(prevPalace => ({
        ...prevPalace,
        [key]: value
      }));
    }
  };

  // Delete an Entry by its Key from Selected Palace
    // use savePalaceState() to apply to Mongo
  const deletePalaceEntry = (key) => {
    if (selectedPalace) {
      const { [key]: deletedKey, ...updatedPalace } = selectedPalace;
      setSelectedPalace(updatedPalace);
    }
  };

  //Saves selectPalace to Mongo
    //saves current state of selectPalace object to Mongo. Refreshing will update memoryPalaces
  const savePalaceState = () => {
    if (selectedPalace) {
      updateMemoryPalace(selectedPalace._id, selectedPalace);
      fetchMemoryPalaces();
      switchSelectPalaceById(selectedPalace._id);
    }
   
  };
  // $$$ needs to refresh memoryPalace


  // Create New Palace (basic frame)
  const createNewPalace = (PalaceName, PalaceDescription) => {
    console.log("createNewPalace(f)")
    const newPalaceData = {
      PalaceName: PalaceName,
      PalaceDescription: PalaceDescription,
      PalaceCoverImg: "",
      PalaceToDoList: {},
      Rooms: {},
    };
    initAndFetchNewMemoryPalace(newPalaceData);
  }

  // Find Palace by ID
  const findPalaceById = (id) => {
    const foundPalaceById = memoryPalaces.find(palace => palace._id === id);
    if (foundPalaceById) {
      console.log("Found Palace:", foundPalaceById);
    } else {
      console.log("Palace not found.");
    }
  }

  // Set selectPalace by ID
  const switchSelectPalaceById  = (id) => {
    const palaceToSelect = memoryPalaces.find(palace => palace._id === id);
    if (palaceToSelect) {
      console.log("Set Palace by Id", palaceToSelect )
      setSelectedPalace(palaceToSelect);
    }
    };


  // Set selectPalace to last item of memoryPalace
    const switchToLastPalace = () => {
      console.log("switchToLastPalace");
      if (memoryPalaces.length > 0) {
        const lastPalace = memoryPalaces[memoryPalaces.length - 1];
        setSelectedPalace(lastPalace);
      } else {
        setSelectedPalace(null); // No palaces available, so set selected palace to null
      }
    };


    // Delete selectedPalace from Mongo
      // Whatever is the current selectedPalace will be deleted from MongoDB
    const deleteCurrentSelectedPalace = () => {
      console.log("Deleted current selectPalace from Mongo and switch selectedPalace to last memoryPalace item");
      console.log(selectedPalace._id);
      deleteAndSwitchToLastPalace(selectedPalace._id);
    }


  const handleTestClick1 = () => {
    switchToLastPalace();
    // switchSelectPalaceById("");
    // createNewPalace("Wonderful", "A place to chill out");
    
  };
  const handleTestClick2 = () => {
    // switchToLastPalace();
    // changePalaceEntry("PalaceName", "Tony");
    // changePalaceEntry("@@@Random@@@", "Bruce");
    // deletePalaceEntry("@@@Random@@@");
  };
  
  const handleTestClick3 = () => {
    // savePalaceState();
    deleteCurrentSelectedPalace();
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

      
      <button onClick={handleTestClick1}> __One__ </button>
      <button onClick={handleTestClick2}> __Two__ </button>
      <button onClick={handleTestClick3}> __Three__ </button>
    </>
  );
}

export default App;