"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _alt = babelHelpers.interopRequireDefault(require("./alt"));

var _default = _alt["default"].generateActions('addDispatch', 'clear', 'loadRecording', 'replay', 'revert', 'saveRecording', 'selectData', 'setAlt', 'startReplay', 'stopReplay', 'togglePauseReplay', 'toggleRecording');

exports["default"] = _default;
module.exports = exports.default;