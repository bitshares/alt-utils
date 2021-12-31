"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = atomic;

var _makeFinalStore = babelHelpers.interopRequireDefault(require("./makeFinalStore"));

var _functions = require("./functions");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function makeAtomicClass(alt, StoreModel) {
  var AtomicClass = /*#__PURE__*/function (_StoreModel) {
    babelHelpers.inherits(AtomicClass, _StoreModel);

    var _super = _createSuper(AtomicClass);

    function AtomicClass() {
      var _this;

      babelHelpers.classCallCheck(this, AtomicClass);
      _this = _super.call(this);

      _this.on('error', function () {
        return alt.rollback();
      });

      return _this;
    }

    return babelHelpers.createClass(AtomicClass);
  }(StoreModel);

  AtomicClass.displayName = StoreModel.displayName || StoreModel.name;
  return AtomicClass;
}

function makeAtomicObject(alt, StoreModel) {
  StoreModel.lifecycle = StoreModel.lifecycle || {};

  StoreModel.lifecycle.error = function () {
    alt.rollback();
  };

  return StoreModel;
}

function atomic(alt) {
  var finalStore = (0, _makeFinalStore["default"])(alt);
  finalStore.listen(function () {
    return alt.takeSnapshot();
  });
  return function (StoreModel) {
    return (0, _functions.isFunction)(StoreModel) ? makeAtomicClass(alt, StoreModel) : makeAtomicObject(alt, StoreModel);
  };
}

module.exports = exports.default;