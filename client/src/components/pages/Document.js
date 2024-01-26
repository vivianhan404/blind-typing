import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DocText } from "../modules/TextInput";
import { get, post } from "../../utilities";

import "./Document.css";
import "../../utilities.css";

const Document = (props) => {
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
    <div className="Doc-background u-background ">
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
          <DocText content={content} setContent={setContent} />
        </div>
      </div>
    </div>
  );
};

export default Document;
