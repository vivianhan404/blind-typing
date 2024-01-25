import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../utilities";

import { NewEntryText } from "../modules/TextInput";
import "./NewEntry.css";

/**
 * New Entry sets the prompt for a new journal Entry
 *
 * Proptypes
 */

const NewEntry = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const handleClick = () => {
    const body = { prompt: prompt };
    post("/api/page", body).then((page) => {
      navigate(`/${page._id}/prompt`);
    });
  };

  return (
    <div className="NewEntry-background">
      <div className="NewEntry-mainContainer">
        <div className="NewEntry-promptContainer">
          <NewEntryText
            content={prompt}
            setContent={setPrompt}
            defaultPrompt="Today's prompt is ..."
          />
        </div>
        <button className="NewEntry-submitButton" onClick={handleClick}>
          Create entry
        </button>
      </div>
    </div>
  );
};

export default NewEntry;
