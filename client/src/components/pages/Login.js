import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Login.css";

const GOOGLE_CLIENT_ID = "940728155789-dr4d17sm01mt4kvlos551v9uimp9m8pv.apps.googleusercontent.com";

const Login = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div className="u-background Login-container">
      <div className="Login-bookContainer">
        <div className="Login-bookSpine" />
        <div className="Login-bookCover">
          <div className="Login-bookLabel u-flex">
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <h1>Login</h1>
              <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
