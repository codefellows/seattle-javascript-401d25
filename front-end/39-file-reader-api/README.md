![cf](http://i.imgur.com/7v5ASc8.png) 39: SVGS and Fonts
===

## Learning Objectives
* Students will be able to load fonts with webpack
* Students will be able to create icons using SVGs
* Students will learn the difference between icon fonts and inline svgs

## Readings
* Skim [url-loader docs](https://webpack.js.org/loaders/url-loader/)
* Read [icon-font vs inline-vg](https://css-tricks.com/icon-fonts-vs-svg/)

## Outline

### URL Loader
The url loader can either copy an imported asset into the webpack build path, or turn it into a DataURL. This DataURL can be used to preview the image in the browser, prior to gaining a response from S3, and with the newly created AWS CDN url.

### SVGs
SVGs are natively supported in HTML. By using inline SVG's you open the potential for much more styling control.

### Pro's and Con's to Inline SVG Usage

##### Pros
* use with templates
* better scalability with client zoom
* better general print quality
* allow for CSS3 interactivity

##### Cons
* possibility of inconsistent rendering between browsers
* file size can be massive if you are using an uncompressed `.svg`
