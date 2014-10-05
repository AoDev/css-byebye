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

```
process(css, options)
```

* css is your stylesheet
* options is an object that has at least the `rulesToRemove` property defined.

`rulesToRemove` is an array of strings (selectors).



### Example ###

```
var cssbyebye = require('css-byebye')

var css = 'a { font-size: 12px; } .hello .h1 { background: red } .world { color: blue }'
var rulesToRemove = ['.hello', '.world']

var result = cssbyebye.process(css, { rulesToRemove: rulesToRemove, map: false })
```

Result will contain
```
'a { font-size: 12px; }'
```

