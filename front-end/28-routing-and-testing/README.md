![cf](http://i.imgur.com/7v5ASc8.png) 28: Routing and Testing
===

## Learning Objectives
* Students will learn to create frontend routes using `react-router-dom`
* Students will learn to restructure their applications into modules
* Students will learn the difference between view state and application state
* Students will learn to lift application state to better control one way data flow
* Students will learn to create and import SCSS partials

## Readings
* Skim [es6 modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/)
* Read [react-router-dom philosophy](https://reacttraining.com/react-router/web/guides/philosophy)
* Read [lifting state up](https://facebook.github.io/react/docs/lifting-state-up.html)
* Skim [mdn import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
* Skim [mdn export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

## Outline

### Frontend React Routing
The primary routing library for react web applications is `react-router-dom`. It manages switching between components based off of state or the window location.  It will also control the browsers history, through the use of the history API. By using the browser history API, it enables users to hit the back button on their browser and revert to the last route without re-rendering the page.

### Types of State

##### Application State
Application state is any state that represents the core data of your application. This is your all your models. Examples include:  
* Auth
* User
* Note
* Article

##### View State
View state is any state that has to do with how a specific component should look. Examples include:  
* input's values
* which menu item is focused
* when to hide/show a section of the view
* when  a hamburger menu is open or closed

### Lifting State
Because data can only flow from parents to children, if more than one component needs to reflect the same changing data, that data must be managed higher on the tree by a mutual parent. One solution to this problem is to lift all **application state** to the top of the application, enabling the entire application to share changing state. **View State** does not often have to be lifted.

### ES6 modules
ES6 now supports its own ability to define JS modules. ES6 Modules are like commonJS modules, except they are automatically strict-mode code, even if you don't write `use strict`. ES6 now uses `export` and `import` to define and load modules.

### Testing

##### Jest
Jest is a Javascript testing framework with out of the box react support. Jest methods include:
* `describe` (same as mocha)
* `beforeAll`, `afterAll` (same as mocha before and after)
* `beforeEach` , `afterEach` (same as mocha)
* `test` (same as mocha it)
* `expect` (similar to expect js)

##### Enzyme
Enzyme is a utility designed to ease the testing of react components. It has a jQuery like api that helps interact with React components. It provides several methods for compiling/rendering components:
* `shallow(<Component />)` - shallow rendering is useful to test a component without indirectly asserting behavior of child components
* `render(<Component />)` - static rendering is used to render components to static html (text) and analyze the resulting HTML structure
* `mount(<Component />)` - full rendering is ideal when your components interact with DOM APIs
