function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import PropTypes from "prop-types";
import React from "react";
import Sector from "../Sector";

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
  return total > 0 ? /*#__PURE__*/React.createElement("g", null, data.map(function (d, i) {
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
    return /*#__PURE__*/React.createElement(Sector, _extends({
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
  center: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    title: PropTypes.string,
    value: PropTypes.number.isRequired
  })).isRequired,
  onSectorHover: PropTypes.func,
  expandSize: PropTypes.number,
  strokeColor: Sector.propTypes.strokeColor,
  strokeWidth: Sector.propTypes.strokeWidth,
  startAngle: PropTypes.number,
  angleMargin: PropTypes.number
} : {};
Sectors.defaultProps = {
  expandSize: 5
};
export default Sectors;