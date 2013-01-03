"use strict";

var fixtures = require("./fixtures")
var enclosed = require("../enclosed")

exports["test basic"] = function(assert) {
  assert.deepEqual(enclosed(fixtures.FunctionDeclaration), [
    "Error", "console"
  ], "detected both enclosed variables")
}
