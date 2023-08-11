import PropTypes from "prop-types";
import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";
// import { reducer, initialState } from '../hooks/reducers';



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

    changePalaceEntry,
    deletePalaceEntry, 
    savePalaceState,
    createNewPalace,
    findPalaceById,
    switchSelectPalaceById,  
    switchToLastPalace,
    deleteCurrentSelectedPalace, 

  } = useApplicationData();

  // const [state, dispatch] = useReducer(reducer, initialState);

  // Validation for props.children
  PalaceProvider.propTypes = {
    children: PropTypes.node.isRequired, 
  };

  return (
    <PalaceContext.Provider value={{ 
      // state, dispatch,
      memoryPalaces, 
      selectedPalace, 
      themes, 
      setSelectedPalace, 
      initAndFetchNewMemoryPalace, 
      fetchMemoryPalaces, 
      setMemoryPalaces,
      updateMemoryPalace,
      deleteAndSwitchToLastPalace,
      
      changePalaceEntry,
      deletePalaceEntry, 
      savePalaceState,
      createNewPalace,
      findPalaceById,
      switchSelectPalaceById,  
      switchToLastPalace,
      deleteCurrentSelectedPalace, 
    }}>
      {props.children}
    </PalaceContext.Provider>
  );
}


export default PalaceProvider;






