import React from "react";

/**
 * Prompt is the 'prompt only' page
 *
 * Proptypes
 * @param {string} prompt the prompt to be answered
 */

const Prompt = (props) => {

    return (
        <div>
            <div>{props.prompt}</div>
            <a href="/text">
                <button>Show text</button>
            </a>
        </div>
    )
}

export default Prompt;