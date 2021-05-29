"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Sector = function Sector(_ref) {
  var fill = _ref.fill,
      strokeColor = _ref.strokeColor,
      strokeLinejoin = _ref.strokeLinejoin,
      strokeWidth = _ref.strokeWidth,
      onTouchStart = _ref.onTouchStart,
      onTouchEnd = _ref.onTouchEnd,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      path = _ref.path,
      title = _ref.title,
      href = _ref.href,
      transitionDuration = _ref.transitionDuration,
      transitionTimingFunction = _ref.transitionTimingFunction;
  var result;

  var content = /*#__PURE__*/_react["default"].createElement("path", {
    d: path,
    fill: fill,
    stroke: strokeColor,
    strokeWidth: strokeWidth,
    strokeLinejoin: strokeLinejoin,
    onTouchStart: onTouchStart,
    onTouchEnd: onTouchEnd,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    style: {
      transitionProperty: "all",
      transitionTimingFunction: transitionTimingFunction,
      transitionDuration: transitionDuration
    }
  }, title && /*#__PURE__*/_react["default"].createElement("title", null, title));

  if (href) {
    result = /*#__PURE__*/_react["default"].createElement("a", {
      href: href
    }, content);
  } else {
    result = content;
  }

  return result;
};

Sector.propTypes = process.env.NODE_ENV !== "production" ? {
  fill: _propTypes["default"].string.isRequired,
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  onTouchEnd: _propTypes["default"].func,
  onTouchStart: _propTypes["default"].func,
  path: _propTypes["default"].string.isRequired,
  strokeColor: _propTypes["default"].string,
  strokeLinejoin: _propTypes["default"].string,
  strokeWidth: _propTypes["default"].number,
  title: _propTypes["default"].string,
  href: _propTypes["default"].string,
  transitionDuration: _propTypes["default"].string,
  transitionTimingFunction: _propTypes["default"].string
} : {};
Sector.defaultProps = {
  strokeColor: "#fff",
  strokeWidth: 1,
  strokeLinejoin: "round",
  title: null,
  href: null,
  transitionDuration: "0s",
  transitionTimingFunction: "ease-out"
};
var _default = Sector;
exports["default"] = _default;
module.exports = exports.default;