"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AltStore = babelHelpers.interopRequireDefault(require("./debug/AltStore"));

var _DebugActions = babelHelpers.interopRequireDefault(require("./debug/DebugActions"));

var _react = babelHelpers.interopRequireDefault(require("react"));

var _propTypes = babelHelpers.interopRequireDefault(require("prop-types"));

var _connectToStores = babelHelpers.interopRequireDefault(require("./connectToStores"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var StoreExplorer = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(StoreExplorer, _React$Component);

  var _super = _createSuper(StoreExplorer);

  function StoreExplorer() {
    var _this;

    babelHelpers.classCallCheck(this, StoreExplorer);
    _this = _super.call(this);
    _this.selectStore = _this.selectStore.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(StoreExplorer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _DebugActions["default"].setAlt(this.props.alt);
    }
  }, {
    key: "selectStore",
    value: function selectStore(ev) {
      var data = ev.target.dataset;
      var store = this.props.alt.stores[data.name];
      if (store) _DebugActions["default"].selectData(store.getState());
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", null, "Stores"), /*#__PURE__*/_react["default"].createElement("ul", null, this.props.stores.map(function (store) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: store.displayName,
          onClick: _this2.selectStore,
          "data-name": store.displayName,
          style: {
            cursor: 'pointer'
          }
        }, store.displayName);
      })));
    }
  }]);
  return StoreExplorer;
}(_react["default"].Component);

StoreExplorer.propTypes = {
  alt: _propTypes["default"].obj.isRequired,
  stores: _propTypes["default"].array.isRequired
};

var _default = (0, _connectToStores["default"])({
  getPropsFromStores: function getPropsFromStores() {
    return {
      stores: _AltStore["default"].stores()
    };
  },
  getStores: function getStores() {
    return [_AltStore["default"]];
  }
}, StoreExplorer);

exports["default"] = _default;
module.exports = exports.default;