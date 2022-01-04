"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _functions = require("./functions");

var _makeFinalStore = _interopRequireDefault(require("./makeFinalStore"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function timetravel(alt) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var history = (0, _functions.assign)({
    max: 300
  }, options);
  var payloadStore = (0, _makeFinalStore["default"])(alt);
  var payloads = [];
  var current = 0;

  function captureMoment(snapshot) {
    if (payloads.length > history.max - 1) {
      payloads.shift();
    } // trash history because an undo has taken place


    if (current < payloads.length) {
      payloads.splice(current + 1, payloads.length);
    }

    current += 1;
    payloads.push(snapshot);
  }

  return function (Store) {
    var TimeTravelStore = /*#__PURE__*/function (_Store) {
      (0, _inherits2["default"])(TimeTravelStore, _Store);

      var _super = _createSuper(TimeTravelStore);

      function TimeTravelStore() {
        var _this;

        (0, _classCallCheck2["default"])(this, TimeTravelStore);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super.call.apply(_super, [this].concat(args));

        _this.on('init', function (_) {
          // capture the initial snapshot
          captureMoment(alt.serialize((0, _defineProperty2["default"])({}, _this.displayName, (0, _assertThisInitialized2["default"])(_this)))); // capture subsequent shots

          payloadStore.listen(function (_) {
            return captureMoment(alt.takeSnapshot(_this.displayName));
          });
        });

        _this.exportPublicMethods({
          events: function events() {
            return payloads.slice();
          },
          undo: function undo() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var max = payloads.length - 1;
            var index = Math.min(n, max);
            var payload = payloads[max - index];
            current = max - index;
            alt.bootstrap(payload);
          },
          redo: function redo() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var max = payloads.length - 1;
            var index = Math.min(current + n, max);
            var payload = payloads[index];
            current = index;
            alt.bootstrap(payload);
          }
        });

        return _this;
      }

      return (0, _createClass2["default"])(TimeTravelStore);
    }(Store);

    TimeTravelStore.displayName = Store.displayName || Store.name;
    return TimeTravelStore;
  };
}

var _default = timetravel;
exports["default"] = _default;
module.exports = exports.default;