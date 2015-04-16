# attr-template [![Build Status](https://travis-ci.org/staygrimm/attr-template.svg?branch=master)](https://travis-ci.org/staygrimm/attr-template)

 Simple templating using data attributes.

## Installation

With component:
```
$ component install staygrimm/attr-template
```

With npm:
```
$ npm install attr-template
```

## Quickstart

Rendering a basic html template with a predefined data model.

```js
var Template = require('attr-template');
var el = Template('<p data-text="msg"></p>', {
  msg: 'Hello World!'
});

document.body.appendChild(el);
```

```html
<p>Hello World!</p>
```

## API

### Template(string | element, model)

Render a new DOM element using `string` or `element` as the template and `model` as the data object.

## Supported Attributes

### data-text

The `data-text` binding sets the text content of an element.

### data-html

The `data-html` binding sets the inner html of an element.

### data-&lt;attr&gt;

The `data-<attr>` bindings allows you to set an attribute:

```html
<a data-href="download_url">Download</a>
```
### data-append

  The `data-append` binding allows you to append an existing element:

```html
<div class="photo" data-append="histogram"></div>
```

The `histogram` property on the model is expected to contain a DOM element.

### data-replace

  The `data-replace` binding allows you to replace an existing element, and carryover its attributes:

```html
<div class="photo" data-replace="histogram"></div>
```

The `histogram` property on the model is expected to contain a DOM element.

### data-{visible,hidden}

  The `data-visible` and `data-hidden` bindings conditionally add "visible" or "hidden" classnames so that you may style an element as hidden or visible.

```html
<p data-visible="hasDescription" data-text="truncatedDescription"></p>
```

`data-visible` will add a `visible` class if the property is `truthy`.

`data-hidden` is the opposite of visible and will add a `visibile` class if the value is false and `.hidden` class if the value is truthy.

### data-checked

 Toggles checkbox state:

```html
<input type="checkbox" data-checked="agreed_to_terms">
```

### data-selected

 Toggles option state:

```html
<option data-selected="selected"></option>
```

## Notes

  This library is heavily inspired [reactive](https://github.com/component/reactive) and borrows some code.  Check it out for a more feature-complete view library.

## License

  MIT
