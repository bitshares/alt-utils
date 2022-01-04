"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _ViewerStore = _interopRequireDefault(require("./debug/ViewerStore"));

var _connectToStores = _interopRequireDefault(require("./connectToStores"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Styles = {
  root: {
    font: '14px/1.4 Consolas, monospace'
  },
  line: {
    cursor: 'pointer',
    paddingLeft: '1em'
  },
  key: {
    color: '#656865'
  },
  string: {
    color: '#87af5f',
    cursor: 'text',
    marginLeft: '0.1em'
  },
  "boolean": {
    color: '#f55e5f',
    cursor: 'text',
    marginLeft: '0.1em'
  },
  number: {
    color: '#57b3df',
    cursor: 'text',
    marginLeft: '0.1em'
  },
  helper: {
    color: '#b0b0b0',
    marginLeft: '0.1em'
  }
};

var Leaf = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Leaf, _React$Component);

  var _super = _createSuper(Leaf);

  function Leaf(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Leaf);
    _this = _super.call(this, props);
    _this.state = {
      hidden: _this.props.hidden
    };
    _this.toggle = _this._toggle.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(Leaf, [{
    key: "renderValue",
    value: function renderValue() {
      var _this2 = this;

      if ((0, _typeof2["default"])(this.props.data) === 'object' && this.props.data) {
        if (this.state.hidden) {
          return null;
        }

        return Object.keys(this.props.data).map(function (node, i) {
          return /*#__PURE__*/_react["default"].createElement(Leaf, {
            key: i,
            label: node,
            data: _this2.props.data[node],
            level: _this2.props.level + 1,
            hidden: _this2.props.level > 0
          });
        });
      } else {
        var jstype = (0, _typeof2["default"])(this.props.data);
        return /*#__PURE__*/_react["default"].createElement("span", {
          style: Styles[jstype]
        }, String(this.props.data));
      }
    }
  }, {
    key: "renderPluralCount",
    value: function renderPluralCount(n) {
      return n === 0 ? '' : n === 1 ? '1 item' : "".concat(n, " items");
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var label = this.props.label || 'dispatch';
      var jstype = (0, _typeof2["default"])(this.props.data);
      var type = jstype !== 'object' ? '' : Array.isArray(this.props.data) ? '[]' : '{}';
      var length = jstype === 'object' && this.props.data != null ? Object.keys(this.props.data).length : 0;
      return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("span", {
        style: Styles.key
      }, label, ":"), /*#__PURE__*/_react["default"].createElement("span", {
        style: Styles.helper
      }, type, ' ', this.renderPluralCount(length)));
    }
  }, {
    key: "_toggle",
    value: function _toggle() {
      this.setState({
        hidden: !this.state.hidden
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: Styles.line
      }, /*#__PURE__*/_react["default"].createElement("span", {
        onClick: this.toggle
      }, this.renderLabel()), this.renderValue());
    }
  }]);
  return Leaf;
}(_react["default"].Component);

Leaf.defaultProps = {
  hidden: true
};

var Inspector = /*#__PURE__*/function (_React$Component2) {
  (0, _inherits2["default"])(Inspector, _React$Component2);

  var _super2 = _createSuper(Inspector);

  function Inspector() {
    (0, _classCallCheck2["default"])(this, Inspector);
    return _super2.call(this);
  }

  (0, _createClass2["default"])(Inspector, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        styles: Styles.root
      }, /*#__PURE__*/_react["default"].createElement(Leaf, {
        data: this.props.selectedData,
        hidden: false,
        level: 0
      }));
    }
  }]);
  return Inspector;
}(_react["default"].Component);

var _default = (0, _connectToStores["default"])({
  getPropsFromStores: function getPropsFromStores() {
    return _ViewerStore["default"].getState();
  },
  getStores: function getStores() {
    return [_ViewerStore["default"]];
  }
}, Inspector);

exports["default"] = _default;
module.exports = exports.default;