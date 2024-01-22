import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DocText } from "../modules/TextInput";

import "./Document.css";
import "../../utilities.css";


const Document = (props) => {
  const navigate = useNavigate();
  const dataObj = useLocation().state;
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(dataObj.content);
  }, []);

  const makeHandleClick = (to) => {
    return () => {
      navigate(to);
    };
  };

  return (
    <div className="Doc-background">
      <div className="Doc-headerContainer">
        <div className="Doc-backButtonContainter">
          <button className="Doc-backButton" onClick={makeHandleClick("/journal")}>
            back to journal
          </button>
        </div>
        <div className="Doc-promptContainer">
          <div className="Doc-promptText">{dataObj.prompt}</div>
        </div>
        <div className="Doc-backButtonContainter" />
      </div>

      <div className="Doc-bodyContainer">
        <div className="Doc-sidebarContainer" />
        <div className="Doc-textContainer">
          <DocText content={content} setContent={setContent} />
        </div>
        <div className="Doc-sidebarContainer Doc-sidebarRightContainer">
          <button className="Doc-pageButton" onClick={makeHandleClick("/prompt")}>
            new page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Document;
