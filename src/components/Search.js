import React from "react";

const Search = (props) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        // The value is set to the current search term, which is a variable passed into and changed by the useState hook
        value={props.search}
        // The onChange event handler is set to the handleSearch function, which is a variable passed into the Search component as a prop.  onChange is called when the input field changes - built into React
        onChange={props.onSearch}
      />

      <p>
        Searching for <strong>{props.currentSearchTerm}</strong>.
      </p>
    </div>
  );
};

export default Search;
