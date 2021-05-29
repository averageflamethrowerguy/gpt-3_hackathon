"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Sector = _interopRequireDefault(require("../Sector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Circle = function Circle(_ref) {
  var center = _ref.center,
      color = _ref.color,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      onTouchEnd = _ref.onTouchEnd,
      onTouchStart = _ref.onTouchStart,
      radius = _ref.radius,
      strokeColor = _ref.strokeColor,
      strokeWidth = _ref.strokeWidth,
      title = _ref.title;
  return /*#__PURE__*/_react["default"].createElement("ellipse", {
    cx: center,
    cy: center,
    fill: color,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onTouchEnd: onTouchEnd,
    onTouchStart: onTouchStart,
    rx: radius,
    ry: radius,
    stroke: strokeColor,
    strokeWidth: strokeWidth
  }, title && /*#__PURE__*/_react["default"].createElement("title", null, title));
};

Circle.propTypes = process.env.NODE_ENV !== "production" ? {
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  onTouchEnd: _propTypes["default"].func,
  onTouchStart: _propTypes["default"].func,
  center: _propTypes["default"].number.isRequired,
  color: _propTypes["default"].string.isRequired,
  radius: _propTypes["default"].number.isRequired,
  strokeColor: _propTypes["default"].string,
  strokeWidth: _propTypes["default"].number,
  title: _propTypes["default"].string
} : {};
Circle.defaultProps = {
  strokeColor: _Sector["default"].defaultProps.strokeColor,
  strokeWidth: _Sector["default"].defaultProps.strokeWidth
};
var _default = Circle;
exports["default"] = _default;
module.exports = exports.default;