import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../utilities";

import SinglePage from "../modules/SinglePage";
import "./Journal.css";
import "../../utilities.css";

/**
 * Journal is the journal home page
 */

const Journal = () => {
  const [toc, setTOC] = useState([]);

  useEffect(() => {
    get("/api/toc").then((pageList) => {
      setTOC(pageList.reverse());
    });
  }, []); // TODO make the list in order by adding last-edited date?

  const pageList = toc.map((pageObj) => <SinglePage data={pageObj} />);

  return (
    <div className="u-background Journal-background">
      <div className="Journal-headerContainer">
        <h1 className="Journal-headerText">Everyday Journal</h1>
      </div>
      <div className="Journal-bodyContainer">
        <div className="Journal-pagesContainer">
          <a className="Journal-newPageButtonContainer" href="/create">
            <div className="Journal-newPageButtonText">add new page</div>
          </a>
          {pageList}
        </div>
      </div>
    </div>
  );
};

export default Journal;
