import PropTypes from "prop-types";
import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";
// import { reducer, initialState } from '../hooks/reducers';



export const PalaceContext = createContext();

const PalaceProvider = (props) => {
  const { 
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
  } = useApplicationData();

  // Validation for props.children
  PalaceProvider.propTypes = {
    children: PropTypes.node.isRequired, 
  };

  return (
    <PalaceContext.Provider value={{ 
      initAndFetchNewMemoryPalace,
      deleteAndSwitchToLastPalace,
      updateMemoryPalace,
      fetchMemoryPalaces,
      
      themes,
      memoryPalaces, 
      setMemoryPalaces,
      selectedPalace, 
      setSelectedPalace,
  
      findPalaceById,
      switchSelectPalaceById,  
      switchToLastPalace,
      createNewPalace,
      deleteCurrentSelectedPalace,  
      changePalaceEntry,
      deletePalaceEntry, 
      savePalaceState,
    }}>
      {props.children}
    </PalaceContext.Provider>
  );
}

export default PalaceProvider;






