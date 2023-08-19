// import React from "react";
// import AddNewPalace from "./AddNewPalace";
import PropTypes from "prop-types";
import { BsHouseAdd } from "react-icons/bs";
import postgresLogoURL from "../assets/postgres.svg";

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
    <div className="outer-nav bg-indigo-500 text-white">
      <div className="nav-container navbar pt-4">
        <div className="navbar-start">
          <select
            className="bg-indigo-100 px-2 py-3 text-gray-500"
            data-choose-theme
          >
            <option value="">default</option>
            {props.themes.map((value) => (
              <option key={value.toLowerCase()} value={value.toLowerCase()}>
                {value}
              </option>
            ))}
          </select>
          <a className="flex-start btn btn-ghost text-2xl normal-case">
            ELIFINT
          </a>
        </div>
        <div className="navbar-center">
          <button
            className="btn rounded border-none bg-indigo-600  text-3xl text-white hover:bg-indigo-700"
            onClick={() => window.add_palace_view.showModal()}
          >
            <BsHouseAdd></BsHouseAdd>
          </button>
        </div>
        <div className="navbar-end">
          <button
            className="text-md  btn border-none bg-indigo-600 font-light normal-case text-white hover:bg-indigo-700"
            onClick={() => {
              console.log("open user modal");
            }}
          >
            Welcome Sherlock!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
