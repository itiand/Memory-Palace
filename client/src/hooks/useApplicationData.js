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

const useApplicationData = () => {
  const [memoryPalaces, setMemoryPalaces] = useState([]);

  function initAndFetchMemoryPalaces() {
    fetch("/initMemoryPalace", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then( response => {
      if (!response.ok) {
        throw new Error("Failed to initialize memory palace data.");
      }
      fetchMemoryPalaces();
    })
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
    memoryPalaces,
    themes
  };
};

export default useApplicationData;