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




  // Helper Functions

  // Update Single Entry in selectedPalace
    // use savePalaceState(f) to apply change to Mongo
    const changePalaceEntry = (key, value) => {
      if (selectedPalace) {
        setSelectedPalace(prevPalace => ({
          ...prevPalace,
          [key]: value
        }));
        ////WALDO: BUG HERE
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
      if (selectedPalace) {
        console.log("savePalaceState");
        updateMemoryPalace(selectedPalace._id, selectedPalace);
      }
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
  };
};

export default useApplicationData;








      