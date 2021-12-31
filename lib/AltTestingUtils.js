"use strict";

var _functions = require("./functions");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function noop() {}

var AltTestingUtils = {
  createStoreSpy: function createStoreSpy(alt) {
    return {
      displayName: 'ALT_TEST_STORE',
      alt: alt,
      bindAction: noop,
      bindActions: noop,
      bindListeners: noop,
      dispatcher: alt.dispatcher,
      emitChange: noop,
      exportAsync: noop,
      exportPublicMethods: noop,
      getInstance: noop,
      on: noop,
      registerAsync: noop,
      setState: noop,
      waitFor: noop
    };
  },
  makeStoreTestable: function makeStoreTestable(alt, UnwrappedStore) {
    var StorePrototype = AltTestingUtils.createStoreSpy(alt);

    var DerivedStore = /*#__PURE__*/function (_UnwrappedStore) {
      babelHelpers.inherits(DerivedStore, _UnwrappedStore);

      var _super = _createSuper(DerivedStore);

      function DerivedStore() {
        babelHelpers.classCallCheck(this, DerivedStore);
        return _super.call(this);
      }

      return babelHelpers.createClass(DerivedStore);
    }(UnwrappedStore);

    (0, _functions.assign)(DerivedStore.prototype, StorePrototype);
    return new DerivedStore();
  },
  mockGetState: function mockGetState() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      getState: function getState() {
        return state;
      }
    };
  }
};
module.exports = AltTestingUtils;