import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

// pages:
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Document from "./pages/Document.js";
import Prompt from "./pages/Prompt.js";
import Login from "./pages/Login.js";
import Journal from "./pages/Journal.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import NavBar from "./modules/NavBar.js";

/**
 * Define the "App" component
 */

const TEST_PROMPT = "~~ How was your day ~~";
const TEST_PAGE_DATA = {
  prompt: TEST_PROMPT,
  content: "orz",
};

const App = () => {
  const [userId, setUserId] = useState(undefined);
  const navigate = useNavigate();

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
    navigate("/journal");
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
    navigate("/login");
  };

  return (
    <>
      <NavBar handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              path="/login"
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              userId={userId}
            />
          }
        />
        <Route path="/journal" element={<Journal path="/journal" />} />
        <Route path="/prompt" element={<Prompt path="/prompt" prompt={TEST_PROMPT} />} />
        <Route path="/text" element={<Document path="/text" />} />
        <Route
          path="/todo"
          element={
            <Skeleton
              path="/todo"
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              userId={userId}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
