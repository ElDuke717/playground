import React from "react";
import { ReactComponent as Check } from "../check.svg";

// Item component renders individual story items
// Takes in 'item' containing story details and 'onRemoveItem' function as props
const Item = ({ item, onRemoveItem }) => {
  return (
    <div>
      {/* Display story title as a link */}
      <span>
        <a href={item.url}>{item.title}</a>
      </span>

      {/* Display story author */}
      <span>author: {item.author}</span>

      {/* Display the number of comments for the story */}
      <span>Number of comments: {item.num_comments}</span>

      {/* Display the number of points for the story */}
      <span>Number of points: {item.points}</span>

      {/* Dismiss button to remove the story from the list */}
      <span>
        <button type="button" 
        onClick={() => onRemoveItem(item)}
        className="button button_small"
        >
          <Check height="18px" width="18px" />
        </button>
      </span>
    </div>
  );
};

// List component to render a list of stories
// Takes in 'list' of stories and 'onRemoveItem' function as props
const List = ({ list, onRemoveItem }) => {
  // Map over each story in the 'list' and render it using the 'Item' component
  return list.map((item) => (
    <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
  ));
};

export default List;
