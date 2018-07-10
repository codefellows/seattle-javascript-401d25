![cf](http://i.imgur.com/7v5ASc8.png) 34: Drag and Drop
===

## Learning Objectives
* Students will learn to how to build drag and drop functionality through the use of the HTML5 drag and drop API

## Readings
* [drag and drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

## Outline

### Drag and Drop
Browsers now natively implement drag and drop!  No more need for JS libraries!

### Draggable Attribute
To make a component draggable, it requires a `draggable` attribute. Draggable elements will trigger the drag and drop API events.

``` html
<div id='todo-item-01' draggable>
  <p> cool beans </p>
</div>
```

### Events
There are many drag events `onDrag`, `onDrop`, `onDragStart`, `onDragEnd`, `onDragEnter`, `onDragLeave`, `onDragOver`, and `onDragExit`. When an item is draggable, you can store data on its `onDragStart` event, to be handled `onDrop` of the `dropzone`.

### DataTransfer
Drag events have a `dataTransfer` property that can hold data. It is a great idea to store data here during an `onDragStart` event of the draggable item. `dataTransfer` data must be encoded to unicode data, with MIME types like `text/plain`, `text/html`, `application/json`, etc.

``` javascript

document.getElementById('todo-item-01')
.addEventListener('dragstart', () => {
  e.dataTransfer.setData('application/json', JSON.stringify(someData))
})
```

### Dropzone
Dropzone is the term used to describe a element where draggable elements can be dropped. To create a dropzone, an element must implement an `onDragOver` handler and `onDropHandler`.

``` html
<div id='todo-list'><div>
```
``` javascript
let todoList = document.getElementById('todo-list')

todoList.addEventListener('dragover', (e) => e.preventDefault())
todoList.addEventListener('drop', (e) => {
  e.preventDefault()
  try {
    let someData = JSON.stringify(e.dataTransfer.getData('application/json'))
    // handle drop success
  } catch (err){
    // handle error
  }
})
```
