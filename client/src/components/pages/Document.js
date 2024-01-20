import React from "react";
import { useLocation } from "react-router-dom";
import DocText from "../modules/DocText";

/**
 * @typedef PageObject
 * @property {string} prompt is the prompt for this page
 * @property {string} content is the body text for this journal entry
 */

/**
 * Text is the page with the body text
 *
 * Proptypes
 * @param {PageObject} data the data for this journal entry
 */

const Document = (props) => {
    const dataObj = useLocation().state;

    return (
        <div>
            <div>{dataObj.prompt}</div>
            <DocText content={dataObj.content} />
        </div>
    )
}

export default Document;