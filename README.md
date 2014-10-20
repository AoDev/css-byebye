CSS Byebye
===========

CSS Byebye is a node module that lets you explicitly remove the CSS rules that you don't want.


Description
------------

It's very simple: pass him a list of selectors that you want to exclude and it will remove them and the associated rules from your CSS.

I've found some cases where this approach is easier than using more powerful tools like uncss.
Use what's best for you and give some feedback :)

CSS Byebye is built with postcss [postcss](https://github.com/postcss/postcss).

Note: A grunt task for CSS Byebye is currently being developed.


API
-----

CSS Byebye is a CSS post processor built with `postcss`; part of its API is defined as in the [postcss docs](https://github.com/postcss/postcss).

It exposes a `process` method with the following signature:

```js
process(css, options)
```

* css is your stylesheet
* options is an object that has at least the `rulesToRemove` property defined.

`rulesToRemove` is an array of `strings` or `regular expressions` (selectors).

If you provide a string, it will remove the rule(s) for this exact selector.


### Examples ###

```js
var cssbyebye = require('css-byebye')

var css = 'a { font-size: 12px; } .hello .h1 { background: red } .world { color: blue }'
var rulesToRemove = ['.hello .h1', '.world']

var result = cssbyebye.process(css, { rulesToRemove: rulesToRemove, map: false })
```

`result` will be an object like this:

```css
{
  css: 'a { font-size: 12px; }'
}
```

If you use the postcss map option, then it will be added to the result object.


#### You can mix strings and regular expressions

```js
var rulesToRemove = ['.hello', /.*\.world.*/]
```

In this case, it would remove a rule with the exact selector `.hello` and any rule
that contains the `.world` class.



Changelog
----------

### 2015-10-19 v0.2.0
* The default behaviour is to match the exact selector when a string is given.
* Added the possibility to match with regular expressions.


