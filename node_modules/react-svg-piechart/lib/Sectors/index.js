"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Sector = _interopRequireDefault(require("../Sector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Sectors = function Sectors(_ref) {
  var center = _ref.center,
      data = _ref.data,
      onSectorHover = _ref.onSectorHover,
      expandSize = _ref.expandSize,
      strokeWidth = _ref.strokeWidth,
      strokeColor = _ref.strokeColor,
      startAngle = _ref.startAngle,
      angleMargin = _ref.angleMargin,
      props = _objectWithoutPropertiesLoose(_ref, ["center", "data", "onSectorHover", "expandSize", "strokeWidth", "strokeColor", "startAngle", "angleMargin"]);

  var total = data.reduce(function (prev, current) {
    return current.value + prev;
  }, 0);
  var angleStart = startAngle;
  var angleEnd = startAngle;
  return total > 0 ? /*#__PURE__*/_react["default"].createElement("g", null, data.map(function (d, i) {
    var isLarge = d.value / total > 0.5;
    var angle = 360 * d.value / total;
    var radius = center + (d.expanded ? expandSize : 0) - strokeWidth / 2;
    angleStart = angleEnd;
    angleMargin = angleMargin > angle ? angle : angleMargin;
    angleEnd = angleStart + angle - angleMargin;
    var x1 = center + radius * Math.cos(Math.PI * angleStart / 180);
    var y1 = center + radius * Math.sin(Math.PI * angleStart / 180);
    var x2 = center + radius * Math.cos(Math.PI * angleEnd / 180);
    var y2 = center + radius * Math.sin(Math.PI * angleEnd / 180);
    var path = "\n          M" + center + "," + center + "\n          L" + x1 + "," + y1 + "\n          A" + radius + "," + radius + "\n          0 " + (isLarge ? 1 : 0) + ",1\n          " + x2 + "," + y2 + "\n          z\n        ";
    angleEnd += angleMargin;
    return /*#__PURE__*/_react["default"].createElement(_Sector["default"], _extends({
      key: "sector" + i,
      fill: d.color,
      path: path,
      href: d.href,
      strokeColor: strokeColor,
      strokeWidth: strokeWidth,
      total: total,
      onMouseEnter: function onMouseEnter(e) {
        return onSectorHover(d, i, e);
      },
      onMouseLeave: function onMouseLeave(e) {
        return onSectorHover(null, null, e);
      },
      onTouchEnd: function onTouchEnd(e) {
        return onSectorHover(null, null, e);
      },
      onTouchStart: function onTouchStart(e) {
        return onSectorHover(d, i, e);
      }
    }, props, d));
  })) : null;
};

Sectors.propTypes = process.env.NODE_ENV !== "production" ? {
  center: _propTypes["default"].number.isRequired,
  data: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    color: _propTypes["default"].string.isRequired,
    title: _propTypes["default"].string,
    value: _propTypes["default"].number.isRequired
  })).isRequired,
  onSectorHover: _propTypes["default"].func,
  expandSize: _propTypes["default"].number,
  strokeColor: _Sector["default"].propTypes.strokeColor,
  strokeWidth: _Sector["default"].propTypes.strokeWidth,
  startAngle: _propTypes["default"].number,
  angleMargin: _propTypes["default"].number
} : {};
Sectors.defaultProps = {
  expandSize: 5
};
var _default = Sectors;
exports["default"] = _default;
module.exports = exports.default;