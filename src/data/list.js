const booklist = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  // Adding 20 more items
  {
    title: "Angular",
    url: "https://angular.io/",
    author: "Misko Hevery",
    num_comments: 10,
    points: 8,
    objectID: 2,
  },
  {
    title: "Vue.js",
    url: "https://vuejs.org/",
    author: "Evan You",
    num_comments: 12,
    points: 9,
    objectID: 3,
  },
  // ... You can continue in this manner
];

// Generate additional items programmatically to save time
for (let i = 4; i < 22; i++) {
  booklist.push({
    title: `Library ${i}`,
    url: `https://library${i}.org/`,
    author: `Author ${i}`,
    num_comments: i,
    points: i + 1,
    objectID: i,
  });
}

console.log(booklist);

export default booklist;
