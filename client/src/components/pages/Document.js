import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DocText } from "../modules/TextInput";

const Document = () => {
    const navigate = useNavigate();
    const dataObj = useLocation().state;
    const [content, setContent] = useState("");

    useEffect(() => {
        setContent(dataObj.content);
    }, []);

    const makeHandleClick = (to) => {
        return (() => {navigate(to);});
    }

    return (
        <div>
            <div>{dataObj.prompt}</div>
            <DocText content={content} setContent={setContent} />
            <button onClick={makeHandleClick("/prompt")}>back to prompt</button>
            <button onClick={makeHandleClick("/journal")}>back to journal</button>
        </div>
    )
}

export default Document;