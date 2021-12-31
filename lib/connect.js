"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

var _Render = babelHelpers.interopRequireDefault(require("./Render"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function connect(Spec, MaybeComponent) {
  function bind(Component) {
    return /*#__PURE__*/function (_React$Component) {
      babelHelpers.inherits(ConnectComponent, _React$Component);

      var _super = _createSuper(ConnectComponent);

      function ConnectComponent(props, context) {
        var _this;

        babelHelpers.classCallCheck(this, ConnectComponent);
        _this = _super.call(this, props, context);
        _this.state = Spec.reduceProps(props, context);
        return _this;
      }

      babelHelpers.createClass(ConnectComponent, [{
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
          return /*#__PURE__*/_react["default"].createElement(Component, babelHelpers["extends"]({}, this.props, this.state));
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