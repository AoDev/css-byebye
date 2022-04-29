# CSS Byebye

CSS Byebye is a node module that lets you explicitly remove the CSS rules that you don't want.

---

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Build Status](https://app.travis-ci.com/AoDev/css-byebye.svg?branch=master)](https://app.travis-ci.com/AoDev/css-byebye)

## Description

It's very simple: pass a list of selectors that you want to exclude and it will remove them and the associated rules from your CSS.

I've found some cases where this approach is easier than using more powerful tools like uncss.
Use what's best for you and give some feedback :)

CSS Byebye is built with [postcss](https://github.com/postcss/postcss).

## Usage

CSS Byebye is a CSS post processor and a `postcss` plugin;
read the [postcss docs](https://github.com/postcss/postcss/blob/master/docs/api.md) for more details.

**Run it as indicated in postcss docs:**

```js
postcss(cssbyebye(options)).process(css)
```

- css is your stylesheet
- options is an object that has at least the `rulesToRemove` property defined.

### options

`rulesToRemove` is an array of `strings` or `regular expressions` (selectors).

If you provide a string, it will remove the rule(s) for this exact selector.

### Examples

Some CSS:

```css
a {
  font-size: 12px;
}
.hello .h1 {
  background: red;
}
.world {
  color: blue;
}
```

Using the plugin:

```js
var postcss = require('postcss')
var cssbyebye = require('css-byebye')

var rulesToRemove = ['.hello .h1', '.world']
var options = {rulesToRemove: rulesToRemove, map: false}

// pretend that css var contains the css above
var result = postcss(cssbyebye(options)).process(css)
```

`result` will be an object like this:

```js
{
  css: 'a { font-size: 12px; }'
}
```

If you use the postcss `map` option, then source map will be added to the result object.

#### You can mix strings and regular expressions

```js
var rulesToRemove = ['.hello', /.*\.world.*/]
```

In this case, it would:

- remove a rule with the exact selector `.hello`
- remove any rule that contains the `.world` class.

#### Control directives

You can ignore certain rules or certain block of rules to avoid them being removed, even if they match the criteria, adding comments with control directives. These comments will be removed from the final code.

```javascript
var rulesToRemove = ['.hello .h1', '.world']
```

###### input

```css
a {
  font-size: 12px;
}
/* byebye:ignore */
.hello .h1 {
  background: red;
}
.hello .h1 {
  text-align: left;
}
/* byebye:begin:ignore */
.world {
  color: blue;
}
.world {
  border: 1px solid #ccc;
}
/* byebye:end:ignore */
.world {
  background: white;
}
```

###### output

```css
a {
  font-size: 12px;
}
.hello .h1 {
  background: red;
}
.world {
  color: blue;
}
.world {
  border: 1px solid #ccc;
}
```
