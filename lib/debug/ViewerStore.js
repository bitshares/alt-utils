"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _alt = _interopRequireDefault(require("./alt"));

var _DebugActions = _interopRequireDefault(require("./DebugActions"));

var _class, _temp;

var _default = _alt["default"].createStore((_temp = _class = /*#__PURE__*/function () {
  function _class() {
    (0, _classCallCheck2["default"])(this, _class);
    this.selectedData = {};
    this.bindActions(_DebugActions["default"]);
  }

  (0, _createClass2["default"])(_class, [{
    key: "selectData",
    value: function selectData(data) {
      this.selectedData = data;
      /*eslint-disable*/

      console.log(data);
      /*eslint-enable*/
    }
  }]);
  return _class;
}(), _class.displayName = 'ViewerStore', _class.config = {
  getState: function getState(state) {
    return {
      selectedData: state.selectedData
    };
  }
}, _temp));

exports["default"] = _default;
module.exports = exports.default;