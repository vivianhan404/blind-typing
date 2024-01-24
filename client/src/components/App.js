import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

// pages:
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Document from "./pages/Document.js";
import Prompt from "./pages/Prompt.js";
import Login from "./pages/Login.js";
import Journal from "./pages/Journal.js";
import Test from "./pages/Test.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import NavBar from "./modules/NavBar.js";

/**
 * Define the "App" component
 */

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
    post("/api/login", { token: userToken })
      .then((user) => {
        setUserId(user._id);
        post("/api/initsocket", { socketid: socket.id });
      })
      .then(() => {
        navigate("/journal");
      });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout").then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      <NavBar handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={userId ? <Navigate path="/" to="/journal" /> : <Navigate path="/" to="/login" />}
          // element={<div>{userId === "hello"}</div>}
        />
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
        <Route path="/:pageID/prompt" element={<Prompt path="/prompt" />} />
        <Route path="/:pageID/text" element={<Document path="/text" />} />
        <Route
          path="/test"
          element={
            <Test
              path="/todo"
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              userId={userId}
            />
          }
        />
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
