import React from "react";
import { ReactComponent as Check } from "../check.svg";

// Define the Story type with TypeScript. Each Story object will contain
// these properties with their respective types.

type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

// Define the props that the Item component will receive.
// It expects an `item` of type Story and an `onRemoveItem` function.
type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
};
// TypeScript understands that `Item` is a React functional component
// that expects props of type `ItemProps`.
// Item component renders individual story items
// Takes in 'item' containing story details and 'onRemoveItem' function as props
const Item = ({ item, onRemoveItem }: ItemProps) => {
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
        <button
          type="button"
          onClick={() => onRemoveItem(item)}
          className="button button_small"
        >
          <Check height="18px" width="18px" />
        </button>
      </span>
    </div>
  );
};

// Define the Stories type as an Array of Story.
type Stories = Array<Story>;

// Define the props that the List component will receive.
// It expects a `list` of Stories and an `onRemoveItem` function.
type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
};
// TypeScript understands that `List` is a React functional component
// that expects props of type `ListProps`.
// List component to render a list of stories
// Takes in 'list' of stories and 'onRemoveItem' function as props
const List = ({ list, onRemoveItem }: ListProps) => {
  // Map over each story in the 'list' and render it using the 'Item' component
  return list.map((item) => (
    <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
  ));
};

export default List;
