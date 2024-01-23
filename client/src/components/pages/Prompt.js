import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, post } from "../../utilities";

import { PromptText } from "../modules/TextInput";
import "./Prompt.css";

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
    get("/api/page", { _id: pageID }).then((pageObj) => {
      setPage(pageObj);
    });
  }, []);

  const handleClick = () => {
    const body = { _id: page._id, content: content };
    post("/api/page-content", body).then(() => {
      // TODO: test change api
      navigate(`/${pageID}/text`);
    });
  };

  return (
    <div className="Prompt-container">
      <h1 className="Prompt-promptText">{page.prompt}</h1>
      <PromptText content={content} setContent={setContent} />
      <button className="Prompt-revealButton" onClick={handleClick}>
        Show text
      </button>
    </div>
  );
};

export default Prompt;
