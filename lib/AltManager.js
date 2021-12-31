"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * AltManager(Alt: AltClass): undefined
 *
 * > AltManager Util
 *
 * AltManager util allows for a developer to create multiple alt instances in
 * their app. This is useful for building apps that encapsulates an alt instance
 * inside of a outer parent. Popular examples include HipMunk flight search or
 * Google Spreadsheets's multiple sheet tabs. This also allows for caching of
 * client side instance if you need to store a new copy of an alt for each
 * action.
 *
 * Usage:
 *
 * ```js
 * var Alt = require('alt'); // Alt class, not alt instance
 * var altManager = new AltManager(Alt);
 *
 * var altInstance = altManager.create('uniqueKeyName');
 * altInstance.createAction(SomeAction);
 * var someOtherOtherAlt = altManager.create('anotherKeyName');
 * altManager.delete('uniqueKeyName');
 *
 * ```
 */
var AltManager = /*#__PURE__*/function () {
  function AltManager(Alt) {
    (0, _classCallCheck2["default"])(this, AltManager);
    this.Alt = Alt;
    this.alts = {};
  }

  (0, _createClass2["default"])(AltManager, [{
    key: "create",
    value: function create(altKey) {
      if (this.get(altKey)) {
        throw new ReferenceError("Alt key ".concat(altKey, " already exists"));
      }

      if (typeof altKey !== 'string') {
        throw new TypeError('altKey must be a string');
      }

      this.alts[altKey] = new this.Alt();
      return this.alts[altKey];
    }
  }, {
    key: "get",
    value: function get(altKey) {
      return this.alts[altKey];
    } // returns all alt instances

  }, {
    key: "all",
    value: function all() {
      return this.alts;
    }
  }, {
    key: "findWhere",
    value: function findWhere(regex) {
      var results = {};

      for (var i in this.alts) {
        if (regex.exec(i) === null) {
          continue;
        }

        results[i] = this.alts[i];
      }

      return results;
    }
  }, {
    key: "delete",
    value: function _delete(altKey) {
      if (!this.get(altKey)) {
        return false;
      }

      delete this.alts[altKey];
      return true;
    }
  }, {
    key: "getOrCreate",
    value: function getOrCreate(altKey) {
      var alt = this.get(altKey);

      if (alt) {
        return alt;
      }

      return this.create(altKey);
    }
  }]);
  return AltManager;
}();

exports["default"] = AltManager;
module.exports = exports.default;