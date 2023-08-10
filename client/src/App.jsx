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
      // <div className="carousel-item w-full flex flex-col items-center justify-center cursor-pointer" key={palace._id} onClick={() => window.reg_view.showModal()}>
      //   <div className="h-64 flex items-center justify-center overflow-hidden">
      //     <img src={palace.PalaceCoverImg} className="object-cover" alt="" />
      //   </div>
      //   <div className='carousel-body bg-neutral/50 py-1 px-4 -mt-8 text-gray-200 self-start rounded-br'>
      //     <p className='text-m'>{palace.PalaceName}</p>
      //   </div>
      // </div>
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
