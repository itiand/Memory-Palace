import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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
    </>
  );
}

export default App;
