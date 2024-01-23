import React, { useEffect } from "react";
import "./Test.css";
import { get, post } from "../../utilities";

const Test = () => {
  let foo = "";
  useEffect(() => {
    get("/api/test").then((userID) => {
      foo = userID;
    });
  }, []);

  return <div className="Test-background"></div>;
};

export default Test;
