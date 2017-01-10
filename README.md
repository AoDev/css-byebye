CSS Byebye
===========

CSS Byebye is a node module that lets you explicitly remove the CSS rules that you don't want.

---------

[![Join the chat at https://gitter.im/AoDev/css-byebye](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/AoDev/css-byebye?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Build Status](https://travis-ci.org/AoDev/css-byebye.svg)](https://travis-ci.org/AoDev/css-byebye)

Description
------------

It's very simple: pass a list of selectors that you want to exclude and it will remove them and the associated rules from your CSS.

I've found some cases where this approach is easier than using more powerful tools like uncss.
Use what's best for you and give some feedback :)

CSS Byebye is built with [postcss](https://github.com/postcss/postcss).

A grunt task for CSS Byebye exists: [grunt-css-byebye](https://github.com/AoDev/grunt-css-byebye).


Usage
------

CSS Byebye is a CSS post processor and a `postcss` plugin;
read the [postcss docs](https://github.com/postcss/postcss/blob/master/docs/api.md) for more details.

**Run it as indicated in postcss docs:**

```js
postcss(cssbyebye(options)).process(css)
```

* css is your stylesheet
* options is an object that has at least the `rulesToRemove` property defined.


### options

`rulesToRemove` is an array of `strings` or `regular expressions` (selectors).

If you provide a string, it will remove the rule(s) for this exact selector.


### Examples ###

Some CSS:

```css
 a { font-size: 12px; }
 .hello .h1 { background: red }
 .world { color: blue }
```

Using the plugin:

```js
var postcss = require('postcss')
var cssbyebye = require('css-byebye')

var rulesToRemove = ['.hello .h1', '.world']
var options = { rulesToRemove: rulesToRemove, map: false }

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
var rulesToRemove = [
  '.hello',
  /.*\.world.*/
]
```

In this case, it would:
* remove a rule with the exact selector `.hello`
* remove any rule that contains the `.world` class.



Changelog
----------

### 2017-01-10 v1.0.2
* Ignore keyframes
* Upgrade deps

### 2015-09-25 v1.0.1
* Upgrade to postCSS 5.x
* Docs improved.
* The project uses js standard code style.

### 2015-06-09 v1.0.0
* **Breaking changes** and bumped to 1.0.0
* Update to last postCSS version
* Now can be piped with other postCSS plugins

### 2014-10-19 v0.2.0
* The default behaviour is to match the exact selector when a string is given.
* Added the possibility to match with regular expressions.


