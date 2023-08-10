import React, { useState, useEffect } from "react";
import { themeChange } from "theme-change";
import useApplicationData from "./hooks/useApplicationData";
import "./App.scss";
// import TodoList from "./components/TodoList";
import Navbar from "./components/NavBar";

function App() {
  const { themes, memoryPalace } = useApplicationData();
  
  useEffect(() => {
    themeChange(false);
  }, []);


  const memoryPalaceCarousel = memoryPalace.map((palace) => {
    return (
      <div className="carousel-item w-full flex flex-col items-center justify-center cursor-pointer" key={palace.id} onClick={() => window.my_modal_4.showModal()}>
        <div className="h-64 flex items-center justify-center overflow-hidden">
          <img src={palace.front_img_url} className="object-cover" alt="" />
        </div>
        <div className='carousel-body bg-neutral/50 py-1 px-4 -mt-8 text-gray-200 self-start rounded-br'>
          <p className='text-m'>{palace.name}</p>
        </div>
      </div>
    );
  });


  return (
    <>
      <Navbar themes={themes}/>

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


// import React, { useEffect } from "react";
// import { themeChange } from "theme-change";
// import useApplicationData from "./hooks/useApplicationData";
// import "./App.scss";
// import Navbar from "./components/Navbar";
// import CarouselItem from "./components/CarouselItem";
// import AddNewPalaceModal from "./components/AddNewPalaceModal";
// import AddPalaceImageModal from "./components/AddPalaceImageModal";
// import RegularPalaceModal from "./components/RegularPalaceModal";

// function App() {
//   const { themes, memoryPalace } = useApplicationData();

//   useEffect(() => {
//     themeChange(false);
//   }, []);

//   const memoryPalaceCarousel = memoryPalace.map((palace) => (
//     <CarouselItem key={palace.id} palace={palace} />
//   ));

//   return (
//     <>
//       <Navbar />
//       <h1 className="mt-6 text-center text-4xl">My Palaces</h1>
//       <div className="container carousel-container mx-auto">
//         <div className="carousel mx-auto mt-7 rounded-lg">
//           {memoryPalaceCarousel}
//         </div>
//       </div>
//       <AddNewPalaceModal />
//       <AddPalaceImageModal />
//       <RegularPalaceModal />
//     </>
//   );
// }

// export default App;