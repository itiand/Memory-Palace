import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import PalaceProvider from './providers/palaceProvider.jsx';
import './index.scss';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PalaceProvider>
      <App />
    </PalaceProvider>
  </React.StrictMode>,
);
