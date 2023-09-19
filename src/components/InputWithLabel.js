import React from "react";

// InputWithLabel is a reusable input component.
// Takes destructured props such as 'id', 'children', 'value', 'onInputChange', and 'isFocused'.
const InputWithLabel = ({ id, children, value, onInputChange, isFocused }) => {
  
  // Using useRef to get a reference to the input element
  const inputRef = React.useRef();

  // useEffect to focus on the input field based on the 'isFocused' prop
  React.useEffect(() => {
    if (isFocused) {
      // Focuses the input field if 'isFocused' is true
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      {/* Label for the input field, children is used to pass the label text */}
      <label htmlFor={id}>{children}</label>
      &nbsp;
      
      {/* The input element itself */}
      <input
        ref={inputRef}
        id={id}
        type="text"
        // Setting the value prop based on the 'value' passed in
        value={value}
        // onChange event calls the 'onInputChange' function passed as a prop
        onChange={onInputChange}
      />

      {/* Displays the current search term */}
      <p>
        Searching for <strong>"{value}"</strong>
      </p>
    </>
  );
};

export default InputWithLabel;
