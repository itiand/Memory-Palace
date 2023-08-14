import { useState, useEffect } from 'react';
import tailwindConfig from '../../tailwind.config.js';
import { v4 as uuidv4 } from 'uuid';
const { themes } = tailwindConfig;


const useApplicationData = () => {

  const [memoryPalaces, setMemoryPalaces] = useState([]);
  const [selectedPalace, setSelectedPalace] = useState({});
  const [tasks, setTasks] = useState([]);

  //for edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [newImageURL, setNewImageURL] = useState('');

  
  const [selectedRoom, setSelectedRoom] = useState({});

  const onCloseModal = () => {
    // setSelectedRoom({})
    // setSelectedPalace({});
    setIsEditMode(false);
    setNewImageURL('');
  };

  const selectRoom = (roomId) => {
    const room = selectedPalace.Rooms.find(r => r.id === roomId);
    if (room) {
      console.log('Room found:', room);
        setSelectedRoom(room);
    } else {
        // Handle error - room not found
        console.error("Room not found with ID:", roomId);
    }
};

  // const createNewRoom = () => {
  //   const newRoomId = uuidv4();
  //   const newRoomObject = {
  //     id: newRoomId,
  //     roomImg: roomUrl,
  //     roomName: roomName,
  //     roomDescription: roomDescription,
  //     roomPins: [
  //       {
  //         x: null,
  //         y: null,
  //         toDoItem: null,
  //       }
  //     ]
  //   };

  //   const updatedRooms = [...selectedPalace["Rooms"], newRoomObject];
  //   changePalaceEntry("Rooms", updatedRooms);
  // };

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
        console.log('DATA', data);
        fetchMemoryPalaces();
      })
      .catch(handleError);
  }

  useEffect(() => {
    fetchMemoryPalaces();
  }, []);



  // Helper Methods
  // Update Single Entry in selectedPalace Object
  const changePalaceEntry = async (key, value) => {
    console.log("changePalaceEntry");
    if (selectedPalace) {
      const newSelectedPalace = { ...selectedPalace, [key]: value };
      await setSelectedPalace(newSelectedPalace);
      console.log('selectedPalace', selectedPalace);
      await updateMemoryPalace(newSelectedPalace._id, newSelectedPalace);
    }
  };

  // const changeRoomEntry = async (key, value) => {
  //   console.log("changeRoomEntry");
  //   if (selectedRoom) {
  //     const newSelectedRoom = { ...selectedRoom, [key]: value };
  //     await setSelectedPalace(newSelectedRoom);
  //     // console.log('selectedPalace', selectedPalace);
  //     await updateMemoryPalace(newSelectedPalace._id, newSelectedRoom);
  //   }

  // };  
  const changeRoomEntry = async (key, value) => {
    console.log("changeRoomEntry");
    if (selectedRoom) {
      // const newSelectedRoom = { ...selectedPalace.Rooms, [key]: value };
      // await setSelectedRoom(newSelectedRoom);
      // console.log('selectedRoom', selectedRoom);
      // await updateMemoryPalace(selectedPalace._id, selectedPalace);
      // selectedRoom[key][0] = value 
      let newSelectedRoom = new selectedRoom;
      newSelectedRoom[key] = value;
      let newSelectedPalace = selectedPalace;
      newSelectedPalace.Rooms = newSelectedRoom;
      await setSelectedPalace(newSelectedPalace);
      await savePalaceState();
    }
  };






  // Delete an Entry by its Key from selectedPalace
  const deletePalaceEntry = (key) => {
    console.log('deletePalaceEntry');
    if (selectedPalace) {
      const { [key]: deletedKey, ...updatedPalace } = selectedPalace;
      setSelectedPalace(updatedPalace);
    }
  };

  //Save selectedPalace to MongoDb
  const savePalaceState = () => {
    console.log("savePalaceState");
    if (selectedPalace) {
      updateMemoryPalace(selectedPalace._id, selectedPalace);
    }
  };

    // Create New Palace (with basic frame)
    // $$$ consider adding random background generator for cover and to save time $$$
    const createNewPalace = (PalaceName, PalaceDescription) => {
      console.log("createNewPalace(f)")
      const newPalaceData = {
        PalaceName: PalaceName,
        PalaceDescription: PalaceDescription,
        PalaceCoverImg: "https://www.richardtmoore.co.uk/wp-content/uploads/2016/10/btx-placeholder-04-2-1024x683.jpg",
        Rooms:[],
      };
      initAndFetchNewMemoryPalace(newPalaceData);
    }

  // Set selectPalace by ID
  const switchSelectPalaceById = (id) => {
    const palaceToSelect = memoryPalaces.find(palace => palace._id === id);
    if (palaceToSelect) {
      console.log("Set Palace by Id", palaceToSelect);
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


   // Function to call the server-side getChatResponse endpoint
   const getChatResponseFromServer = async (content) => {
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

   // Function to call the server-side getChatResponse endpoint
   const getImageResponseFromServer = async (content) => {
    try {
      const response = await fetch('api/getImageResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }), // Send the content as a JSON payload
      });
      const data = await response.json();
      changePalaceEntry("NewImage", data.response);
      // return data.response;
    } catch (error) {
      console.error('Error fetching image response:', error);
      return 'An error occurred';
    }

  };



  return {
    initAndFetchNewMemoryPalace,
    deleteAndSwitchToLastPalace,
    updateMemoryPalace,
    fetchMemoryPalaces,
    themes,
    memoryPalaces,
    selectedPalace,
    setMemoryPalaces,
    setSelectedPalace,
    setIsEditMode,
    isEditMode,
    // onCloseModal,
    selectRoom,

    changePalaceEntry,
    switchSelectPalaceById,
    switchToLastPalace,
    savePalaceState,
    createNewPalace,
    // createNewRoom,
    deletePalaceEntry,
    deleteCurrentSelectedPalace,
    isValidUrl,
    isImageUrl,
    tasks,
    setTasks,

    getChatResponseFromServer,
    getImageResponseFromServer,

    onCloseModal,
    setIsEditMode,
    isEditMode,
    newImageURL,
    setNewImageURL,
    selectRoom,
    setSelectedRoom,
    selectedRoom,
    changeRoomEntry,

  };
};

export default useApplicationData;








