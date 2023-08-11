import PropTypes from "prop-types";
import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";

export const PalaceContext = createContext();

const PalaceProvider = (props) => {
  const { 
    memoryPalaces, 
    selectedPalace, 
    themes, 
    setSelectedPalace, 
    initAndFetchNewMemoryPalace, 
    fetchMemoryPalaces, 
    updateMemoryPalace,
    setMemoryPalaces,
    deleteAndSwitchToLastPalace,

  } = useApplicationData();

  // Validation for props.children
  PalaceProvider.propTypes = {
    children: PropTypes.node.isRequired, 
  };

  return (
    <PalaceContext.Provider value={{ 
      memoryPalaces, 
      selectedPalace, 
      themes, 
      setSelectedPalace, 
      initAndFetchNewMemoryPalace, 
      fetchMemoryPalaces, 
      setMemoryPalaces,
      updateMemoryPalace,
      deleteAndSwitchToLastPalace,
    }}>
      {props.children}
    </PalaceContext.Provider>
  );
}


export default PalaceProvider;






