import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../utilities";

import Index from "../modules/Index";
import "./Journal.css";

/**
 * Journal is the journal home page
 *
 * Proptypes
 */

const Journal = () => { // TODO: connect to api
  const navigate = useNavigate();
  const [toc, setTOC] = useState([]);

  useEffect(() => {
    get("/api/toc").then((idxList) => {
      setTOC(idxList);
    });
  }, []);

  const idxList = toc.map((idxObj) => (
    <Index data={idxObj} />
  ));

  // const handleClick = () => {
  //   const page = { _id: idx._id, prompt: idx.prompt, text: content };
  //   post("/api/page", page).then(() => {
  //     navigate(`/${pageID}/text`);
  //   });
  // };

  // const Indexs = TEST_PAGE_THUMB_DATA.map((thumbData) => (
  //   <Index prompt={thumbData.prompt} />
  // ));

  const handleClick = () => {
    // TODO test make this actually create a new page
    post("/api/page").then((page) => {
      navigate(`/${page._id}/prompt`);
    });
  };

  return (
    <div className="Journal-background">
      <div className="Journal-headerContainer">
        <h1 className="Journal-headerText">Everyday Journal</h1>
      </div>
      <div className="Journal-bodyContainer">
        <div className="Journal-pagesContainer">
          <button className="Journal-newPageButtonContainer" onClick={handleClick}>
            <div className="Journal-newPageButtonText">add new page</div>
          </button>
          {idxList}
        </div>
      </div>
    </div>
  );
};

export default Journal;
