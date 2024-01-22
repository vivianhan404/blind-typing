import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { PromptText } from "../modules/PromptText";
import { PromptText } from "../modules/TextInput";
import "./Prompt.css";

/**
 * Prompt is the 'prompt only' page
 *
 * Proptypes
 * @param {string} pageID the id of the current page
 */

const Prompt = (props) => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [page, setPage] = useState({});

  useEffect(() => {
    get("/api/page", {pageID: props.pageID}).then((pageObj) => {setPage(pageObj);});
  }, []);

  const handleClick = () => {
    post("/api/page", {page: page});
    navigate("/text", { state: docObj });
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
