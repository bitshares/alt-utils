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
    babelHelpers.classCallCheck(this, _class);
    this.selectedData = {};
    this.bindActions(_DebugActions["default"]);
  }

  babelHelpers.createClass(_class, [{
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