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
  const [memoryPalace, setMemoryPalace] = useState([]);

  function fetchMemoryPalaces() {
    fetch("api/getMemoryPalaces")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setMemoryPalace(data);
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error.message);
      });
  }

  useEffect(() => {
    fetchMemoryPalaces();
  }, []);


  return {
    memoryPalace,
    themes
  };
};

export default useApplicationData;