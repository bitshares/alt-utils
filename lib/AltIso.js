"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _iso = babelHelpers.interopRequireDefault(require("iso"));

var Render = _interopRequireWildcard(require("./Render"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || babelHelpers["typeof"](obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = {
  define: Render.withData,
  render: function render(alt, Component, props) {
    if (typeof window === 'undefined') {
      return Render.toString(alt, Component, props).then(function (obj) {
        return {
          html: _iso["default"].render(obj.html, obj.state, {
            iso: 1
          })
        };
      })["catch"](function (err) {
        // return the empty markup in html when there's an error
        return {
          err: err,
          html: _iso["default"].render()
        };
      });
    }

    _iso["default"].bootstrap(function (state, node, key) {
      alt.bootstrap(state);
      Render.toDOM(Component, props, node, key);
    });

    return Promise.resolve();
  }
};
exports["default"] = _default;
module.exports = exports.default;