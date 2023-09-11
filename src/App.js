import React from "react";
import List from "./components/List";
import booklist from "./data/list";

const App = () => {
  // variables and functions are defined here

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <h1>My Hacker Stories </h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange}/>

      <hr />

      <List list={booklist}  />
    </div>
  );
};

export default App;
