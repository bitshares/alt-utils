"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _DebugActions = _interopRequireDefault(require("./debug/DebugActions"));

var _DispatcherDebugger = _interopRequireDefault(require("./DispatcherDebugger"));

var _react = _interopRequireDefault(require("react"));

var _StoreExplorer = _interopRequireDefault(require("./StoreExplorer"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Debugger = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Debugger, _React$Component);

  var _super = _createSuper(Debugger);

  function Debugger() {
    (0, _classCallCheck2["default"])(this, Debugger);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Debugger, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _DebugActions["default"].setAlt(this.props.alt);
    }
  }, {
    key: "renderInspectorWindow",
    value: function renderInspectorWindow() {
      return this.props.inspector ? /*#__PURE__*/_react["default"].createElement(this.props.inspector, null) : null;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", null, "Debug"), /*#__PURE__*/_react["default"].createElement(_DispatcherDebugger["default"], {
        alt: this.props.alt
      }), /*#__PURE__*/_react["default"].createElement(_StoreExplorer["default"], {
        alt: this.props.alt
      }), this.renderInspectorWindow());
    }
  }]);
  return Debugger;
}(_react["default"].Component);

var _default = Debugger;
exports["default"] = _default;
module.exports = exports.default;