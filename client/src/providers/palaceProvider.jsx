import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";

export const PalaceContext = createContext();

const PalaceProvider = (props) => {
  const { memoryPalaces, selectedPalace, setSelectedPalace, initAndFetchNewMemoryPalace, fetchMemoryPalaces, themes } = useApplicationData();

  return (
    <PalaceContext.Provider value={{ memoryPalaces, selectedPalace, setSelectedPalace, initAndFetchNewMemoryPalace, fetchMemoryPalaces, themes }}>
      {props.children}
    </PalaceContext.Provider>
  );

}

export default PalaceProvider