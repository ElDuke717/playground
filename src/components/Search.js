import React from "react";

const Search = (props) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={props.onSearch} />

      <p>
        Searching for <strong>{props.currentSearchTerm}</strong>.
      </p>
    </div>
  );
};

export default Search;
