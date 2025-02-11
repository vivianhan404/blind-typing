import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, post } from "../../utilities";
import { Progress } from "reactstrap";

import { PromptText } from "../modules/TextInput";
import "./Prompt.css";
import "../../utilities.css";

/**
 * Prompt is the 'prompt only' page
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
    get("/api/text", { pageID: pageID }).then((textObj) => {
      setContent(textObj.content);
    });
  }, []); // TODO: make input box invisible

  const wordCount = content.split(/\s+/).filter(Boolean).length;

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
    <div className="u-background Prompt-container">
      <button className="Prompt-backButton u-button" onClick={handleClick("/journal")}>
        back to journal
      </button>
      <h1 className="Prompt-promptText">{page.prompt}</h1>
      <PromptText content={content} setContent={setContent} />
      <Progress
        value={wordCount}
        max={200}
        className="Prompt-progress"
        barClassName="Prompt-progressBar"
      />
      <button className="Prompt-revealButton" onClick={handleClick(`/${pageID}/text`)}>
        Show text
      </button>
    </div>
  );
};

export default Prompt;
