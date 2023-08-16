import PropTypes from "prop-types";
import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";



export const PalaceContext = createContext();

const PalaceProvider = (props) => {
  const { 
      startReadingAndActions,
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
      tasks,
      setTasks,
      getChatResponseFromServer,
      getImageResponseFromServer,
      changeRoomEntry,
      hoveredIndex, setHoveredIndex,
      

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
      showAlert,
      setShowAlert,
      alertMessage, 
      setAlertMessage


  } = useApplicationData();

  // Validation for props.children
  PalaceProvider.propTypes = {
    children: PropTypes.node.isRequired, 
  };

  return (
    <PalaceContext.Provider value={{ 
      startReadingAndActions,
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
      hoveredIndex, setHoveredIndex,
    
      tasks,
      setTasks,
      getChatResponseFromServer,
      getImageResponseFromServer,
    
      onCloseModal,
      setIsEditMode,
      isEditMode,
      newImageURL,
      setNewImageURL,

      selectRoom,
      selectedRoom,
      changeRoomEntry,
      setSelectedRoom,
      updateToDoList,
      showAlert,
      setShowAlert,
      alertMessage, 
      setAlertMessage

    }}>
      {props.children}
    </PalaceContext.Provider>
  );
}

export default PalaceProvider;






