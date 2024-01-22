import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Index.css";

/**
 * Page Thumbnail is a preview of a single entry on the Journal page
 *
 * Proptypes
 * @param {string} data is an index object for the page
 */

const Index = (props) => {
  // TODO update param
  return (
    <a className="Index-container" href={`/${props.data._id}/text`}>
      <div className="Index-promptText">{props.data.prompt}</div>
    </a>
  );
};

export default Index;
