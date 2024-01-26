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

  const handleClick = (linkTo) => () => {
    const body = {
      pageID: pageID,
      content: content,
    };
    post("/api/text", body).then(() => {
      navigate(linkTo);
    });
  };

  return (
    // TODO: add back button to journal
    <div className="u-background Prompt-container">
      <button className="Prompt-backButton u-button" onClick={handleClick("/journal")}>
        back to journal
      </button>
      <h1 className="Prompt-promptText">{page.prompt}</h1>
      <PromptText content={content} setContent={setContent} />
      <button className="Prompt-revealButton" onClick={handleClick(`/${pageID}/text`)}>
        Show text
      </button>
    </div>
  );
};

export default Prompt;
