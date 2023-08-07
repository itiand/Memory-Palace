import { useState, useEffect } from 'react';
import { themeChange } from "theme-change";
import useApplicationData from './hooks/useApplicationData';
import axios from 'axios';
import './App.scss';

function App() {
  const { themes } = useApplicationData();

  useEffect(() => {
    themeChange(false);
  });


  return (
    <>
      <div className="navbar bg-base-100">
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
      <div className="container mx-auto">
        <div className="carousel mx-auto max-w-screen-lg">
          <div className="carousel-item w-full flex flex-col">
            <div>
              <img src="https://images-ext-1.discordapp.net/external/rJs80p45-ElChRCSR3ELP2k_VWSEKauZphmw7PzDpfk/https/i.imgur.com/JjF0Lda.jpg?width=1036&height=1228" className="w-full" alt="Tailwind CSS Carousel component" />
            </div>
            <p className='text-center'>LHL PALACE</p>
          </div>
          <div className="carousel-item w-full flex flex-col">
            <div>
              <img src="https://images-ext-1.discordapp.net/external/rJs80p45-ElChRCSR3ELP2k_VWSEKauZphmw7PzDpfk/https/i.imgur.com/JjF0Lda.jpg?width=1036&height=1228" className="w-full" alt="Tailwind CSS Carousel component" />
            </div>
            <p className='text-center'>LHL PALACE</p>
          </div>
          <div className="carousel-item w-full flex flex-col">
            <div>
              <img src="https://images-ext-1.discordapp.net/external/rJs80p45-ElChRCSR3ELP2k_VWSEKauZphmw7PzDpfk/https/i.imgur.com/JjF0Lda.jpg?width=1036&height=1228" className="w-full" alt="Tailwind CSS Carousel component" />
            </div>
            <p className='text-center'>LHL PALACE</p>
          </div>
          <div className="carousel-item w-full flex flex-col">
            <div>
              <img src="https://images-ext-1.discordapp.net/external/rJs80p45-ElChRCSR3ELP2k_VWSEKauZphmw7PzDpfk/https/i.imgur.com/JjF0Lda.jpg?width=1036&height=1228" className="w-full" alt="Tailwind CSS Carousel component" />
            </div>
            <p className='text-center'>LHL PALACE</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
