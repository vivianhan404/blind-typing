import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../utilities";

import { NewPageText } from "../modules/TextInput";
import "./NewPage.css";
import "../../utilities.css";

/**
 * New Page sets the prompt for a new journal page
 *
 * Proptypes
 */

const NewPage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const createPage = () => {
    const body = { prompt: prompt };
    post("/api/page", body).then((page) => {
      post("/api/new-text", { pageID: page._id }).then((text) => {
        navigate(`/${page._id}/prompt`);
      });
    });
  };

  return (
    <div className="u-background NewPage-background">
      <div className="NewPage-mainContainer">
        <a href="/journal" className="NewPage-backButtonContainer">
          <button className="NewPage-backButton u-button">Cancel</button>
        </a>
        <div>
          <div className="NewPage-promptContainer">
            <NewPageText
              content={prompt}
              setContent={setPrompt}
              defaultText="Today's prompt is ..."
            />
          </div>
          <button className="u-button NewPage-submitButton" onClick={createPage}>
            Create page
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPage;
