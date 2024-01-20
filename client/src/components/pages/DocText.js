import React, {useState, useEffect} from "react";

/**
 * Text is the page with the body text
 *
 * Proptypes
 * @param {string} content the data for this journal entry
 */

const DocText = (props) => {
    const [text, setText] = useState("");

    useEffect(() => {
        setText(props.content);
    }, []);

    // called whenever the user types in the new post input box
    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="I feel ..."
                value={text}
                onChange={handleChange}
            />
        </div>
    )
}

export default DocText;