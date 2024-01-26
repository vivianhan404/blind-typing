import React from "react";

import "./SinglePage.css";

/**
 * Page Thumbnail is a preview of a single entry on the Journal page
 *
 * Proptypes
 * @param {string} data is a page object
 */
// TODO add dates
const SinglePage = (props) => {
  return (
    <a className="SinglePage-container" href={`/${props.data._id}/text`}>
      <div className="SinglePage-promptText">{props.data.prompt}</div>
    </a>
  );
};

export default SinglePage;
