import React, { useState } from "react";

import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} value is the current value of the text box
 * @param {({value} => void)} setValue is the setter for value
//  * param {({storyId, value}) => void} onChange: (function) triggered when this input is changed, takes {storyId, value} as parameters
//  * param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 * @param {string} inType is the type of input ("text" or "hidden")
 */
const NewTextInput = (props) => {
  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    props.setValue(event.target.value);
    // props.onChange && props.onChange(value);
  };

//   // called when the user hits "Submit" for a new post
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     props.onSubmit && props.onSubmit(value);
//     setValue("");
//   };

  return (
    <div>
      <input
        type={props.inType || "text"}
        placeholder={props.defaultText}
        value={props.value}
        onChange={handleChange}
      />
      {/* <button
        type="submit"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button> */}
    </div>
  );
};


/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId to add comment to
 */
const NewComment = (props) => {
  const addComment = (value) => {
    const body = { parent: props.storyId, content: value };
    post("/api/comment", body).then((comment) => {
      // display this comment on the screen
      props.addNewComment(comment);
    });
  };

  return <NewTextInput defaultText="New Comment" onSubmit={addComment} />;
};

/**
 * New Message is a New Message component for messages
 *
 * Proptypes
 * @param {UserObject} recipient is the intended recipient
 */
const NewMessage = (props) => {
  const sendMessage = (value) => {
    console.log(value);
  };

  return <NewTextInput defaultText="New Message" onSubmit={sendMessage} />;
};

export { NewComment, NewStory, NewMessage };
