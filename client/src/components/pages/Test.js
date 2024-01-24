import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Test.css";

const GOOGLE_CLIENT_ID = "940728155789-dr4d17sm01mt4kvlos551v9uimp9m8pv.apps.googleusercontent.com";

const Test = ({ userId, handleLogin, handleLogout }) => {
  const clickTOC = () => {
    get("/api/toc").then((idxList) => {
      console.log("toc");
      console.log(idxList);
    });
  };

  const clickNewPage = () => {
    post("/api/page").then((pageObj) => {
      console.log("new page!");
      console.log(pageObj);
      console.log(pageObj._id);
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

      <br />
      <button onClick={clickTOC}>TOC</button>
      <br />
      <button onClick={clickNewPage}>New Page</button>
    </>
  );
};

export default Test;
