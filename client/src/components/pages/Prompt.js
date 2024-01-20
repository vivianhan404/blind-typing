import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

// import { PromptText } from "../modules/PromptText";
import {PromptText} from "../modules/TextInput";
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
            <PromptText content={content} setContent={setContent}/>
            <button onClick={handleClick}>Show text</button>
        </div>
    )
}

export default Prompt;