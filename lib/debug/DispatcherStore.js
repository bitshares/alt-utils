"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _alt = _interopRequireDefault(require("./alt"));

var _AltStore = _interopRequireDefault(require("./AltStore"));

var _DebugActions = _interopRequireDefault(require("./DebugActions"));

var _class, _temp;

var _default = _alt["default"].createStore((_temp = _class = /*#__PURE__*/function () {
  function _class() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, _class);
    this.cachedDispatches = [];
    this.dispatches = [];
    this.currentStateId = null;
    this.snapshots = {};
    this.replayTime = 100;
    this.isRecording = true;
    this.isReplaying = false;
    this.nextReplayId = null; // due to the aggressive nature of FixedDataTable's shouldComponentUpdate
    // and JS objects being references not values we need an mtime applied
    // to each dispatch so we know when data has changed

    this.mtime = Date.now();
    this.on('beforeEach', function () {
      _this.mtime = Date.now();
    });
    this.bindActions(_DebugActions["default"]);
  }

  (0, _createClass2["default"])(_class, [{
    key: "addDispatch",
    value: function addDispatch(payload) {
      if (!this.isRecording) return false;

      var dispatchedStores = _AltStore["default"].stores().filter(function (x) {
        return x.boundListeners.indexOf(payload.action) > -1;
      }).map(function (x) {
        return x.name;
      }).join(', ');

      payload.dispatchedStores = dispatchedStores;
      this.dispatches.unshift(payload);
      this.snapshots[payload.id] = _AltStore["default"].alt().takeSnapshot();
      this.currentStateId = payload.id;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.dispatches = [];
      this.currentStateId = null;
      this.nextReplayId = null;
      this.snapshots = {};

      _AltStore["default"].alt().recycle();
    }
  }, {
    key: "loadRecording",
    value: function loadRecording(events) {
      this.clear();
      var wasRecording = this.isRecording;
      this.isRecording = true;
      var dispatches = JSON.parse(events);
      dispatches.reverse().forEach(function (dispatch) {
        setTimeout(function () {
          _AltStore["default"].alt().dispatch(dispatch.action, dispatch.data, dispatch.details);
        }, 0);
      });
      this.isRecording = wasRecording;
    }
  }, {
    key: "replay",
    value: function replay() {
      if (!this.isReplaying) return false;
      var dispatch = this.cachedDispatches[this.nextReplayId];
      setTimeout(function () {
        _AltStore["default"].alt().dispatch(dispatch.action, dispatch.data, dispatch.details);
      }, 0);
      this.nextReplayId = this.nextReplayId - 1;

      if (this.nextReplayId >= 0) {
        setTimeout(function () {
          return _DebugActions["default"].replay();
        }, this.replayTime);
      } else {
        this.isReplaying = false;
        this.nextReplayId = null;
      }
    }
  }, {
    key: "revert",
    value: function revert(id) {
      var snapshot = this.snapshots[id];

      if (snapshot) {
        this.currentStateId = id;

        _AltStore["default"].alt().bootstrap(snapshot);
      }
    }
  }, {
    key: "saveRecording",
    value: function saveRecording() {
      /*eslint-disable*/
      console.log(JSON.stringify(this.dispatches));
      /*eslint-enable*/
    }
  }, {
    key: "startReplay",
    value: function startReplay() {
      this.cachedDispatches = this.dispatches.slice();
      this.clear();
      this.nextReplayId = this.cachedDispatches.length - 1;
      this.isReplaying = true;
    }
  }, {
    key: "stopReplay",
    value: function stopReplay() {
      this.cachedDispatches = [];
      this.nextReplayId = null;
      this.isReplaying = false;
    }
  }, {
    key: "togglePauseReplay",
    value: function togglePauseReplay() {
      this.isReplaying = !this.isReplaying;
    }
  }, {
    key: "toggleRecording",
    value: function toggleRecording() {
      this.isRecording = !this.isRecording;
    }
  }]);
  return _class;
}(), _class.displayName = 'DispatcherStore', _class.config = {
  getState: function getState(state) {
    return {
      currentStateId: state.currentStateId,
      dispatches: state.dispatches,
      inReplayMode: state.nextReplayId !== null,
      isRecording: state.isRecording,
      isReplaying: state.isReplaying,
      mtime: state.mtime
    };
  }
}, _temp));

exports["default"] = _default;
module.exports = exports.default;