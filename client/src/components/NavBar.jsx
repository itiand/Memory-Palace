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
    <div className="outer-nav bg-primary">
      <div className="navbar nav-container pt-4">
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
        <div className="navbar-center">
          <button className="btn text-3xl" onClick={() => window.add_palace_view.showModal()}><BsHouseAdd></BsHouseAdd>
          </button>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost normal-case text-xl" onClick={handleMyPalaces}>Welcome: Sherlock!</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
