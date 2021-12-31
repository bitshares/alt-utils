"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _Render = _interopRequireDefault(require("./Render"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function connect(Spec, MaybeComponent) {
  function bind(Component) {
    return /*#__PURE__*/function (_React$Component) {
      (0, _inherits2["default"])(ConnectComponent, _React$Component);

      var _super = _createSuper(ConnectComponent);

      function ConnectComponent(props, context) {
        var _this;

        (0, _classCallCheck2["default"])(this, ConnectComponent);
        _this = _super.call(this, props, context);
        _this.state = Spec.reduceProps(props, context);
        return _this;
      }

      (0, _createClass2["default"])(ConnectComponent, [{
        key: "UNSAFE_componentWillMount",
        value: function UNSAFE_componentWillMount() {
          if (Spec.willMount) Spec.willMount(this.props, this.context);
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this2 = this;

          var stores = Spec.listenTo(this.props, this.context);
          this.storeListeners = stores.map(function (store) {
            return store.listen(_this2.onChange);
          });
          if (Spec.didMount) Spec.didMount(this.props, this.context);
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.storeListeners.forEach(function (unlisten) {
            return unlisten();
          });
        }
      }, {
        key: "onChange",
        value: function onChange() {
          this.setState(Spec.reduceProps(this.props, this.context));
        }
      }, {
        key: "render",
        value: function render() {
          return /*#__PURE__*/_react["default"].createElement(Component, (0, _extends2["default"])({}, this.props, this.state));
        }
      }]);
      return ConnectComponent;
    }(_react["default"].Component);
  }

  var createResolver = Spec.resolveAsync ? _Render["default"].withData(Spec.resolveAsync) : function (x) {
    return x;
  }; // works as a decorator or as a function

  return MaybeComponent ? createResolver(bind(MaybeComponent)) : function (Component) {
    return createResolver(bind(Component));
  };
}

var _default = connect;
exports["default"] = _default;
module.exports = exports.default;