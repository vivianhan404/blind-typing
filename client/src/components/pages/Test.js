import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Test.css";

const GOOGLE_CLIENT_ID = "940728155789-dr4d17sm01mt4kvlos551v9uimp9m8pv.apps.googleusercontent.com";

const Test = ({ userId, handleLogin, handleLogout }) => {
  const clickTOC = () => {
    post("/api/toc").then((idxList) => {
      console.log(idxList);
    });
  };

  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {userId ? (
          <button
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
      </GoogleOAuthProvider>

      <button onClick={clickTOC}>TOC</button>
    </>
  );
};

export default Test;
