import { useState, useEffect } from 'react';
import { themeChange } from "theme-change";
import useApplicationData from './hooks/useApplicationData';
import axios from 'axios';
import './App.scss';

function App() {
  const { themes, memoryPalace } = useApplicationData();

  useEffect(() => {
    themeChange(false);
  });

  const memoryPalaceCarousel = memoryPalace.map((palace) => {
    return (
      <div className="carousel-item w-full flex flex-col items-center justify-center space-y-4">
        <div className="w-full h-56 flex items-center justify-center overflow-hidden">
          <img src={palace.front_img_url} className="object-cover" alt="Tailwind CSS Carousel component" />
        </div>
        <div className='carousel-body bg-base-300 py-2 px-4 w-full m-0'>
          <p className='text-center'>{palace.name}</p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="navbar bg-primary">
        <div className="navbar-start">
          <select className="px-2 py-3" data-choose-theme>
            <option value="" className="">default</option>
            {themes.map(value =>
              <option className="" key={value.toLocaleLowerCase()} value={value.toLocaleLowerCase()}>{value}</option>
            )}
          </select>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Item 1</a></li>
            <li tabIndex={0}>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn new-palace-btn">New Palace</a>
        </div>
      </div>
      <div className="container carousel-container mx-auto">
        <div className="carousel mx-auto">
          {memoryPalaceCarousel}
        </div>
      </div>
    </>
  );
}

export default App;
