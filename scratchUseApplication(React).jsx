import { useState, useEffect } from 'react';
import tailwindConfig from '../../tailwind.config.js';

const { themes } = tailwindConfig;

const useApplicationData = () => {
  const [memoryPalaces, setMemoryPalaces] = useState([]);
  const [selectedPalace, setSelectedPalace] = useState({});

  // Create a new memory palace and fetch the updated list
  function initAndFetchNewMemoryPalace(newPalace) {
    fetch("/initMemoryPalace", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPalace)
    })
      .then(handleResponse)
      .then(data => {
        if (data.success) {
          setMemoryPalaces(prevPalaces => [...prevPalaces, data.palaceData]);
          setSelectedPalace(data.palaceData);
        }
      })
      .catch(handleError);
  }

  // Fetch memory palaces from the server
  function fetchMemoryPalaces() {
    fetch("/api/getMemoryPalaces")
      .then(handleResponse)
      .then(data => {
        setMemoryPalaces(data);
      })
      .catch(handleError);
  }

  // Update a memory palace with new data
  function updateMemoryPalace(palaceId, updatedData) {
    sendRequest(`/update/${palaceId}`, 'PUT', updatedData);
  }

  // Delete a memory palace
  function deleteMemoryPalace(palaceId) {
    sendRequest(`/delete/${palaceId}`, 'DELETE');
  }




  
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
    updateMemoryPalace,
    deleteMemoryPalace,
    themes
  };
};

export default useApplicationData;
