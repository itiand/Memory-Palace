import PropTypes from "prop-types";
import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";


export const PalaceContext = createContext();

const PalaceProvider = (props) => {
  const { 
    initAndFetchNewMemoryPalace,
      deleteAndSwitchToLastPalace,
      updateMemoryPalace,
      fetchMemoryPalaces,
      themes,
      memoryPalaces, 
      selectedPalace, 
      setMemoryPalaces,
      setSelectedPalace,
      changePalaceEntry,
      switchSelectPalaceById,
      switchToLastPalace,
      savePalaceState,
      createNewPalace,
      deletePalaceEntry,
      deleteCurrentSelectedPalace,
      isValidUrl,
      isImageUrl,
      tasks,
      setTasks,
      getChatResponseFromServer,
      getImageResponseFromServer,

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
      selectedPalace, 
      setMemoryPalaces,
      setSelectedPalace,
      changePalaceEntry,
      switchSelectPalaceById,
      switchToLastPalace,
      savePalaceState,
      createNewPalace,
      deletePalaceEntry,
      deleteCurrentSelectedPalace,
      isValidUrl,
      isImageUrl,
      tasks,
      setTasks,
      getChatResponseFromServer,
      getImageResponseFromServer,

    }}>
      {props.children}
    </PalaceContext.Provider>
  );
}

export default PalaceProvider;






