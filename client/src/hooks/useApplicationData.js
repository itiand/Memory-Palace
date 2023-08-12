import { useState, useEffect } from 'react';
import tailwindConfig from '../../tailwind.config.js';
const { themes } = tailwindConfig;

// function getInitialSelectedPalace() {
//   return {
//     id: ``,
//     name: ``,
//     front_img_url: ``
//   };
// }

const useApplicationData = () => {
  
  const [memoryPalaces, setMemoryPalaces] = useState([]);
  const [selectedPalace, setSelectedPalace] = useState({});


  // Create a New Memory Palace 
  function initAndFetchNewMemoryPalace(newPalace) {
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
        if(data.success) {
          setMemoryPalaces(prevState => [...prevState, data.palaceData]);
          setSelectedPalace(data.palaceData);
          return(data.palaceData)
        }
      })
      .catch(error => {
        console.error("There was a problem:", error.message);
      });
  }

  // Fetch All Memory Palaces
  function fetchMemoryPalaces() {
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

  // Update Existing Memory Palace
  function updateMemoryPalace(palaceId, updatedData) {
    sendRequest(`/api/update`, 'PUT', { id: palaceId, data: updatedData });
  }


// Delete Palace By ID
// delete from Mongo by ID and setSelectedPalace to next on list.
const deleteAndSwitchToLastPalace = async (idToDelete) => {
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


  // Fetch Response Functions
  // Utility function to handle fetch responses
  function handleResponse(response) {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
  // Utility function to handle errors
  function handleError(error) {
    console.error("There was a problem:", error.message);
  }
  // Utility function to send requests
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
        console.log(data);
      })
      .catch(handleError);
  }


// const [modal, setModal] = useReducer(reducer, []);
  useEffect(() => {
    fetchMemoryPalaces();
  }, []);

// Sets SelectPalace to first memoryPalace item upon initialization
  useEffect(() => {
    if (memoryPalaces.length > 0) {
      setSelectedPalace(memoryPalaces[0]);
    }
  }, [memoryPalaces]);

  // useEffect(() => {
  //   // This effect will run whenever selectedPalace changes
  //   if (selectedPalace) {
  //     console.log("savePalaceState");
  //     updateMemoryPalace(selectedPalace._id, selectedPalace);

  //     // After 4 seconds, trigger a re-render of memoryPalaces
  //     const timeoutId = setTimeout(() => {
  //       // Fetch updated memoryPalaces data here
  //       const updatedMemoryPalaces = updatedMemoryPalaces();
  //       setMemoryPalaces(updatedMemoryPalaces);
  //     }, 4000);

  //     // Clean up the timeout when the component unmounts or selectedPalace changes
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [selectedPalace]); // The effect depends on selectedPalace


  // Helper Functions

  // Update Single Entry in selectedPalace
    // use savePalaceState(f) to apply change to Mongo
    const changePalaceEntry = (key, value) => {
      if (selectedPalace) {
        setSelectedPalace(prevPalace => ({
          ...prevPalace,
          [key]: value
        }));
      }
    };
  
    // Delete an Entry by its Key from selectedPalace
    const deletePalaceEntry = (key) => {
      console.log('deletePalaceEntry')
      if (selectedPalace) {
        const { [key]: deletedKey, ...updatedPalace } = selectedPalace;
        setSelectedPalace(updatedPalace);
      }
    };
  
    //Save selectedPalace to MongoDb
    const savePalaceState = () => {
      // if (selectedPalace) {
        console.log("savePalaceState");
        updateMemoryPalace(selectedPalace._id, selectedPalace);
      // }
    };
  
  
    // Create New Palace (with basic frame)
    const createNewPalace = (PalaceName, PalaceDescription) => {
      console.log("createNewPalace(f)")
      const newPalaceData = {
        PalaceName: PalaceName,
        PalaceDescription: PalaceDescription,
        PalaceCoverImg: "",
        PalaceToDoList: {},
        Rooms: [],
      };
      initAndFetchNewMemoryPalace(newPalaceData);
    }

    // Create New Palace (with basic frame)
    const createPalaceExample = () => {
      console.log("createNewPalace(f)")
      const newPalaceData = {

        "_id": "64d3cad2513cf28f3e4803f0",
        "PalaceName": "My First Mind Palace",
        "PalaceDescription": "An inner look into the mind of Breadcrumbs Cabbagepatch",
        "PalaceCoverImg": "https://miro.medium.com/v2/resize:fit:720/format:webp/1*E7LZaXyXb9Li4OvMNv32cQ.jpeg",

        "PalaceToDoList": {
          "toDoListName": "Javascript Methods",
          "toDo1": {
            "keyword": ".push()",
            "definition": "Adds one or more elements to the end of an array",
            "returnedAiImgs": {
              "aiImage1": "url",
              "aiImage2": "url",
              "aiImage3": "url",
              "aiImage4": "url"
            },
            "chosenAiImg": "",
            "gptDrawDesc": "",
            "gptNarrateDesc": "",
          },
          "toDo2": {
            "keyword": ".pop()",
            "definition": "Removes and returns the last element of an array.",
            "returnedAiImgs": {
              "aiImage1": "",
              "aiImage2": "",
              "aiImage3": "",
              "aiImage4": ""
            },
            "chosenAiImg": "",
            "gptDrawDesc": "",
            "gptNarrateDesc": "",
          },
          "toDo3": {
            "keyword": ".shift()",
            "definition": "Removes and returns the first element of an array.",
            "returnedAiImgs": {
              "aiImage1": "",
              "aiImage2": "",
              "aiImage3": "",
              "aiImage4": ""
            },
            "chosenAiImg": "",
            "gptDrawDesc": "",
            "gptNarrateDesc": "",
          },
          "toDo4": {
            "keyword": ".slice",
            "definition": "Creates a new array by extracting elements from an existing array.",
            "returnedAiImgs": {
              "aiImage1": "",
              "aiImage2": "",
              "aiImage3": "",
              "aiImage4": ""
            },
            "chosenAiImg": "",
            "gptDrawDesc": "",
            "gptNarrateDesc": "",
          },
          "toDo5": {
            "keyword": ".splice()",
            "definition": "Changes an array by adding or removing elements.",
            "returnedAiImgs": {
              "aiImage1": "",
              "aiImage2": "",
              "aiImage3": "",
              "aiImage4": ""
            },
            "chosenAiImg": "",
            "gptDrawDesc": "",
            "gptNarrateDesc": "",
          },
          "toDo6": {
            "keyword": ".concat()",
            "definition": "Combines arrays to create a new array.",
            "returnedAiImgs": {
              "aiImage1": "",
              "aiImage2": "",
              "aiImage3": "",
              "aiImage4": ""
            },
            "chosenAiImg": "",
            "gptDrawDesc": "",
            "gptNarrateDesc": "",
          },
          "toDo7": {
            "keyword": ".forEach()",
            "definition": "Executes a provided function once for each array element.",
            "returnedAiImgs": {
              "aiImage1": "",
              "aiImage2": "",
              "aiImage3": "",
              "aiImage4": ""
            },
            "chosenAiImg": "",
            "gptDrawDesc": "",
            "gptNarrateDesc": "",
          },
          "toDo8": {
            "keyword": ".map()",
            "definition": "Creates a new array by applying a function to each element.",
            "returnedAiImgs": {
              "aiImage1": "",
              "aiImage2": "",
              "aiImage3": "",
              "aiImage4": ""
            },
            "chosenAiImg": "",
            "gptDrawDesc": "",
            "gptNarrateDesc": "",
          },
          "toDo9": {
            "keyword": ".filter()",
            "definition": "Creates a new array with elements that pass a test.",
            "returnedAiImgs": {
              "aiImage1": "",
              "aiImage2": "",
              "aiImage3": "",
              "aiImage4": ""
            },
            "chosenAiImg": "",
            "gptDrawDesc": "",
            "gptNarrateDesc": "",
          },
          "toDo10": {
            "keyword": ".reduce()",
            "definition": "Applies a function to reduce an array to a single value.",
            "returnedAiImgs": {
              "aiImage1": "",
              "aiImage2": "",
              "aiImage3": "",
              "aiImage4": ""
            },
            "chosenAiImg": "",
            "gptDrawDesc": "",
            "gptNarrateDesc": "",
          },
        },

        "Rooms": {
          "room1": {
            "roomDescription": "Study",
            "roomImg": "https://media.houseandgarden.co.uk/photos/618938787ec4df9dbbfebc7f/16:9/w_1920,h_1080,c_limit/8fb319cfcc817fa00eaee66e368db0cb-house-11jan17-Arwel-Wyn-Jones--BBC_b.jpg",
            "Pins": [
              {
                x: null,
                y: null,
                toDoItem: null,
              }
            ],
          },
          "room2": {
            "roomDescription": "Bathroom",
            "roomImg": "https://dornob.com/wp-content/uploads/2009/03/vintage-bathroom-interior-design.jpg",
            "ins": [
              {
                x: null,
                y: null,
                toDoItem: null,
              }
            ],
          },

          "room3": {
            "roomDescription": "Kitchen",
            "roomImg": "https://cdn.80.lv/api/upload/content/63/625e4a942c5f1.jpg",
            "Pins": [
              {
                x: null,
                y: null,
                toDoItem: null,
              }
            ],
          },
        }
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
  
      // Delete selectedPalace from MongoDb
        // Whichever is the current selectedPalace will be deleted from MongoDb
      const deleteCurrentSelectedPalace = () => {
        console.log("Deleted current selectPalace from Mongo and switch selectedPalace to last memoryPalace item");
        console.log(selectedPalace._id);
        deleteAndSwitchToLastPalace(selectedPalace._id);
      }


  return {
    initAndFetchNewMemoryPalace,
    deleteAndSwitchToLastPalace,
    updateMemoryPalace,
    fetchMemoryPalaces,
    
    themes,
    memoryPalaces, setMemoryPalaces,
    selectedPalace, setSelectedPalace,

    findPalaceById,
    switchSelectPalaceById,  
    switchToLastPalace,
    createNewPalace,
    deleteCurrentSelectedPalace,  
    changePalaceEntry,
    deletePalaceEntry, 
    savePalaceState,
    createPalaceExample,
  };
};

export default useApplicationData;








      