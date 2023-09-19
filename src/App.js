import React, { useEffect, useState, useReducer } from "react";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import booklist from "./data/list";
import "./App.css";
import storiesReducer from "./reducers/storiesReducer";

// Initial data for the stories
const initialStories = booklist;

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='; 


// Custom hook to manage semi-persistent state via local storage
const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  // Use custom hook for managing search term with local storage
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  // One useReducer hook to for unified state management to prevent impossible states
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  // Fetch stories data from the Hacker News API
  useEffect(() => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    fetch(`${API_ENDPOINT}react`)
      .then(response => response.json())
      .then((result) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.hits,
        });
      })
      .catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));
  }, []);

  // Function to remove a story
  const handleRemoveStory = (item) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  };

  // Function to handle search term changes
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter stories based on search term
  const searchedStories = stories.data.filter((story) => {
    return (
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h1>My Hacker Stories</h1>

      {/* Search component */}
      <InputWithLabel
        id="search"
        onInputChange={handleSearch}
        value={searchTerm}
        isFocused
      >
        <strong>Search</strong>
      </InputWithLabel>

      <hr />

      {/* Display stories or error/loading messages */}
      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

export default App;
