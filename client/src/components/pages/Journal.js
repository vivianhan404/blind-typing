import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../utilities";

import SinglePage from "../modules/SinglePage";
import "./Journal.css";
import "../../utilities.css";

/**
 * Journal is the journal home page
 *
 * Proptypes
 */

const Journal = () => {
  const navigate = useNavigate();
  const [toc, setTOC] = useState([]);

  useEffect(() => {
    get("/api/toc").then((pageList) => {
      setTOC(pageList.reverse());
    });
  }, []); // TODO make the list in order by adding last-edited date?

  const pageList = toc.map((pageObj) => <SinglePage data={pageObj} />);

  const handleClick = () => {
    // TODO change routing to new page
    post("/api/page").then((page) => {
      post("/api/new-text", { pageID: page._id }).then((text) => {
        navigate(`/${page._id}/prompt`);
      });
    });
  };

  return (
    <div className="u-background Journal-background">
      <div className="Journal-headerContainer">
        <h1 className="Journal-headerText">Everyday Journal</h1>
      </div>
      <div className="Journal-bodyContainer">
        <div className="Journal-pagesContainer">
          <button className="Journal-newPageButtonContainer" onClick={handleClick}>
            <div className="Journal-newPageButtonText">add new page</div>
          </button>
          {pageList}
        </div>
      </div>
    </div>
  );
};

export default Journal;
