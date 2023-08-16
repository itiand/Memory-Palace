// import React from "react";
// import AddNewPalace from "./AddNewPalace";
import PropTypes from "prop-types";
import { BsHouseAdd } from 'react-icons/bs';
import postgresLogoURL from '../assets/postgres.svg';



function Navbar(props) {


  Navbar.propTypes = {
    themes: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  const handleMyPalaces = (e) => {
    e.preventDefault();
    console.log("My Palaces has been clicked");
    window.add_palace_image_view.close();
    window.reg_view.showModal();
  };

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
        <a className="btn btn-ghost normal-case text-2xl flex-start">
          <img src={postgresLogoURL} alt="Postgres Logo" className="h-12 w-12" />
          ELIFINT
        </a>
      </div>

      {/* <div className="navbar-center hidden lg:flex">
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
    </div> */}
      <div>
        <button className="btn btn-ghost normal-case text-xl" onClick={handleMyPalaces}>My Palaces</button>
      </div>
      <div className="navbar-end">
        <button className="btn text-3xl" onClick={() => window.add_palace_view.showModal()}><BsHouseAdd></BsHouseAdd>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
