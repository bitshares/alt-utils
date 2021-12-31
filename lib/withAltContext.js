"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = withAltContext;

var _react = babelHelpers.interopRequireDefault(require("react"));

var _propTypes = babelHelpers.interopRequireDefault(require("prop-types"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function withAltContext(flux) {
  return function (Component) {
    var AltContextClass = /*#__PURE__*/function (_React$Component) {
      babelHelpers.inherits(AltContextClass, _React$Component);

      var _super = _createSuper(AltContextClass);

      function AltContextClass(props) {
        babelHelpers.classCallCheck(this, AltContextClass);
        return _super.call(this, props);
      }

      babelHelpers.createClass(AltContextClass, [{
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