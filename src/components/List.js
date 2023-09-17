import React from "react";

// destructuring the item prop to make each item - this is passed into the Item component as a prop, Item is then called in the List component
const Item = ({ item, onRemoveItem }) => {
  const handleRemoveItem = () => {
    onRemoveItem(item);
  };
return  (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>{" "}
    <p> Author: {item.author}</p>
    <p>Comments: {item.num_comments}</p>
    <p>Points: {item.points}</p>
    <span>
      <button type="button" onClick={onRemoveItem.bind(null, item)}>
        Dismiss
      </button>
    </span>
  </div>
);
}

const List = ({ list, onRemoveItem }) => {
  // map over the list of items and return a new array of items
  return list.map((item) => (
    <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}/>
  ));
};

export default List;
