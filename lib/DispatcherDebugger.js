"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _fixedDataTable = require("fixed-data-table");

var _makeFinalStore = _interopRequireDefault(require("./makeFinalStore"));

var _connectToStores = _interopRequireDefault(require("./connectToStores"));

var _FixedDataTableCss = _interopRequireDefault(require("./debug/FixedDataTableCss"));

var _DebugActions = _interopRequireDefault(require("./debug/DebugActions"));

var _DispatcherStore = _interopRequireDefault(require("./debug/DispatcherStore"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var DispatcherDebugger = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(DispatcherDebugger, _React$Component);

  var _super = _createSuper(DispatcherDebugger);

  function DispatcherDebugger() {
    var _this;

    (0, _classCallCheck2["default"])(this, DispatcherDebugger);
    _this = _super.call(this);
    _this.getDispatch = _this.getDispatch.bind((0, _assertThisInitialized2["default"])(_this));
    _this.renderName = _this.renderName.bind((0, _assertThisInitialized2["default"])(_this));
    _this.renderReplay = _this.renderReplay.bind((0, _assertThisInitialized2["default"])(_this));
    _this.renderRevert = _this.renderRevert.bind((0, _assertThisInitialized2["default"])(_this));
    _this.view = _this.view.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(DispatcherDebugger, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var finalStore = (0, _makeFinalStore["default"])(this.props.alt);
      finalStore.listen(function (state) {
        return _DebugActions["default"].addDispatch(state.payload);
      });

      _DebugActions["default"].setAlt(this.props.alt);
    }
  }, {
    key: "clear",
    value: function clear() {
      _DebugActions["default"].clear();
    }
  }, {
    key: "getDispatch",
    value: function getDispatch(idx) {
      var dispatch = this.props.dispatches[idx];
      return {
        id: dispatch.id,
        action: dispatch.action,
        data: dispatch.data,
        details: dispatch.details,
        recorded: dispatch.recorded,
        dispatchedStores: dispatch.dispatchedStores,
        mtime: this.props.mtime
      };
    }
  }, {
    key: "loadRecording",
    value: function loadRecording() {
      var json = prompt('Give me a serialized recording');
      if (json) _DebugActions["default"].loadRecording(json);
    }
  }, {
    key: "revert",
    value: function revert(ev) {
      var data = ev.target.dataset;

      _DebugActions["default"].revert(data.dispatchId);
    }
  }, {
    key: "saveRecording",
    value: function saveRecording() {
      _DebugActions["default"].saveRecording();
    }
  }, {
    key: "startReplay",
    value: function startReplay() {
      _DebugActions["default"].startReplay();

      _DebugActions["default"].replay();
    }
  }, {
    key: "stopReplay",
    value: function stopReplay() {
      _DebugActions["default"].stopReplay();
    }
  }, {
    key: "toggleLogDispatches",
    value: function toggleLogDispatches() {
      _DebugActions["default"].toggleLogDispatches();
    }
  }, {
    key: "togglePauseReplay",
    value: function togglePauseReplay() {
      _DebugActions["default"].togglePauseReplay();
    }
  }, {
    key: "toggleRecording",
    value: function toggleRecording() {
      _DebugActions["default"].toggleRecording();
    }
  }, {
    key: "view",
    value: function view(ev) {
      var data = ev.target.dataset;
      var dispatch = this.props.dispatches[data.index];

      _DebugActions["default"].selectData(dispatch);
    }
  }, {
    key: "renderName",
    value: function renderName(name, _, dispatch, idx) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-index": idx,
        onClick: this.view,
        style: {
          cursor: 'pointer'
        }
      }, name);
    }
  }, {
    key: "renderReplay",
    value: function renderReplay() {
      if (this.props.inReplayMode) {
        return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("span", {
          onClick: this.togglePauseReplay
        }, this.props.isReplaying ? 'Pause Replay' : 'Resume Replay'), ' | ', /*#__PURE__*/_react["default"].createElement("span", {
          onClick: this.stopReplay
        }, "Stop Replay"));
      }

      return /*#__PURE__*/_react["default"].createElement("span", {
        onClick: this.startReplay
      }, "Start Replay");
    }
  }, {
    key: "renderRevert",
    value: function renderRevert(a, b, dispatch) {
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
        "data-dispatch-id": dispatch.id,
        onClick: this.revert,
        style: {
          cursor: 'pointer'
        }
      }, "Revert"), /*#__PURE__*/_react["default"].createElement("span", {
        dangerouslySetInnerHTML: {
          __html: this.props.currentStateId === dispatch.id ? '&#10003;' : ''
        }
      }));
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", null, "Dispatches"), /*#__PURE__*/_react["default"].createElement(_FixedDataTableCss["default"], null), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
        onClick: this.toggleRecording
      }, this.props.isRecording ? 'Stop Recording' : 'Record'), ' | ', /*#__PURE__*/_react["default"].createElement("span", {
        onClick: this.clear
      }, "Clear"), ' | ', /*#__PURE__*/_react["default"].createElement("span", {
        onClick: this.saveRecording
      }, "Save"), ' | ', /*#__PURE__*/_react["default"].createElement("span", {
        onClick: this.loadRecording
      }, "Load"), ' | ', this.renderReplay()), /*#__PURE__*/_react["default"].createElement(_fixedDataTable.Table, {
        headerHeight: 30,
        height: 480,
        rowGetter: this.getDispatch,
        rowHeight: 30,
        rowsCount: this.props.dispatches.length,
        width: 320
      }, /*#__PURE__*/_react["default"].createElement(_fixedDataTable.Column, {
        cellRenderer: this.renderName,
        dataKey: "action",
        label: "Name",
        width: 250
      }), /*#__PURE__*/_react["default"].createElement(_fixedDataTable.Column, {
        cellRenderer: this.renderRevert,
        dataKey: "",
        label: "Revert",
        width: 70
      })));
    }
  }]);
  return DispatcherDebugger;
}(_react["default"].Component);

var _default = (0, _connectToStores["default"])({
  getPropsFromStores: function getPropsFromStores() {
    return _DispatcherStore["default"].getState();
  },
  getStores: function getStores() {
    return [_DispatcherStore["default"]];
  }
}, DispatcherDebugger);

exports["default"] = _default;
module.exports = exports.default;