"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = _interopRequireDefault(require("immutable"));

var _functions = require("./functions");

function immutable(StoreModel, overrides) {
  StoreModel.config = (0, _functions.assign)({
    setState: function setState(currentState, nextState) {
      this.state = nextState;
      return this.state;
    },
    getState: function getState(currentState) {
      return currentState;
    },
    onSerialize: function onSerialize(state) {
      return state.toJS();
    },
    onDeserialize: function onDeserialize(data) {
      return _immutable["default"].fromJS(data);
    }
  }, overrides);
  return StoreModel;
}

var _default = immutable;
exports["default"] = _default;
module.exports = exports.default;