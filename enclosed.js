"use strict";

var difference = require("interset/difference")
var union = require("interset/union")

var scopes = require("episcope/scopes")
var bindings = require("episcope/bindings")
var references = require("episcope/references")

function getName(id) { return id.name }

module.exports = function enclosed(scope) {
  /**
  Function takes AST node that represents a scope (function declaration /
  expression) form and returns array of identifier names for all the enclosed
  references.

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
  **/
  var local = difference(references(scope).map(getName),
                         bindings(scope).map(getName))
  var nested = union.apply(union, scopes(scope).map(enclosed))
  return union(local, nested)
}
