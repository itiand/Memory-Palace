import React, { useEffect, useContext } from "react";
import { themeChange } from "theme-change";
import { PalaceContext } from "./providers/palaceProvider";
import "./App.scss";

// import TodoList from "./components/TodoList";
import Navbar from "./components/NavBar";

//components
import PalaceCarouselItem from "./components/PalaceCarouselItem";
import TodoList from "./components/TodoList";
import RegularPalaceView from "./components/RegularPalaceView";

function App() {
  const { memoryPalaces, selectedPalace, setSelectedPalace, themes } = useContext(PalaceContext);

  useEffect(() => {
    themeChange(false);
  }, []);


  const handlePalaceClick = (selected) => {
    setSelectedPalace(selected) // clicked palace as the selectedpalace state
    window.reg_view.showModal()
  }

  const memoryPalaceCarousel = memoryPalaces.map((palace) => {
    return (
      <PalaceCarouselItem
        key={palace._id}
        palace={palace}
        onPalaceClick={handlePalaceClick}
      />
    );
  });


  return (
    <>
      <Navbar themes={themes}/>
      <RegularPalaceView/>
      <h1 className="mt-6 text-center text-4xl">My Palaces</h1>
      <div className="container carousel-container mx-auto">
        <div className="carousel mx-auto mt-7 rounded-lg">
          {memoryPalaceCarousel}
        </div>
      </div>
    </>
  );
}

export default App;
