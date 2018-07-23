![cf](http://i.imgur.com/7v5ASc8.png) 38: File Reader API
====

## Learning Objectives
* Students will learn to use the `FileReader` API to preview image files 

## Readings
* Read [using files in web applications](https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications)
* Skim [FileReader.readAsDataURL docs](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL)

## Outline

### Previewing Images
Using the HTML5 FileReader API, browser applications can now ask users to read local files and then read the contents of those files. `<input>` tags of a `type="file"` can retrieve files from the user. Those files can then be loaded through the `FileReader`. Once th `FileReader` has loaded the contents of a file, it can then be processed as an ArrayBuffer, BinaryString, DataURL, or Text. After a user selects a photo, it can be previewed by loading the contents using the `FileReader` and then passing a DataURL into an `<img>` tag.
