import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageThumb from "../modules/PageThumb";
import "./Journal.css";

/**
 * Journal is the journal home page
 *
 * Proptypes
 */

const TEST_THUMB_DATA = { prompt: "~~ test page ~~" };

const TEST_PAGE_THUMB_DATA = [
  { prompt: "1/18 halp" },
  { prompt: "1/20 MVP" },
  { prompt: "~~ test thumbnails ~~" },
  { prompt: "this looks pretty jank" },
  { prompt: "this doesn't format correctly sadge" },
];

const Journal = () => {
  const navigate = useNavigate();

  const pageThumbs = TEST_PAGE_THUMB_DATA.map((thumbData) => (
    <PageThumb prompt={thumbData.prompt} />
  ));

  const handleClick = () => {
    navigate("/prompt");
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
          {pageThumbs}
        </div>
      </div>
    </div>
  );
};

export default Journal;
