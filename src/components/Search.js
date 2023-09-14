import React from "react";

// The destructured props are passed into the Search component as a prop - note that this is just the same as passing in props and then destructuring them in the function body e.g. const { search, onSearch } = props;
const Search = ({ search, onSearch }) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        // The value is set to the current search term, which is a variable passed into and changed by the useState hook
        value={search}
        // The onChange event handler is set to the handleSearch function, which is a variable passed into the Search component as a prop.  onChange is called when the input field changes - built into React
        onChange={onSearch}
      />

      <p>
        Searching for <strong>"{search}"</strong>
      </p>
    </div>
  );
};

export default Search;
