"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = IsomorphicRenderer;

var _iso = babelHelpers.interopRequireDefault(require("iso"));

var _react = babelHelpers.interopRequireDefault(require("react"));

/**
 * IsomorphicRenderer(alt: AltInstance, App: ReactElement): mixed
 *
 * > The glue that it takes to render a react element isomorphically
 *
 * ** This util depends on iso and react **
 *
 * Usage:
 *
 * ```js
 * var IsomorphicRenderer = require('alt/utils/IsomorphicRenderer');
 * var React = require('react');
 * var Alt = require('alt');
 * var alt = new Alt();
 *
 * var App = React.createClass({
 *   render() {
 *     return (
 *       <div>Hello World</div>
 *     );
 *   }
 * });
 *
 * module.exports = IsomorphicRenderer(alt, App);
 * ```
 */
function IsomorphicRenderer(alt, App) {
  /*eslint-disable */
  if (typeof window === 'undefined') {
    /*eslint-enable */
    return function () {
      var app = _react["default"].renderToString( /*#__PURE__*/_react["default"].createElement(App));

      var markup = _iso["default"].render(app, alt.takeSnapshot());

      alt.flush();
      return markup;
    };
  }

  _iso["default"].bootstrap(function (state, _, node) {
    var app = /*#__PURE__*/_react["default"].createElement(App);

    alt.bootstrap(state);

    _react["default"].render(app, node);
  });
}

module.exports = exports.default;