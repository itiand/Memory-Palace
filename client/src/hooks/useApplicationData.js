import { useState, useEffect } from 'react';
import tailwindConfig from '../../tailwind.config.js';
const { themes } = tailwindConfig;

function getInitialSelectedPalace() {
  return {
    id: ``,
    name: ``,
    front_img_url: ``
  };
}

// const initialState = {
//   likes: [],
//   selectedImg: getInitialSelectedImgState(),
//   isModalOpen: false
// };

const useApplicationData = (newPalace) => {
  const [memoryPalaces, setMemoryPalaces] = useState([]);
  const [selectedPalace, setSelectedPalace] = useState({});

  function initAndFetchNewMemoryPalace() {
    fetch("/initMemoryPalace", {
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

  function fetchMemoryPalaces() {
    fetch("api/getMemoryPalaces")
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

  useEffect(() => {
    fetchMemoryPalaces();
  }, []);


  return {
    selectedPalace,
    memoryPalaces,
    themes
  };
};

export default useApplicationData;