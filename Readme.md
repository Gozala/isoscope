# isoscope

[![Build Status](https://secure.travis-ci.org/Gozala/isoscope.png)](http://travis-ci.org/Gozala/isoscope)

ECMAScript function isolation analyzer. This is project is very **alpha** but
intention is to provide API for performing static analyzes on the JS AST nodes
in the de facto [syntax tree format][ast]. All the API function take AST
nodes denoting a function definition / declaration and perform static analyzes
on it.

## API

#### enclosed

Function takes AST node that represents a scope (function declaration /
expression) form and returns array of identifier names for all the enclosed
references.

```js
var esprima = require("esprima")
var enclosed = require("isoscope/enclosed")

// Parse some code
var form = esprima.parse(String(function fn(a, b) {
  console.log(String(a) + b)
}))

// Get a function form we'll be analyzing
var fn = form.body[0]
fn.id
// => { type: "Identifier", name: "fn" }

// Get names of enclosed references
enclosed(fn)
// => [ "console", "String" ]
```

## Install

    npm install isoscope

[esprima]:http://esprima.org/
[ast]:http://esprima.org/doc/index.html#ast
