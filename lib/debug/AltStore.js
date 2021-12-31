"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _alt = babelHelpers.interopRequireDefault(require("./alt"));

var _DebugActions = babelHelpers.interopRequireDefault(require("./DebugActions"));

var _class, _temp;

var _default = _alt["default"].createStore((_temp = _class = /*#__PURE__*/function () {
  function _class() {
    var _this = this;

    babelHelpers.classCallCheck(this, _class);
    this.alt = null;
    this.stores = [];
    this.bindActions(_DebugActions["default"]);
    this.exportPublicMethods({
      alt: function alt() {
        return _this.alt;
      },
      stores: function stores() {
        return _this.stores;
      }
    });
  }

  babelHelpers.createClass(_class, [{
    key: "setAlt",
    value: function setAlt(altInst) {
      var _this2 = this;

      this.alt = altInst;
      this.stores = Object.keys(this.alt.stores).map(function (name) {
        return _this2.alt.stores[name];
      });
    }
  }]);
  return _class;
}(), _class.displayName = 'AltStore', _class.config = {
  getState: function getState(state) {
    return {
      stores: state.stores
    };
  }
}, _temp));

exports["default"] = _default;
module.exports = exports.default;