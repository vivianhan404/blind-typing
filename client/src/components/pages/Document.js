import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DocText } from "../modules/TextInput";
// import DocText from "../modules/DocText2";

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
    const [content, setContent] = useState("");

    useEffect(() => {
        setContent(dataObj.content);
    }, []);

    return (
        <div>
            <div>{dataObj.prompt}</div>
            <DocText content={content} setContent={setContent} />
            <Link to="/prompt">back to prompt</Link>
        </div>
    )
}

export default Document;