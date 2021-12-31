"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = withAltContext;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function withAltContext(flux) {
  return function (Component) {
    var AltContextClass = /*#__PURE__*/function (_React$Component) {
      (0, _inherits2["default"])(AltContextClass, _React$Component);

      var _super = _createSuper(AltContextClass);

      function AltContextClass(props) {
        (0, _classCallCheck2["default"])(this, AltContextClass);
        return _super.call(this, props);
      }

      (0, _createClass2["default"])(AltContextClass, [{
        key: "getChildContext",
        value: function getChildContext() {
          return {
            flux: flux
          };
        }
      }, {
        key: "render",
        value: function render() {
          return /*#__PURE__*/_react["default"].createElement(Component, this.props);
        }
      }]);
      return AltContextClass;
    }(_react["default"].Component);

    AltContextClass.childContextTypes = {
      flux: _propTypes["default"].object
    };
    return AltContextClass;
  };
}

module.exports = exports.default;