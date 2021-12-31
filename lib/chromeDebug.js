"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = chromeDebug;

/* global window */
function chromeDebug(alt) {
  if (typeof window !== 'undefined') window['alt.js.org'] = alt;
  return alt;
}

module.exports = exports.default;