import React, { useEffect, useState } from "react";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import booklist from "./data/list";
import "./App.css";

// Initial data for the stories
const initialStories = booklist;

// Asynchronous function that returns a promise - data, once it resolves
const getAsyncStories = () =>
  new Promise(resolve =>
    setTimeout(
      () => resolve({ data: { stories: initialStories } }),
      2000
    )
  );

// Custom hook to handle semi-persistent state using local storage
const useSemiPersistentState = (key, initialState) => {
  // Initialize the state from local storage or with an initial value
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  // Update local storage whenever the value changes
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  // Use the custom hook to manage the search term with semi-persistence
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  // State to manage the list of stories
  const [stories, setStories] = useState(initialStories);

  // This useEffect calls getAsychStories above (simulated delay for an API call)
  useEffect(()=> {
    getAsyncStories().then(result => {
      setStories(result.data.stories);
    });
  }, []);

  // Handler to remove a story from the list
  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  };

  // Handler to update the search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter stories based on the search term
  const searchedStories = stories.filter((story) => {
    return (
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h1>My Hacker Stories</h1>

      {/* Search input component */}
      <InputWithLabel
        id="search"
        onInputChange={handleSearch}
        value={searchTerm}
        isFocused
      >
        <strong>Search</strong>
      </InputWithLabel>

      <hr />

      {/* List component to display filtered stories */}
      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
};

export default App;
