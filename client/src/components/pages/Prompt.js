import React from "react";
import {useNavigate} from "react-router-dom";

/**
 * Prompt is the 'prompt only' page
 *
 * Proptypes
 * @param {string} prompt the prompt to be answered
 */

const TEST_CONTENT = "~~ orz ~~"

const Prompt = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const docObj = {
            prompt: props.prompt,
            content: TEST_CONTENT,
        };
        console.log(docObj);
        navigate("/text", {state: docObj});
    }

    return (
        <div>
            <div>{props.prompt}</div>
            <button onClick={handleClick}>Show text</button>
        </div>
    )
}

export default Prompt;