import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../utilities";

import { NewPageText } from "../modules/TextInput";
import "./NewPage.css";

/**
 * New Page sets the prompt for a new journal page
 *
 * Proptypes
 */

const NewPage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const handleClick = () => {
    const body = { prompt: prompt };
    post("/api/page", body).then((page) => {
      navigate(`/${page._id}/prompt`);
    });
  };

  return (
    <div className="NewPage-background">
      <div className="NewPage-mainContainer">
        <div className="NewPage-promptContainer">
          <NewPageText
            content={prompt}
            setContent={setPrompt}
            defaultPrompt="Today's prompt is ..."
          />
        </div>
        <button className="NewPage-submitButton" onClick={handleClick}>
          Create page
        </button>
      </div>
    </div>
  );
};

export default NewPage;
