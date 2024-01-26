import React from "react";

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
 */
const TextInput = (props) => {
  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    props.setValue(event.target.value);
  };

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
const TextBox = (props) => {
  return (
    <TextInput
      defaultText={props.defaultText}
      value={props.content}
      setValue={props.setContent}
      textStyle="TextInput-visible"
    />
  );
};

export { PromptText, TextBox };
