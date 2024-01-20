import React from "react";

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
    return (
        <div>
            <div>{props.data.prompt}</div>
            <div>{props.data.content}</div>
        </div>
    )
}

export default Document;