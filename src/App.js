import React, { useEffect, useState, useReducer } from "react";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import booklist from "./data/list";
import "./App.css";

// Initial data for the stories
const initialStories = booklist;

// Reducer function for story state management
const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STORIES':
      return action.payload;
    case 'REMOVE_STORY':
      return state.filter(story => story.objectID !== action.payload.objectID);
    default:
      throw new Error('Action type not handled');
  }
};

// Simulated async function to mimic fetching data from an API
const getAsyncStories = () =>
  new Promise(resolve =>
    setTimeout(
      () => resolve({ data: { stories: initialStories } }),
      2000
    )
  );

// Custom hook to manage semi-persistent state via local storage
const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  // Use custom hook for managing search term with local storage
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  // State and reducer for managing stories
  const [stories, dispatchStories] = useReducer(storiesReducer, []);

  // States for handling loading and error scenarios
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Fetch stories data
  useEffect(() => {
    setIsLoading(true);
    getAsyncStories().then(result => {
      dispatchStories({ type: 'SET_STORIES', payload: result.data.stories });
    })
    .catch(() => setIsError(true))
    .finally(() => setIsLoading(false));
  }, []);

  // Function to remove a story
  const handleRemoveStory = (item) => {
    dispatchStories({ type: 'REMOVE_STORY', payload: item });
  };

  // Function to handle search term changes
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter stories based on search term
  const searchedStories = stories.filter((story) => {
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
      {isError && <p>Something went wrong ...</p>}
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

export default App;
