import React, { useContext} from "react";
// import AddNewPalace from "./AddNewPalace";
import PropTypes from "prop-types";
import { BsHouseAdd } from "react-icons/bs";
import postgresLogoURL from "../assets/postgres.svg";
import Login from "../components/Login";
import { PalaceContext } from "../providers/palaceProvider";

function Navbar(props) {
  const {showLoginForm, setShowLoginForm} = useContext(PalaceContext);

  const handleLoginClick = () => {
    // Toggle the state to show/hide the login form
    setShowLoginForm(!showLoginForm);
  };
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
    
    <div className="outer-nav border-t-8 border-t-green-500 bg-indigo-500 pt-3 text-white">
      <div className="nav-container navbar ">
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
          <a className="flex-start btn btn-ghost  text-4xl normal-case">
            <span className="border-b-4 border-b-green-500">ELIFINT</span>
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
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
      </div>
      {showLoginForm ? <Login /> : null}
    </div>
  );
}

export default Navbar;
