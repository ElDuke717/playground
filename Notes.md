# Notes

These are the same thing:

```javascript
<Wrapper>
  <h1 className="heading">Hello World</h1>
</Wrapper>;

React.createElement(
  Wrapper,
  null,
  React.createElement("h1", { className: "heading" }, "Hello World")
);
```

You need to transpile JSX to JavaScript. You can use Babel to do this.

Everything in curly braces can be used for JavaScript expressions.

## What problems could arise if we keep treating the list variable as a global variable?

A global variable can be changed from within a React component anytime, but React doesn’t update its components and the changed global variable will only be displayed/used once the React component which uses it re-renders.

This is why we need to use the useState hook to create a state variable which can be changed from within a React component and React will update its components whenever the state variable changes.

## JavaScript Classes

```javascript
class Developer {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName() {
    return this.firstName + " " + this.lastName;
  }
}

const robin = new Developer("Robin", "Wieruch");

console.log(robin.getName());

// Robin Wieruch

class JavaScriptDeveloper extends Developer {
  getJob() {
    return "JavaScript Developer";
  }
}
```

If a JavaScript class definition exists, one can create multiple instances of it. It is similar to a React component, which has only one component definition, but can have multiple instances:

# React DOM

React DOM is a package that ships with React. It provides an API for the DOM (Document Object Model) in the browser. React DOM takes care of rendering React components in the browser DOM.

`index.js` is the entry point of the React application. It renders the `App` component into the DOM element with the id `root`.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<h1>Hello React World</h1>, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

## Handler Functions in JSX

The synthetic event is essentially a wrapper around the browser’s native event, with more functions that are useful to prevent native browser behavior (e.g. refreshing a page after the user clicks a form’s submit button). Sometimes you will use the event, sometimes you won’t need it.

[Event reference]
(https://developer.mozilla.org/en-US/docs/Web/Events)