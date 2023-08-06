import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageWithIcons from './components/ImageWithIcons';
import './App.scss';

function App() {
  
  return (
    <>
      <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Click me to show/hide content
        </div>
        <div className="collapse-content">
          <p>helloö222222</p>
        </div>
      </div>
      <ImageWithIcons imageUrl={"https://i.imgur.com/JO6RB08.jpeg"}/>
    </>
  );
}

export default App;
