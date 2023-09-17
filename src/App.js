import React, { useEffect, useState } from "react";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import booklist from "./data/list";
import "./App.css";

const initialStories = booklist;

// this is a custom hook that is generalized to set data into local storage, like searchterms
const useSemiPersistentState = () => {
  const [value, setValue] = useState(localStorage.getItem("value") || "");

  useEffect(() => {
    localStorage.setItem("value", value);
  }, [value]);

  return [value, setValue];
};

const App = () => {
  // now useSemiPersistentState is used to update the state, based on previously saved state in local storage
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // state handler for the stories.  Initial stories comes from the booklist
  const [stories, setStories] = useState(initialStories);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );

    setStories(newStories);
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

      <InputWithLabel
        id="search"
        onInputChange={handleSearch}
        value={searchTerm}
        isFocused
      >
        {/* This can be passed in instead of "label" and it  */}
        <strong>Search</strong>
      </InputWithLabel>

      <hr />

      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
};

export default App;
