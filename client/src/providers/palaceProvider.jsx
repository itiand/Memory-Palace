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
      setIsEditMode,
      isEditMode,
      createNewPalace,
      deletePalaceEntry,
      deleteCurrentSelectedPalace,
      isValidUrl,
      isImageUrl,
      getChatResponseFromServer,
      getImageResponseFromServer,

      

      onCloseModal,
      // setIsEditMode,
      // isEditMode,
      newImageURL,
      setNewImageURL,

      createNewRoom,
      selectRoom,
      selectedRoom,
      setSelectedRoom,
      updateToDoList,


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
      createNewRoom,
    
      getChatResponseFromServer,
      getImageResponseFromServer,
    
      onCloseModal,
      setIsEditMode,
      isEditMode,
      newImageURL,
      setNewImageURL,

      createNewRoom,
      selectRoom,
      selectedRoom,
      setSelectedRoom,
      createNewRoom,
      updateToDoList,

    }}>
      {props.children}
    </PalaceContext.Provider>
  );
}

export default PalaceProvider;






