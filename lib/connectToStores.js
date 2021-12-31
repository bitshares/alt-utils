"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _functions = require("./functions");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function connectToStores(Spec) {
  var Component = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Spec;

  // Check for required static methods.
  if (!(0, _functions.isFunction)(Spec.getStores)) {
    throw new Error('connectToStores() expects the wrapped component to have a static getStores() method');
  }

  if (!(0, _functions.isFunction)(Spec.getPropsFromStores)) {
    throw new Error('connectToStores() expects the wrapped component to have a static getPropsFromStores() method');
  }

  if (typeof Spec.storeDidChange === 'undefined') {
    var storeDidChange = function storeDidChange() {}; // no-op

  } else if (!(0, _functions.isFunction)(Spec.storeDidChange)) {
    throw new Error('connectToStores() expects the storeDidChange() to be a function');
  } else {
    var storeDidChange = Spec.storeDidChange;
  }

  var StoreConnection = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2["default"])(StoreConnection, _React$Component);

    var _super = _createSuper(StoreConnection);

    function StoreConnection(props, context) {
      var _this;

      (0, _classCallCheck2["default"])(this, StoreConnection);
      _this = _super.call(this, props, context);
      _this.state = Spec.getPropsFromStores(props, context);
      _this.onChange = _this.onChange.bind((0, _assertThisInitialized2["default"])(_this));
      return _this;
    }

    (0, _createClass2["default"])(StoreConnection, [{
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState(Spec.getPropsFromStores(nextProps, this.context));
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var stores = Spec.getStores(this.props, this.context);
        this.storeListeners = stores.map(function (store) {
          return store.listen(_this2.onChange);
        });

        if (Spec.componentDidConnect) {
          Spec.componentDidConnect(this.props, this.context);
        }
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
        this.setState(Spec.getPropsFromStores(this.props, this.context));
        storeDidChange(this.state);
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/_react["default"].createElement(Component, (0, _functions.assign)({}, this.props, this.state));
      }
    }]);
    return StoreConnection;
  }(_react["default"].Component);

  StoreConnection.displayName = "Stateful".concat(Component.displayName || Component.name || 'Container');

  if (Component.contextTypes) {
    StoreConnection.contextTypes = Component.contextTypes;
  }

  return StoreConnection;
}

var _default = connectToStores;
exports["default"] = _default;
module.exports = exports.default;