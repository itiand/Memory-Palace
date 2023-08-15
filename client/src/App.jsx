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
} = useContext( PalaceContext );

const speechSynthesis = window.speechSynthesis;
const [voices, setVoices] = useState([]);


useEffect(() => {
    themeChange(false);
  }, []);
  
  // const ToDoList = [
  //   {
  //     keyword: "Panda",
  //     definition: "defintion 1",
  //     dalleImage: "",
  //     narraration: "narration 1",
  //     drawDescription: "drawDescription 1",
  //     x : 2,
  //     y : 2,
  //   },
  //   {
  //     keyword: "Racoon",
  //     definition: "defintion 2",
  //     dalleImage: "",
  //     narraration: "narration 2",
  //     drawDescription: "drawDescription 2",
  //     x : 2,
  //     y : 2,
  //   },
  //   {
  //     keyword: "Bear",
  //     definition: "defintion 3",
  //     dalleImage: "",
  //     narraration: "narration 3",
  //     drawDescription: "drawDescription 3",
  //     x : 2,
  //     y : 2,
  //   },
  //   {
      
  //     keyword: "Beaver",
  //     definition: "defintion 4",
  //     dalleImage: "",
  //     narraration: "narration 4",
  //     drawDescription: "drawDescription 4",
  //     x : 2,
  //     y : 2,
  //   },
  //   {
  //     keyword: "Aardvark",
  //     definition: "defintion 5",
  //     dalleImage: "",
  //     narraration: "narration 5",
  //     drawDescription: "drawDescription 5",
  //     x : 2,
  //     y : 2,
  //   },

  //   {
  //     keyword: "Aardvark",
  //     definition: "defintion 5",
  //     dalleImage: "",
  //     narraration: "narration 5",
  //     drawDescription: "drawDescription 5",
  //     x : 2,
  //     y : 2,
  //   },

  //   {
  //     keyword: "Aardvark",
  //     definition: "defintion 5",
  //     dalleImage: "",
  //     narraration: "narration 5",
  //     drawDescription: "drawDescription 5",
  //     x : 2,
  //     y : 2,
  //   },

  //   {
  //     keyword: "Aardvark",
  //     definition: "defintion 5",
  //     dalleImage: "",
  //     narraration: "narration 5",
  //     drawDescription: "drawDescription 5",
  //     x : 2,
  //     y : 2,
  //   },
  // ];
 
const randomOddState = (keyword) => {
  // takes in keyword and returns "keyword + funny string"
  const odd = [
    "...playing poker...",
    "...juggling chainsaws...",
    "...on fire...",
    "...skydiving...",
    "...wearing scuba gear...",
    "...doing taxes...",
    "...playing the xylophone...",
    "...doing yoga...",
    "...bungie jumping...",
    "...surfing a wave...",
    "...programming on a laptop...",
    "...staging a sit-in...",
    "...holding a lightsaber...",
    "...riding a unicycle...", 
    "...riding a hot air balloon...",
    "...riding a roller-coaster...",
    "...ice skating...", 
    "...playing chess...",
    "...wearing a ski-mask...",
    "...reading a newspaper...",
    "...eating tacos...",
  ];
  const randomIndex = Math.floor(Math.random() * odd.length);
  const randomAction = odd[randomIndex];
  return `${keyword}${randomAction}`;
};

const randomSaying = (mode) => {
  // depending on mode, "return intro, phrase, lol string"
  if (mode === "intro") {
  const intro = [
    // "...Welcome to your Memory Palace...",
    // "...Hello There!...",
    // "...Are you ready to begin your Memory Journey?...",
    // "...Let's see what we can remember today!...",
    "Welcome to your very own Mind Palace...There's a lot to learn, so let's get started!",
  ];
  const randomIndex = Math.floor(Math.random() * intro.length);
  const randomIntro = `${intro[randomIndex]}...Let's begin shall we?...Your journey begins in the ${selectedRoom.roomName}...The first item on your journey is a`;
  
  return randomIntro;
}
  if (mode === "bridge") {
    const bridge = [
      "Next you see a",
      "Your eyes drift towards a",
      "You casually glance at a",
      "Your focus and see a",
      "Next you notice a",
      "Suddenly, you see a",
      "Next item on your journey is a",
      "Next ticket on the agenda is a",
    ];
    const randomIndex = Math.floor(Math.random() * bridge.length);
    const randomPhrase = bridge[randomIndex];
    return randomPhrase;
  }
  if (mode === "lol") {
    const lol = [
      "How odd!",
      "Facinating!",
      "What fun!",
      "Golly!",
      "Hehehehehehe!",
      "Muahahaha!",
      "You don't see that everyday!",
      "Oh my!",
      "Even I think that's hard to forget!",
      "You're sure to remember that one!!",
      "Buy this app!",
      "That's adorable!",
      "Whoever designed this, deserves an A!",
      "Remembering isn't everything...It's the only thing!",
      "Lock that memory in!",
      "I wonder if I turned off my oven!",
      "How positively drole!",
      "All work and no play, makes Jack a dull boy!",
      "They originally wanted Morgan Freeman for this job!",
      "lol lol lol lol lol!",
    ];
    const randomIndex = Math.floor(Math.random() * lol.length);
    const randomLol = lol[randomIndex];
    return randomLol;
  }
};


// Set up a function to read text out loud
const speakText = (text) => {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    console.log(speechSynthesis.getVoices());
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === "Google UK English Female");
    // Fred, Karen,Google UK English Male, Google UK English Female,
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };
  return speak;
};

const generateNarrateArray = () => {
  const ToDoList = selectedRoom.ToDoList;
  const array = [
    randomSaying('intro'),
    randomOddState(ToDoList[0].keyword),
  ];
  // $$$ add pin interactions
  for (let i = 1; i < ToDoList.length; i++) {array.push(
      randomSaying('lol'),
      randomSaying('bridge'),
      randomOddState(`${ToDoList[i].keyword}`),
    );
  }
  array.push("Well that's everything for now!...Till next time!...Bye-Bye!");
  console.log(array);
  return array;
};

const startReadingAndActions = () => {
  const fakeArray = generateNarrateArray(selectedRoom.ToDoList);

  let currentIndex = 0;
  const performAction = () => {
    if (currentIndex < fakeArray.length) {
      const arrayElement = fakeArray[currentIndex];
      const speakFunction = speakText(arrayElement);
      speakFunction();

      if (arrayElement.includes('randomOddState')) {
        const matchResult = arrayElement.match(/randomOddState\('([^']*)'\)/);
        const keyword = matchResult ? matchResult[1] : '';

        if (keyword === '') {
          currentIndex = fakeArray.length - 1; // Skip to the last element
        } else {
          const oddStateResult = randomOddState(keyword);
          // Perform actions with oddStateResult
          console.log("Odd State Result:", oddStateResult);
        }
      } else if (arrayElement.includes('randomSaying')) {
        const sayingMode = arrayElement.match(/randomSaying\('([^']+)'\)/)[1];
        const randomSayingResult = randomSaying(sayingMode);
        // Perform actions with randomSayingResult
        console.log("Random Saying Result:", randomSayingResult);
      }

      currentIndex++;
      setTimeout(performAction, 2000); // Continue after 1 second
    }
  };
  setTimeout(performAction, 1000); // Start after a delay of 5 seconds
};



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