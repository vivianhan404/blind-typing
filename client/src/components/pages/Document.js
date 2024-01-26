import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DocText } from "../modules/TextInput";
import { get, post } from "../../utilities";

import "./Document.css";
import "../../utilities.css";

const Document = (props) => {
  // return <div>heyo</div>;
  const navigate = useNavigate();
  const { pageID } = useParams();
  const [page, setPage] = useState({});
  const [content, setContent] = useState("");

  useEffect(() => {
    get("/api/page", { pageID: pageID }).then((pageObj) => {
      setPage(pageObj);
    });
    get("/api/text", { pageID: pageID }).then((textObj) => {
      console.log("init text");
      console.log(textObj.content);
      setContent(textObj.content);
    });
  }, []);

  const handleBackClick = () => {
    const body = {
      pageID: pageID,
      content: content,
    };
    post("/api/text", body).then(() => {
      navigate("/journal");
    });
  };

  return (
    <div className="Doc-background">
      <div className="Doc-headerContainer">
        <div className="Doc-backButtonContainter">
          <button className="Doc-backButton" onClick={handleBackClick}>
            back to journal
          </button>
        </div>
        <div className="Doc-promptContainer">
          <div className="Doc-promptText">{page.prompt}</div>
        </div>
        <div className="Doc-backButtonContainter" />
      </div>

      <div className="Doc-bodyContainer">
        <div className="Doc-sidebarContainer" />
        <div className="Doc-textContainer">
          <DocText content={content} setContent={setContent} />
        </div>
        <div className="Doc-sidebarContainer Doc-sidebarRightContainer">
          {/* <button className="Doc-pageButton" onClick={makeHandleClick("/prompt")}>
            new page
          </button> */}{" "}
          {/* TODO re-write handleClick function */}
        </div>
      </div>
    </div>
  );
};

export default Document;
