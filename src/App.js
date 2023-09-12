import React from "react";
import List from "./components/List";
import Search from "./components/Search";
import booklist from "./data/list";

const App = () => {
  // variables and functions are defined here

  const [searchTerm, setSearchTerm] = React.useState("");

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
      <Search onSearch={handleSearch} currentSearchTerm ={searchTerm}/>

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

export default App;
