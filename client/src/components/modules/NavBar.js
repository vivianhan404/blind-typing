import React, { useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";

import "./NavBar.css";

/**
 * Template is the template for a component
 *
 * Proptypes
 * @param {string} handleLogout the prompt to be answered
 */

const NO_NAVBAR = ["/prompt", "/login", "/deadbeef"];  //TODO fix visibility

const NavBar = (props) => {
  const location = useLocation();

  return NO_NAVBAR.includes(location.pathname) ? null : (
    <div className="NavBar-container">
      <button
        className="NavBar-button"
        onClick={() => {
          googleLogout();
          props.handleLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
