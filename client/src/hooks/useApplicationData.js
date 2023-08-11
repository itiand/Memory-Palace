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



  // Creates a New Memory Palace 
  function initAndFetchNewMemoryPalace(newPalace) {
    fetch("/api/initMemoryPalace", {
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

  useEffect(() => {
    fetchMemoryPalaces();
  }, []);


  return {
    memoryPalaces,
    selectedPalace,
    setSelectedPalace,
    initAndFetchNewMemoryPalace,
    fetchMemoryPalaces,
    themes,

    setMemoryPalaces,
    updateMemoryPalace,
  };
};

export default useApplicationData;