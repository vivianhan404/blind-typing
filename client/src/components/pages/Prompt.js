import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

import { TextInput } from "../modules/TextInput";
import "./Prompt.css";

/**
 * Prompt is the 'prompt only' page
 *
 * Proptypes
 * @param {string} prompt the prompt to be answered
 */

const TEST_CONTENT = "~~ orz ~~"

const Prompt = (props) => {
    const navigate = useNavigate();
    const [content, setContent] = useState("");

    const handleClick = () => {
        const docObj = {
            prompt: props.prompt,
            content: content,
        };
        console.log(docObj);
        navigate("/text", {state: docObj});
    }

    return (
        <div>
            <div className="Prompt-promptText">{props.prompt}</div>
            <TextInput content={content} setContent={setContent} textStyle="TextInput-prompt"/>
            <button onClick={handleClick}>Show text</button>
        </div>
    )
}

export default Prompt;