import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

/**
 * Page Thumbnail is a preview of a single entry on the Journal page
 *
 * Proptypes
 * @param {string} prompt is the thumbnail data
 */

const PageThumb = (props) => {

    return (
        <div>
            <div>{props.prompt}</div>
        </div>
    )
}

export default PageThumb;