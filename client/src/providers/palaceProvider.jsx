import React from "react";
import PropTypes from "prop-types";
import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";

export const PalaceContext = createContext();

const PalaceProvider = (props) => {
  const { 
    memoryPalaces, 
    selectedPalace, 
    setSelectedPalace, 
    initAndFetchNewMemoryPalace, 
    fetchMemoryPalaces, 
    themes, 
    updateMemoryPalace,
    setMemoryPalaces,
  } = useApplicationData();

  return (
    <PalaceContext.Provider value={{ 
      memoryPalaces, 
      selectedPalace, 
      setSelectedPalace, 
      initAndFetchNewMemoryPalace, 
      fetchMemoryPalaces, 
      themes, 

      setMemoryPalaces,
      updateMemoryPalace,
    }}>
      {props.children}
    </PalaceContext.Provider>
  );
}

PalaceProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validation for children prop
};

export default PalaceProvider;






