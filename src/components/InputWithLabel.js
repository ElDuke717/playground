import React from "react";

// This used to be a search component, but was refactored into a more general input component so it can be reused.

// The destructured props are passed into the Search component as a prop - note that this is just the same as passing in props and then destructuring them in the function body e.g. const { search, onSearch } = props;
const InputWithLabel = ({ id, children, value, onInputChange, isFocused }) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type="text"
        // The value is set to the current search term, which is a variable passed into and changed by the useState hook
        value={value}
        // The onChange event handler is set to the handleSearch function, which is a variable passed into the Search component as a prop.  onChange is called when the input field changes - built into React
        onChange={onInputChange}
      />
      <p>
        Searching for <strong>"{value}"</strong>
      </p>
    </>
  );
};

export default InputWithLabel;
