"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

var _ViewerStore = babelHelpers.interopRequireDefault(require("./debug/ViewerStore"));

var _connectToStores = babelHelpers.interopRequireDefault(require("./connectToStores"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

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
  babelHelpers.inherits(Leaf, _React$Component);

  var _super = _createSuper(Leaf);

  function Leaf(props) {
    var _this;

    babelHelpers.classCallCheck(this, Leaf);
    _this = _super.call(this, props);
    _this.state = {
      hidden: _this.props.hidden
    };
    _this.toggle = _this._toggle.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(Leaf, [{
    key: "renderValue",
    value: function renderValue() {
      var _this2 = this;

      if (babelHelpers["typeof"](this.props.data) === 'object' && this.props.data) {
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
        var jstype = babelHelpers["typeof"](this.props.data);
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
      var jstype = babelHelpers["typeof"](this.props.data);
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
  babelHelpers.inherits(Inspector, _React$Component2);

  var _super2 = _createSuper(Inspector);

  function Inspector() {
    babelHelpers.classCallCheck(this, Inspector);
    return _super2.call(this);
  }

  babelHelpers.createClass(Inspector, [{
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