import React from "react";
import List from "./components/List";
import Search from "./components/Search";
import booklist from "./data/list";

const App = () => {
  // variables and functions are defined here
  // For the useEffect() hook, the function is called after the first render and every time the component updates
  const [searchTerm, setSearchTerm] = React.useState("");
  // handleSearch function is passed to the Search component as a prop, it is called when the input field changes
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // adjusts the list of stories based on the search term using the filter() and includes() methods
  const searchedStories = booklist.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
