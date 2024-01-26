import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, post } from "../../utilities";

import { PromptText } from "../modules/TextInput";
import "./Prompt.css";
import "../../utilities.css";

/**
 * Prompt is the 'prompt only' page
 *
 * Proptypes
 */

const Prompt = () => {
  const { pageID } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [page, setPage] = useState({});

  useEffect(() => {
    get("/api/page", { pageID: pageID }).then((pageObj) => {
      setPage(pageObj);
    });
  }, []); // TODO: make input box invisible

  const handleClick = () => {
    const body = { pageID: page._id, content: content };
    post("/api/text", body).then(() => {
      // TODO: test change api
      navigate(`/${pageID}/text`);
    });
  };

  return (
    // TODO: add back button to journal
    <div className="u-background Prompt-container">
      <h1 className="Prompt-promptText">{page.prompt}</h1>
      <PromptText content={content} setContent={setContent} />
      <button className="Prompt-revealButton" onClick={handleClick}>
        Show text
      </button>
    </div>
  );
};

export default Prompt;
