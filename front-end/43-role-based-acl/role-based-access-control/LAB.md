![cf](http://i.imgur.com/7v5ASc8.png) Role Based Access Control (Authorization)
===

## Submission Instructions
  * Work in a fork of this sandbox: https://codesandbox.io/s/qlv0l7qkm6
  * Submit a URL to your fork within canvas
  * In the canvas assignment, document usage of your implementation
  
### Practice
  * Follow the prompts in the sandbox application to implement authorized access to the various features using `if(){}`, `renderIf()`, and finally with a new `<Auth/>` component.
    * Do not just jump into the component solution directly!
    * Its important to really understand where the pain points are with the more tactical solutions before you solve them holistically with a component.
  
#### Feature Tasks
* Create an `<Auth/>` component with the following requirements

* Maintains its state based on a login token.
* After a successful login, store the users's ID and Capabilities into the state object so that it can be referred to later.
* `<Auth>` Implemented as a non-visual wrapping component
  * Encloses any component that requires protection.
  * When the Auth component detects a 'falsy' condition ...
    * the children will not render. 
* `Auth.*` Implemented as a method
  * Used within a component to get a boolean value
  * Based on the value returned, render the component differently
* In all cases, `<Auth/>` would require a valid login.
  * (read the token.id property from state)
* In some cases, `<Auth/>` might require a certain capability.
  * (inspect the token.capabilities array from state)

Hide a link until you have been logged in
```
<Auth>
    <Link to="/profile">Profile</Link>
</Auth>
```

Hide a feature unless you have the right capability, based on your role.
```
<Auth capability="edit">
    <form>
      ... fields
    </form>
</Auth>
```

Change how a component works, based on your role/capabilities
```
render() {
  let canEdit = Auth.hasAccess('edit');
  <input type="text" name="foo" disabled={!canEdit} />
  
  ... or 
  
  <label class="editable-{canEdit}">
    <input type="text" name="foo" />
  </label>
}
```

#### Test
* Test your redux reducers 
* Test your util methods
* Test your auth component with mocked users/tokens

#### Documentation  
Write a description of the project in your README.md, including detailed instructions for how to build your app. In your frontend README.md add a code block with your frontend .env vars, and in your backend README.md add a code block with your backend .env vars. 
