import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

import PageThumb from "../modules/PageThumb";


/**
 * Journal is the journal home page
 *
 * Proptypes
 */

const TEST_THUMB_DATA = { prompt: "~~ test page ~~"}

const TEST_PAGE_THUMB_DATA = [
    { prompt: "1/18 halp"},
    { prompt: "1/20 MVP"},
    { prompt: "~~ test thumbnails ~~"},
]

const Journal = () => {
    const navigate = useNavigate();

    const pageThumbs = TEST_PAGE_THUMB_DATA.map((thumbData) => (
        <PageThumb prompt={thumbData.prompt}/>
    ));

    const handleClick = () => {
        navigate("/prompt");
    }

    return (
        <div>
            <h1>Everyday Journal</h1>
            <button onClick={handleClick}>new page</button>
            {pageThumbs}
        </div>
    )
}

export default Journal;