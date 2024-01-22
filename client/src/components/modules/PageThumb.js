import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./PageThumb.css";

/**
 * Page Thumbnail is a preview of a single entry on the Journal page
 *
 * Proptypes
 * @param {string} prompt is the thumbnail data
 */

const PageThumb = (props) => {
  return (
    <div className="PageThumb-container">
      <div className="PageThumb-promptText">{props.prompt}</div>
    </div>
  );
};

export default PageThumb;
