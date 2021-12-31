"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toDOM = toDOM;
exports.toString = exports.toStaticMarkup = void 0;
exports.withData = withData;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var ReactServer = _interopRequireWildcard(require("react-dom/server"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function withData(fetch, MaybeComponent) {
  function bind(Component) {
    var WithDataClass = /*#__PURE__*/function (_React$Component) {
      (0, _inherits2["default"])(WithDataClass, _React$Component);

      var _super = _createSuper(WithDataClass);

      function WithDataClass(props) {
        (0, _classCallCheck2["default"])(this, WithDataClass);
        return _super.call(this, props);
      }

      (0, _createClass2["default"])(WithDataClass, [{
        key: "getChildContext",
        value: function getChildContext() {
          return {
            buffer: this.context.buffer
          };
        }
      }, {
        key: "UNSAFE_componentWillMount",
        value: function UNSAFE_componentWillMount() {
          if (!this.context.buffer.locked) {
            this.context.buffer.push(fetch(this.props));
          }
        }
      }, {
        key: "render",
        value: function render() {
          return this.context.buffer.locked ? /*#__PURE__*/_react["default"].createElement(Component, this.props) : null;
        }
      }]);
      return WithDataClass;
    }(_react["default"].Component);

    WithDataClass.contextTypes = {
      buffer: _propTypes["default"].object.isRequired
    };
    WithDataClass.childContextTypes = {
      buffer: _propTypes["default"].object.isRequired
    };
    return WithDataClass;
  } // works as a decorator or as a function


  return MaybeComponent ? bind(MaybeComponent) : function (Component) {
    return bind(Component);
  };
}

function usingDispatchBuffer(buffer, Component) {
  var DispatchBufferClass = /*#__PURE__*/function (_React$Component2) {
    (0, _inherits2["default"])(DispatchBufferClass, _React$Component2);

    var _super2 = _createSuper(DispatchBufferClass);

    function DispatchBufferClass(props) {
      (0, _classCallCheck2["default"])(this, DispatchBufferClass);
      return _super2.call(this, props);
    }

    (0, _createClass2["default"])(DispatchBufferClass, [{
      key: "getChildContext",
      value: function getChildContext() {
        return {
          buffer: buffer
        };
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/_react["default"].createElement(Component, this.props);
      }
    }]);
    return DispatchBufferClass;
  }(_react["default"].Component);

  DispatchBufferClass.childContextTypes = {
    buffer: _propTypes["default"].object.isRequired
  };
  return DispatchBufferClass;
}

var DispatchBuffer = /*#__PURE__*/function () {
  function DispatchBuffer(renderStrategy) {
    (0, _classCallCheck2["default"])(this, DispatchBuffer);
    this.promisesBuffer = [];
    this.locked = false;
    this.renderStrategy = renderStrategy;
  }

  (0, _createClass2["default"])(DispatchBuffer, [{
    key: "push",
    value: function push(v) {
      this.promisesBuffer.push(v);
    }
  }, {
    key: "fill",
    value: function fill(Element) {
      return this.renderStrategy(Element);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.promisesBuffer = [];
    }
  }, {
    key: "flush",
    value: function flush(alt, Element) {
      var _this = this;

      return Promise.all(this.promisesBuffer).then(function (data) {
        // fire off all the actions synchronously
        data.forEach(function (f) {
          if (!f) return;

          if (Array.isArray(f)) {
            f.forEach(function (x) {
              return x();
            });
          } else {
            f();
          }
        });
        _this.locked = true;
        return {
          html: _this.renderStrategy(Element),
          state: alt.flush(),
          element: Element
        };
      })["catch"](function (err) {
        return Promise.reject({
          err: err,
          state: alt.flush(),
          element: Element
        });
      });
    }
  }]);
  return DispatchBuffer;
}();

function renderWithStrategy(strategy) {
  return function (alt, Component, props) {
    alt.trapAsync = true; // create a buffer and use context to pass it through to the components

    var buffer = new DispatchBuffer(function (Node) {
      // return React[strategy](Node)
      return ReactServer[strategy](Node);
    });
    var Container = usingDispatchBuffer(buffer, Component); // cache the element

    var Element = /*#__PURE__*/_react["default"].createElement(Container, props); // render so we kick things off and get the props


    buffer.fill(Element); // flush out the results in the buffer synchronously setting the store
    // state and returning the markup

    return buffer.flush(alt, Element);
  };
}

function toDOM(Component, props, documentNode, shouldLock) {
  var buffer = new DispatchBuffer();
  buffer.locked = !!shouldLock;
  var Node = usingDispatchBuffer(buffer, Component);

  var Element = /*#__PURE__*/_react["default"].createElement(Node, props);

  buffer.clear();
  return (0, _reactDom.render)(Element, documentNode);
}

var toStaticMarkup = renderWithStrategy('renderToStaticMarkup');
exports.toStaticMarkup = toStaticMarkup;
var toString = renderWithStrategy('renderToString');
exports.toString = toString;