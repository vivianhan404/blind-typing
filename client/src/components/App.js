import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

// pages: 
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Document from "./pages/Document.js";
import Prompt from "./pages/Prompt.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */

const TEST_PROMPT = "~~ How are you doing? ~~"
const TEST_PAGE_DATA = {
  prompt: TEST_PROMPT,
  content: "orz",
};

const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Skeleton
            path="/"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
          />
        }
      />
      <Route 
        path="/prompt"
        element={
          <Prompt 
            path="/prompt"
            prompt={TEST_PROMPT}
          />
        }
      />
      <Route
        path="/text"
        element={
          <Document
            path="/text"
            data={TEST_PAGE_DATA}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
