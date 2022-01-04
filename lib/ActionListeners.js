"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var fn = _interopRequireWildcard(require("./functions"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * ActionListeners(alt: AltInstance): ActionListenersInstance
 *
 * > Globally listen to individual actions
 *
 * If you need to listen to an action but don't want the weight of a store
 * then this util is what you can use.
 *
 * Usage:
 *
 * ```js
 * var actionListener = new ActionListeners(alt);
 *
 * actionListener.addActionListener(Action.ACTION_NAME, function (data) {
 *   // do something with data
 * })
 * ```
 */
function ActionListeners(alt) {
  this.dispatcher = alt.dispatcher;
  this.listeners = {};
}
/*
 * addActionListener(symAction: symbol, handler: function): number
 * Adds a listener to a specified action and returns the dispatch token.
 */


ActionListeners.prototype.addActionListener = function addActionListener(symAction, handler) {
  if (!fn.isFunction(handler)) {
    throw new Error('addActionListener() expects a function as the second argument');
  }

  var id = this.dispatcher.register(function (payload) {
    /* istanbul ignore else */
    if (symAction === payload.action) {
      handler(payload.data, payload.details);
    }
  });
  this.listeners[id] = true;
  return id;
};
/*
 * removeActionListener(id: number): undefined
 * Removes the specified dispatch registration.
 */


ActionListeners.prototype.removeActionListener = function removeActionListener(id) {
  delete this.listeners[id];
  this.dispatcher.unregister(id);
};
/**
 * Remove all listeners.
 */


ActionListeners.prototype.removeAllActionListeners = function removeAllActionListeners() {
  Object.keys(this.listeners).forEach(this.removeActionListener.bind(this));
  this.listeners = {};
};

var _default = ActionListeners;
exports["default"] = _default;
module.exports = exports.default;