import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";

export const PalaceContext = createContext();

const PalaceProvider = (props) => {
  const { memoryPalaces, selectedPalace, setSelectedPalace, initAndFetchNewMemoryPalace, fetchMemoryPalaces } = useApplicationData();

  return (
    <PalaceContext.Provider value={{ memoryPalaces, selectedPalace, setSelectedPalace, initAndFetchNewMemoryPalace, fetchMemoryPalaces }}>
      {children}
    </PalaceContext.Provider>
  );

}

export default PalaceProvider