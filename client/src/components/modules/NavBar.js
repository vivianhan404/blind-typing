import React, { useState } from "react";
import { googleLogout } from "@react-oauth/google";
import {useLocation, useNavigate} from "react-router-dom";

/**
 * Template is the template for a component
 *
 * Proptypes
 * @param {string} handleLogout the prompt to be answered
 */

const TEST_CONTENT = "~~ orz ~~"
const NO_NAVBAR = [
    "/prompt",
    "/login",
]

const NavBar = (props) => {
    const location = useLocation();
    console.log(location.pathname);

    return (
        (NO_NAVBAR.includes(location.pathname))? (null) : (
            <div>
                <button
                    onClick={() => {
                        googleLogout();
                        props.handleLogout();
                    }}
                >
                    Logout
                </button>
            </div>
        )
    )
}

export default NavBar;