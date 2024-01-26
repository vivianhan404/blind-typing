import React, { useState } from "react";

import { post } from "../../utilities";
import "./TextInput.css";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {boolean} autoFocus
 * @param {string} defaultText is the placeholder text
 * @param {string} value is the current value of the text box
 * @param {({value} => void)} setValue is the setter for value
 * @param {string} textStyle is the css class for the style of the text box
//  * param {({storyId, value}) => void} onChange: (function) triggered when this input is changed, takes {storyId, value} as parameters
//  * param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
  */
const TextInput = (props) => {
  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    // console.log("change! " + event.target.value);
    // console.log(props.textStyle);
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
    <textarea
      autoFocus={props.autoFocus}
      type="text"
      placeholder={props.defaultText}
      value={props.value}
      onChange={handleChange}
      className={props.textStyle}
    />
  );
};

/**
 * Document Text is a Document component for text
 *
 * Proptypes
 * @param {string} content is the placeholder text
 * @param {({value} => void)} setContent is the setter for value
 */
const DocText = (props) => {
  return (
    <TextInput
      textStyle="TextInput-visible"
      defaultText="I feel..."
      value={props.content}
      setValue={props.setContent}
    />
  );
};

/**
 * Prompt Text is a Prompt component for text input
 *
 * Proptypes
 * @param {string} content is the placeholder text
 * @param {({value} => void)} setContent is the setter for value
 */
const PromptText = (props) => {
  return (
    <TextInput
      autoFocus={true}
      value={props.content}
      setValue={props.setContent}
      textStyle="TextInput-invisible"
    />
  );
};

/**
 * Prompt Text is a Prompt component for text input
 *
 * Proptypes
 * @param {string} content is the placeholder text
 * @param {({value} => void)} setContent is the setter for value
 * @param {string} defaultText is the default text of the text box
 */
const NewPageText = (props) => {
  return (
    <TextInput
      defaultText={props.defaultText}
      value={props.content}
      setValue={props.setContent}
      textStyle="TextInput-visible"
    />
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

  return <TextInput defaultText="New Comment" onSubmit={addComment} />;
};

export { DocText, PromptText, NewPageText, TextInput };
