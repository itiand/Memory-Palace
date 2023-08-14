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


// Import speech synthesis
const speechSynthesis = window.speechSynthesis;

function App() {
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

  } = useContext( PalaceContext );


  useEffect(() => {
    themeChange(false);
  }, []);

  // Add text-to-speech functionality
  const textToSpeak = "Suddenly you see a small giraffe, eating a zucchini. My, how positively odd."; // Replace with your desired text

  useEffect(() => {
    // Listen for the voices to be loaded
    speechSynthesis.addEventListener("voiceschanged", () => {
      // Once the voices are available, get them
      const voices = speechSynthesis.getVoices();
      // Now you can use the voices list in your handleTestClick3 function
    });
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



  const handleTestClick1 = () => {
    // switchToLastPalace();
    // switchSelectPalaceById("");
    // createNewPalace("Start", "Here", "https://i.imgur.com/rxWrRvs.jpeg");
    // getChatResponseFromServer('fat cat playing game');

    // getChatResponseFromServer('what is the conversion rate of human years to cat years?');

    () => setSelectedRoom.ToDoList = tasks;

  };
  const handleTestClick2 = () => {
    // switchToLastPalace();
    // console.log(selectedPalace.Rooms);
    // deletePalaceEntry("@@@Random@@@");
    console.log('drawing image');
    getImageResponseFromServer("realistic giraffe eating a zucchini");
  };


  // const voices = speechSynthesis.getVoices();

  const handleTestClick3 = () => {

    console.log('speaking');
    console.log(speechSynthesis.getVoices());
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[50]; // Use the first available voice
    // 50, 49, 51, 11
    // 11, 50, 51 57
    // 54 55 60 61
    // voice 0 aint bad
    // voice 10, 11{stephen}
    // utterance.pitch = voices[0];
    // Configure speech parameters if needed (e.g., rate, pitch)
    // utterance.rate = ...;
    // utterance.pitch = ...;

    // Speak the text
    speechSynthesis.speak(utterance);
    //     const utterance = new SpeechSynthesisUtterance(textToSpeak);
    //     utterance.voice = voices[0]; // Use the first available voice
    //     // Configure speech parameters if needed (e.g., voice, rate, pitch)
    // // utterance.voice = ...; // Choose a specific voice
    // // utterance.rate = ...;  // Adjust the speech rate
    // // utterance.pitch = ...; // Adjust the speech pitch


    // changePalaceEntry("PalaceName", "My Awesome Palace");
    // changePalaceEntry("@@@Random@@@", "Bruce");
    // savePalaceState();
    // createPalaceExample();
    // deleteCurrentSelectedPalace();
    // console.log(selectedPalace.Rooms);

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
        <img src={selectedPalace.NewImage}></img>

      </div>
    </>
  );
}

export default App;