"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DebugActions = babelHelpers.interopRequireDefault(require("./debug/DebugActions"));

var _DispatcherDebugger = babelHelpers.interopRequireDefault(require("./DispatcherDebugger"));

var _react = babelHelpers.interopRequireDefault(require("react"));

var _StoreExplorer = babelHelpers.interopRequireDefault(require("./StoreExplorer"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Debugger = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Debugger, _React$Component);

  var _super = _createSuper(Debugger);

  function Debugger() {
    babelHelpers.classCallCheck(this, Debugger);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Debugger, [{
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