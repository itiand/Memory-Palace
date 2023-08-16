import { useState, useEffect } from 'react';
import tailwindConfig from '../../tailwind.config.js';
import { v4 as uuidv4 } from 'uuid';
const { themes } = tailwindConfig;



const useApplicationData = () => {
  const [memoryPalaces, setMemoryPalaces] = useState([]);
  const [selectedPalace, setSelectedPalace] = useState({});
  const [tasks, setTasks] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1); // Track hovered index


  //for edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [newImageURL, setNewImageURL] = useState('');

  const [selectedRoom, setSelectedRoom] = useState({});

  const onCloseModal = () => {
    // setSelectedRoom({})
    // setSelectedPalace({});
    savePalaceState();
    setIsEditMode(false);
    setNewImageURL('');
  };

// $$$
//   const selectRoom = (roomId) => {
//     const room = selectedPalace.Rooms.find(r => r.id === roomId);
//     if (room) {
//       console.log('Room found:', room);
//         setSelectedRoom(room);
//     } else {
//         // Handle error - room not found
//         console.error("Room not found with ID:", roomId);
//     }
// };

const selectRoom = (roomId) => {
  const roomIds = Object.keys(selectedPalace.Rooms); // Get an array of room IDs

  if (roomIds.includes(roomId)) {
    const room = selectedPalace.Rooms[roomId];
    console.log('Room found:', room);
    setSelectedRoom(room);
  } else {
    // Handle error - room not found
    console.error("Room not found with ID:", roomId);
  }
};

  const createNewRoom = async (roomUrl, roomName, roomDescription) => {
    const newRoomId = uuidv4();
    const newRoomObject = {
      _id: newRoomId,
      roomImg: roomUrl,
      roomName: roomName,
      roomDescription: roomDescription,
      ToDoList: [
        // Object example, Do Not Delete
        // {
        //   _id : uuidv4(),
        //   keyword: "",
        //   definition: "",
        //   dalleImage: "",
        //   narraration: "",
        //   drawDescription: "",
        //   x : 2,
        //   y : 2,
        // },
      ]
    };
    const updatedRooms = {
      ...selectedPalace.Rooms,
      [newRoomId]: newRoomObject
    }
    await changePalaceEntry("Rooms", updatedRooms);
  };

  function initAndFetchNewMemoryPalace(newPalace) {
    // Create a New Memory Palace 
    fetch("api/initMemoryPalace", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPalace)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to initialize memory palace data.");
        }
        //eg response 
        //{"success":true,"insertedCount":1,"insertedId":"64d45ba89dad3aeedc785861","palaceData":{"_id":"64d45ba89dad3aeedc785861","name":"testing"}}%     
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setMemoryPalaces(prevState => [...prevState, data.palaceData]);
          setSelectedPalace(data.palaceData);
          return (data.palaceData);
        }
      })
      .catch(error => {
        console.error("There was a problem:", error.message);
      });
  }

  function fetchMemoryPalaces() {
    // Fetch All Memory Palaces
    fetch("/api/getMemoryPalaces")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setMemoryPalaces(data);
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error.message);
      });
  }


  function updateMemoryPalace(palaceId, updatedData) {
    // Update Existing Memory Palace
    sendRequest(`/api/update`, 'PUT', { id: palaceId, data: updatedData });
  }

  const deleteAndSwitchToLastPalace = async (idToDelete) => {
    // Delete Palace from Mongo by ID and setSelectedPalace to next on list.
    try {
      // Send delete request to server
      await fetch(`api/deleteMemoryPalace/${idToDelete}`, {
        method: 'DELETE',
      });
      // Update local state after successful deletion
      const updatedMemoryPalaces = memoryPalaces.filter(palace => palace.id !== idToDelete);
      setMemoryPalaces(updatedMemoryPalaces);
      // Switch to the last palace in updatedMemoryPalaces
      if (updatedMemoryPalaces.length > 0) {
        setSelectedPalace(updatedMemoryPalaces[updatedMemoryPalaces.length - 1]);
      } else {
        setSelectedPalace(null);
      }
    } catch (error) {
      console.error("Error deleting memory palace:", error);
    }
  };
  // Utility Functions to handle Fetch Responses
  function handleResponse(response) {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
  function handleError(error) {
    console.error("There was a problem:", error.message);
  }
  function sendRequest(url, method, body = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    };
    fetch(url, options)
      .then(handleResponse)
      .then(data => {
        console.log('DATA', data);
        fetchMemoryPalaces();
      })
      .catch(handleError);
  }
  useEffect(() => {
    fetchMemoryPalaces();
  }, []);

  // Helper Methods
  const changePalaceEntry = async (key, value) => {
    // Update Single Entry in selectedPalace State
    console.log("Change Palace Entry");
    if (selectedPalace) {
      const newSelectedPalace = { ...selectedPalace, [key]: value };
      await setSelectedPalace(newSelectedPalace);
      console.log('selectedPalace', selectedPalace);
      await updateMemoryPalace(newSelectedPalace._id, newSelectedPalace);
    }
  };

  const changeRoomEntry = async (key, value) => {
    // Update Single Entry in selectedRoom State
    console.log("Change Room Entry");
    if (selectedRoom) {
      const newSelectedRoom = { ...selectedRoom, [key]: value };
      await setSelectedRoom(newSelectedRoom);
      console.log('selectedRoom', selectedRoom);
      // await updateMemoryRoom(selectedRoom._id, newSelectedRoom);
      await changePalaceEntry("Rooms", selectedRoom);
    }
  };
  

  const deletePalaceEntry = (key) => {
    // Delete an Entry by its Key from selectedPalace
    console.log('Delete Palace Entry');
    if (selectedPalace) {
      const { [key]: deletedKey, ...updatedPalace } = selectedPalace;
      setSelectedPalace(updatedPalace);
    }
  };

const savePalaceState = () => {
  //Save selectedPalace to MongoDb
  console.log("Save Selected Palace State to Mongo");
  if (selectedPalace) {
    updateMemoryPalace(selectedPalace._id, selectedPalace);
  }
};

const createNewPalace = (PalaceName, PalaceDescription) => {
  // Create New Palace (with basic frame)
  // $$$ consider adding random background generator for cover and to save time $$$
  console.log("createNewPalace(f)");
  const newPalaceData = {
    PalaceName: PalaceName,
    PalaceDescription: PalaceDescription,
    PalaceCoverImg: "https://www.richardtmoore.co.uk/wp-content/uploads/2016/10/btx-placeholder-04-2-1024x683.jpg",
    Rooms:{},
  };
  initAndFetchNewMemoryPalace(newPalaceData);
};

  const switchSelectPalaceById = (id) => {
    // Set selectPalace by ID
    const palaceToSelect = memoryPalaces.find(palace => palace._id === id);
    if (palaceToSelect) {
      console.log("Set Palace by Id", palaceToSelect);
      setSelectedPalace(palaceToSelect);
    }
  };

  const switchToLastPalace = () => {
    // Set selectPalace to last item of memoryPalace
    console.log("switchToLastPalace");
    if (memoryPalaces.length > 0) {
      const lastPalace = memoryPalaces[memoryPalaces.length - 1];
      setSelectedPalace(lastPalace);
    } else {
      setSelectedPalace(null); // No palaces available, so set selected palace to null
    }
  };

  const deleteCurrentSelectedPalace = () => {
    // Delete currently selectedPalace from MongoDb
    console.log("Deleted current selectPalace from Mongo and switch selectedPalace to last memoryPalace item");
    console.log(selectedPalace._id);
    deleteAndSwitchToLastPalace(selectedPalace._id);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }

  };

  const isImageUrl = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = url;
    });
  }

  const getChatResponseFromServer = async (content) => {
     // Function to call the server-side getChatResponse endpoint
    try {
      const response = await fetch('api/getChatResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }), // Send the content as a JSON payload
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
    }
      const data = await response.json();
      console.log(data)
        // if (data.success) {
        //   setMemoryPalaces(prevState => [...prevState, data.palaceData]);
        //   setSelectedPalace(data.palaceData);
        //   return (data.palaceData);
        // }
      // console.log(data)
      return data.response;
    } catch (error) {
      console.log('error useApplication ln227-ish');
      console.error('Error fetching chat response:', error);
      return 'An error occurred';
    }
  };

  const getImageResponseFromServer = async (content) => {
     // Function to call the server-side getChatResponse endpoint
    try {
      const response = await fetch('api/getImageResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }), // Send the content as a JSON payload
      });
      const data = await response.json();
      // changePalaceEntry("NewImage", data.response);
      return data.response;
    } catch (error) {
      console.error('Error fetching image response:', error);
      return 'An error occurred';
    }

  };

  async function updateToDoList(palaceId, roomId, tasksState) {
    try {
      const response = await fetch('api/updateToDoList', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          palaceId: palaceId,
          roomId: roomId,
          tasksState: tasksState
        })
      });
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
  
      // Parse and return the JSON response from the server
      return await response.json();
    } catch (error) {
      console.error('Error updating ToDoList:', error);
      throw error;
    }
  }
  

const speechSynthesis = window.speechSynthesis;
const randomSaying = (mode) => {
  // depending on mode, "return intro, phrase, lol string"
  if (mode === "intro") {
  const intro = [
    // "...Welcome to your Memory Palace...",
    // "...Hello There!...",
    // "...Are you ready to begin your Memory Journey?...",
    // "...Let's see what we can remember today!...",
    // "Welcome to MovieRecapped...oh wait, I meant welcome to your Mind Palace.",
    "Welcome to your very own Mind Palace. It's my pleasure to help you remember everything! Let's get started!",
  ];
  const randomIndex = Math.floor(Math.random() * intro.length);
  const randomIntro = `${intro[randomIndex]}...Your journey begins in the ${selectedRoom.roomName}...The first item on your journey is`;
  
  return randomIntro;
}
  if (mode === "bridge") {
    const bridge = [
      "Next you see",
      "Your eyes drift towards",
      "Moving on. Now you find yourself standing in front of.",
      "What do we have next? Oh!, it's",
      "Next you notice",
      "Suddenly, you see",
      "Next item on your journey is",
      "After that we arrive at",
      "Next stop on the tour is",
      "On with the tour. No dawdling. Next we have",
    ];
    const randomIndex = Math.floor(Math.random() * bridge.length);
    const randomPhrase = bridge[randomIndex];
    return randomPhrase;
  }
  if (mode === "lol") {
    const lol = [
      "How odd! But still, splendid!",
      "Facinating!...Marvelous...Bravo!",
      "What fun! I can't wait to see what's next!",
      "Very interesting isn't it!",
      "Reminds me of when I was just a wee babe.",
      "You don't see that everyday!",
      "Oh my, how wonderful!",
      "Even I think that will be hard to forget!",
      "You're sure to remember that one, wont you?",
      "Just remember, if she doesn't find you handsome, she should at least find you handy.",
      "That's adorable!",
      "Remembering isn't everything...It's the only thing.",
      "Lock in that memory! Splendid!",
      "I wonder. I'm 90 percent sure I turned off my stove before coming here!",
      "How positively drole!",
      "They originally wanted Morgan Freeman for this job!",
    ];
  
    const randomIndex = Math.floor(Math.random() * lol.length);
    const randomLol = lol[randomIndex];
    return randomLol;
  }
};

const showInfoCard = (index) => {
  // Set the index as the hovered index to display the InfoCard
  setHoveredIndex(1);
};
const scream = () => {
  alert('Scream function executed');
  showInfoCard(selectedRoom.ToDoList[0]);
}
// Set up a function to read text out loud
const speakText = (text) => {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    console.log(speechSynthesis.getVoices());
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === "Google UK English Male"); // Fred, Karen,Google UK English Male, Google UK English Female,
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };
  return speak;
};
const generateNarrateArray = () => {
  const ToDoList = selectedRoom.ToDoList;
  const array = [
    () => scream(-1), // Use -1 to indicate no specific InfoCard
    randomSaying('intro'),
    () => scream(-1), // Use -1 to indicate no specific InfoCard
    `${ToDoList[0].keyword}. ${ToDoList[0].definition} Your memory cue is a ${ToDoList[0].symbol} ${ToDoList[0].drawDescription}`,
  ];
  for (let i = 1; i < ToDoList.length; i++) {
    array.push(
      () => scream(i), // Pass the index to show the related InfoCard
      randomSaying('lol'),
      randomSaying('bridge'),
      `${ToDoList[i].keyword}.${ToDoList[i].definition} Your memory cue prompt is ${ToDoList[i].drawDescription}`,
    );
  }
  array.push("Well that's everything for now!... Till next time!... Bye for now!");
  return array;
};
const startReadingAndActions = () => {
  const array = generateNarrateArray(selectedRoom.ToDoList);
  for (let currentIndex = 0; currentIndex < array.length; currentIndex++) {
    const arrayElement = array[currentIndex];
    if (typeof arrayElement === 'string') {
      const speakFunction = speakText(arrayElement);
      speakFunction();
      console.log(arrayElement);
    } else if (typeof arrayElement === 'function') {
      arrayElement(); // Execute the function
    } else {
      console.log("Unknown array element type:", arrayElement);
    }
  }
};


  return {
    startReadingAndActions,
    initAndFetchNewMemoryPalace,
    fetchMemoryPalaces,
    getImageResponseFromServer,
    getChatResponseFromServer,
    
    themes,
    memoryPalaces, setMemoryPalaces,
    selectedPalace, setSelectedPalace,
    isEditMode, setIsEditMode,
    selectedRoom,setSelectedRoom,
    tasks, setTasks,
    newImageURL, setNewImageURL,
    hoveredIndex, setHoveredIndex,
    
    deleteAndSwitchToLastPalace,
    deleteCurrentSelectedPalace,
    deletePalaceEntry,
    
    createNewPalace,
    createNewRoom,
    savePalaceState,
    updateMemoryPalace,
    updateToDoList,
    changeRoomEntry,
    changePalaceEntry,
    switchToLastPalace,
    switchSelectPalaceById,
    
    
    isValidUrl,
    isImageUrl,
    onCloseModal,
    selectRoom, 
  };
};

export default useApplicationData;








