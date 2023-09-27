import React, { useEffect, useState, useReducer, useCallback } from "react";
import List from "./components/List";

import "./App.css";
import storiesReducer from "./reducers/storiesReducer";
import SearchForm from "./components/SearchForm";
import axios from "axios";
import { ReactComponent as Check } from "./check.svg";

// Define API endpoint constant
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

// Custom hook to manage state that persists in local storage
const useSemiPersistentState = (key, initialState) => {
  // Initialize state and try to load previous value from local storage
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  // Update local storage whenever the state changes
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  // Use custom hook to manage search term and keep it in local storage
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  // Initialize URL state for API fetching
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  // Use useReducer to manage the stories' loading state, data, and error state
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  // useCallback ensures handleFetchStories only re-renders when URL changes
  const handleFetchStories = useCallback(async () => {
    // Initiate loading state
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    const result = await axios.get(url);
    // Perform the fetch and handle the response or error
    try {
      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [url]);

  // Fetch stories whenever handleFetchStories changes (which happens when URL changes)
  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  // Function to remove a story from the list
  const handleRemoveStory = (item) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to set the URL for fetching based on search term
  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  };

  return (
    <div>
      <h1>Hacker News Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      <hr />

      {/* Conditional rendering based on loading/error state */}
      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

export default App;
