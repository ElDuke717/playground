import React, { useEffect, useState } from "react";
import List from "./components/List";
import Search from "./components/Search";
import booklist from "./data/list";
import "./App.css";

// this is a custom hook that is generalized to set data into local storage, like searchterms
const useSemiPersistentState = () => {
  const [value, setValue] = useState(localStorage.getItem("value") || "");

  useEffect(() => {
    localStorage.setItem("value", value);
  }, [value]);

  return [value, setValue];
};

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // adjusts the list of stories based on the search term using the filter() and includes() methods
  const searchedStories = booklist.filter((story) => {
    return (
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h1>My Hacker Stories </h1>
      {/* The current searchTerm is set to searchTerm, which is a variable passed into and changed by the useState hook */}
      <Search onSearch={handleSearch} search={searchTerm} />

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

export default App;
