import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageWithIcons from './components/ImageWithIcons';
import './App.scss';
import Room3D from './components/room3D';

function App() {

  return (
    <>
      <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Click me to show/hide content
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div className='h-screen'>
        <ImageWithIcons imageUrl={"https://i.imgur.com/JO6RB08.jpeg"} />
        <Room3D />
      </div>
    </>
  );
}

export default App;
