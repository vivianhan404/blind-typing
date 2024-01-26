import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextBox } from "../modules/TextInput";
import { get, post } from "../../utilities";

import "./Document.css";
import "../../utilities.css";

const Document = () => {
  const navigate = useNavigate();
  const { pageID } = useParams();
  const [page, setPage] = useState({});
  const [content, setContent] = useState("");

  useEffect(() => {
    get("/api/page", { pageID: pageID }).then((pageObj) => {
      setPage(pageObj);
    });
    get("/api/text", { pageID: pageID }).then((textObj) => {
      setContent(textObj.content);
    });
  }, []);

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
    <div className="u-background u-flexColumn">
      <div className="Doc-headerContainer">
        <div className="Doc-backButtonContainter">
          <button className="Doc-backButton u-button" onClick={handleClick("../journal")}>
            back to journal
          </button>
        </div>
        <div className="Doc-promptContainer">
          <div className="Doc-promptText">{page.prompt}</div>
          <button
            className="Doc-promptButton Doc-backButton u-button"
            onClick={handleClick(`/${pageID}/prompt`)}
          >
            hide text
          </button>
        </div>
        <div className="Doc-backButtonContainter" />
      </div>

      <div className="Doc-bodyContainer">
        <div className="Doc-textContainer">
          <TextBox content={content} setContent={setContent} defaultText="I feel ... " />
        </div>
      </div>
    </div>
  );
};

export default Document;
