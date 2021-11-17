# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.1.0](https://github.com/AoDev/css-byebye/compare/v3.0.0...v3.1.0) (2021-11-17)


### Features

* **comments:** implements control directives through comments ([#18](https://github.com/AoDev/css-byebye/issues/18)) ([0394fb1](https://github.com/AoDev/css-byebye/commit/0394fb1b35526f643fcae9134366a61fae00d9c2))

## [3.0.0](https://github.com/AoDev/css-byebye/compare/v2.0.2...v3.0.0) (2021-03-14)


### ⚠ BREAKING CHANGES

* Only works for Node >= 6

* dependencies update + prettier (breaking change) ([ecdce3b](https://github.com/AoDev/css-byebye/commit/ecdce3b76284c1bd810c43d3fdff5c04a72f649e))

## [2.0.2](https://github.com/AoDev/css-byebye/compare/v2.0.1...v2.0.2) (2019-05-03)



<a name="2.0.1"></a>
## [2.0.1](https://github.com/AoDev/css-byebye/compare/v2.0.0...v2.0.1) (2018-06-28)

### Chores

* **dependencies**: update mocha to fix dependency security warning


<a name="2.0.0"></a>
# [2.0.0](https://github.com/AoDev/css-byebye/compare/v1.1.0...v2.0.0) (2018-03-04)


### Chores

* **dependencies:** update postcss to latest version ([b586ebf](https://github.com/AoDev/css-byebye/commit/b586ebf))


### BREAKING CHANGES

* **dependencies:** css-byebye will work from node v4 from now on.

postcss@6 drops support for nodejs 0.12. This should normally not be
a problem if you use recent versions of node, but it is a breaking
change nonetheless.

Links:
https://github.com/postcss/postcss/releases/tag/6.0.0



<a name="1.1.0"></a>
# [1.1.0](https://github.com/AoDev/css-byebye/compare/1.0.1...v1.1.0) (2017-02-22)

### Features

* **atRules:** Remove matching AtRules ([0badb2f](https://github.com/AoDev/css-byebye/commit/0badb2f))

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
