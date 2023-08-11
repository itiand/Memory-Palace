// import React from "react";
// import AddNewPalace from "./AddNewPalace";
import PropTypes from "prop-types";

function Navbar(props) {


  Navbar.propTypes = {
    themes: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

const handleMyPalaces = (e) => {
  e.preventDefault();
  console.log("My Palaces has been clicked")
}

  return (
    <div className="navbar bg-primary">
    <div className="navbar-start">
      <select className="px-2 py-3" data-choose-theme>
        <option value="">default</option>
        {props.themes.map((value) => (
          <option key={value.toLowerCase()} value={value.toLowerCase()}>
            {value}
          </option>
        ))}
      </select>
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Parent</a>
            <ul className="p-2">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <a className="btn btn-ghost normal-case text-xl">Pensieve</a>
    </div>
    <div>
      <a className="btn btn-ghost normal-case text-xl" onClick={handleMyPalaces}>My Palaces</a>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li>
          <a>Item 1</a>
        </li>
        <li tabIndex={0}>
          <details>
            <summary>Parent</summary>
            <ul className="p-2">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
    </div>
    <div className="navbar-end">
      <button className="btn" onClick={() => window.add_palace_view.showModal()}> Add New Palace </button>
    </div>
  </div>
  );
}

export default Navbar;
