import "./App.scss";

import { useEffect, useContext } from "react";
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


function App() {
  const { 
    // initAndFetchNewMemoryPalace,
    //   deleteAndSwitchToLastPalace,
    //   updateMemoryPalace,
    //   fetchMemoryPalaces,
      
      themes,
      memoryPalaces, 
      // setMemoryPalaces,
      // selectedPalace, 
      setSelectedPalace,
  
      findPalaceById,
      switchSelectPalaceById,  
      switchToLastPalace,
      createNewPalace,
      deleteCurrentSelectedPalace,  
      changePalaceEntry,
      deletePalaceEntry, 
      savePalaceState,
  } = useContext( PalaceContext );


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

  // function handleSubmit(event) {
  //   event.preventDefault(); // Prevent the default form submission behavior
  
  //   // Access form data using DOM manipulation
  //   const name = document.querySelector('#palaceName').value;
  //   const description = document.querySelector('#palaceDescription').value;
  
  //   // Perform actions, such as sending data to a server or updating UI
  //   console.log('Submitted Name:', name);
  //   console.log('Submitted Description:', description);
  
  //   // Close the modal or perform other actions if needed
  //   window.my_modal_1.close();
  // }
  
  // // Attach event handler to the form
  // const form = document.querySelector('.palaceForm');
  // form.addEventListener('submit', handleSubmit);

//   Update UseDataApplications
  // Create New Palace (basic frame)
  const handleTestClick1 = () => {
    // switchToLastPalace();
    // switchSelectPalaceById("");
    createNewPalace("Wonderful", "A place to chill out");
  };
  const handleTestClick2 = () => {
    switchToLastPalace();
    // deletePalaceEntry("@@@Random@@@");
  };
  const handleTestClick3 = () => {
    // changePalaceEntry("PalaceName", "My Awesome Palace");
    // changePalaceEntry("@@@Random@@@", "Bruce");
    // savePalaceState();
    deleteCurrentSelectedPalace();
  };

  return (
    <>
      <Navbar themes={themes}/>
      <RegularPalaceView/>
      <AddNewPalace/>
      <AddPalaceImage/>
      <AddRoom/>
      <AddMemory/>

      <h1 className="mt-6 text-center text-4xl">My Palaces</h1>
      <div className="container carousel-container mx-auto">
        <div className="carousel mx-auto mt-7 rounded-lg">
          {memoryPalaceCarousel}
        </div>
      </div>
      <br></br>
      <div>
        <h2>Tester Buttons</h2>
          <button className="btn" onClick={handleTestClick1}>Click 1</button>
          <button className="btn" onClick={handleTestClick2}>Click 2</button>
          <button className="btn" onClick={handleTestClick3}>Click 3</button>
      </div>
    </>
  );
}

export default App;