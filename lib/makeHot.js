"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function makeHot(alt, Store) {
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Store.displayName;

  if (module.hot) {
    module.hot.dispose(function () {
      delete alt.stores[name];
    });
  }

  return alt.createStore(Store, name);
}

var _default = makeHot;
exports["default"] = _default;
module.exports = exports.default;