"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combine = combine;
exports.reduceWith = reduceWith;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _functions = require("./functions");

function getId(x) {
  return x.id || x;
}
/* istanbul ignore next */


function shallowEqual(a, b) {
  if ((0, _typeof2["default"])(a) !== 'object' || (0, _typeof2["default"])(b) !== 'object') return a === b;
  if (a === b) return true;
  if (!a || !b) return false;

  for (var k in a) {
    if (a.hasOwnProperty(k) && (!b.hasOwnProperty(k) || a[k] !== b[k])) {
      return false;
    }
  }

  for (var _k in b) {
    if (b.hasOwnProperty(_k) && !a.hasOwnProperty(_k)) {
      return false;
    }
  }

  return true;
}

function combine() {
  for (var _len = arguments.length, restReducers = new Array(_len), _key = 0; _key < _len; _key++) {
    restReducers[_key] = arguments[_key];
  }

  var reducers = _functions.assign.apply(null, [{}].concat(restReducers));

  return function combinedReducer(state, payload) {
    var newState = reducers.hasOwnProperty(payload.action) ? reducers[payload.action](state, payload.data) : state;
    if (shallowEqual(state, newState)) this.preventDefault();
    return newState;
  };
}

function reduceWith(actions, reduce) {
  return actions.reduce(function (total, action) {
    total[getId(action)] = reduce;
    return total;
  }, {});
}