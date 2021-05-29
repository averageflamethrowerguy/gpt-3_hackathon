function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "react";
import PropTypes from "prop-types";
import Circle from "./Circle";
import Sectors from "./Sectors";
import Sector from "./Sector";

var PieChart = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(PieChart, _React$Component);

  function PieChart() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      expandedIndex: null
    });

    _defineProperty(_assertThisInitialized(_this), "handleSectorHover", function (data, index, e) {
      var _this$props = _this.props,
          expandOnHover = _this$props.expandOnHover,
          onSectorHover = _this$props.onSectorHover;

      if (expandOnHover) {
        _this.setState({
          expandedIndex: index
        });
      }

      if (onSectorHover) {
        onSectorHover(data, index, e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "shouldExpand", function () {
      var _this$props2 = _this.props,
          data = _this$props2.data,
          expandOnHover = _this$props2.expandOnHover;
      var oneDataIsExpanded = data.some(function (d) {
        return d.expanded;
      });
      return oneDataIsExpanded || expandOnHover;
    });

    return _this;
  }

  PieChart.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    if (nextProps.expandedIndex >= 0) {
      return {
        expandedIndex: nextProps.expandedIndex
      };
    } else {
      return null;
    }
  };

  var _proto = PieChart.prototype;

  _proto.renderSingleData = function renderSingleData(d, center) {
    var _this2 = this;

    var expandedIndex = this.state.expandedIndex;
    var _this$props3 = this.props,
        expandOnHover = _this$props3.expandOnHover,
        expandSize = _this$props3.expandSize;
    return /*#__PURE__*/React.createElement(Circle, _extends({
      center: center,
      radius: center + (d.expanded || expandOnHover && expandedIndex === 0 ? expandSize : 0),
      onMouseEnter: function onMouseEnter(e) {
        return _this2.handleSectorHover(d, 0, e);
      },
      onMouseLeave: function onMouseLeave(e) {
        return _this2.handleSectorHover(null, null, e);
      },
      onTouchEnd: function onTouchEnd(e) {
        return _this2.handleSectorHover(null, null, e);
      },
      onTouchStart: function onTouchStart(e) {
        return _this2.handleSectorHover(d, 0, e);
      }
    }, d));
  };

  _proto.renderMultipleData = function renderMultipleData(center) {
    var expandedIndex = this.state.expandedIndex;

    var _this$props4 = this.props,
        data = _this$props4.data,
        expandOnHover = _this$props4.expandOnHover,
        props = _objectWithoutPropertiesLoose(_this$props4, ["data", "expandOnHover"]);

    return /*#__PURE__*/React.createElement(Sectors, _extends({
      center: center,
      data: expandOnHover ? data.map(function (d, i) {
        return _extends({}, d, {
          expanded: i === expandedIndex
        });
      }) : data
    }, props, {
      onSectorHover: this.handleSectorHover
    }));
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        data = _this$props5.data,
        expandSize = _this$props5.expandSize,
        viewBoxSize = _this$props5.viewBoxSize;
    var center = viewBoxSize / 2;
    var offset = this.shouldExpand() ? expandSize : 0;
    var dataWithValue = data.filter(function (d) {
      return d.value > 0;
    });
    return dataWithValue && dataWithValue.length > 0 ? /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 " + (viewBoxSize + offset * 2) + " " + (viewBoxSize + offset * 2)
    }, /*#__PURE__*/React.createElement("g", {
      transform: "translate(" + offset + ", " + offset + ")"
    }, dataWithValue.length === 1 ? this.renderSingleData(dataWithValue[0], center) : this.renderMultipleData(center))) : null;
  };

  return PieChart;
}(React.Component);

PieChart.propTypes = process.env.NODE_ENV !== "production" ? {
  data: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    title: PropTypes.string,
    value: PropTypes.number.isRequired,
    href: PropTypes.string
  })).isRequired,
  expandOnHover: PropTypes.bool,
  expandSize: PropTypes.number,
  expandedIndex: PropTypes.number,
  onSectorHover: PropTypes.func,
  strokeColor: Sector.propTypes.strokeColor,
  strokeLinejoin: Sector.propTypes.strokeLinejoin,
  strokeWidth: Sector.propTypes.strokeWidth,
  startAngle: PropTypes.number,
  angleMargin: PropTypes.number,
  viewBoxSize: PropTypes.number,
  transitionDuration: Sector.propTypes.transitionDuration,
  transitionTimingFunction: Sector.propTypes.transitionTimingFunction
} : {};
PieChart.defaultProps = {
  data: [],
  expandOnHover: false,
  expandSize: Sectors.defaultProps.expandSize,
  expandedIndex: -1,
  onSectorHover: null,
  shrinkOnTouchEnd: false,
  strokeColor: Sector.defaultProps.strokeColor,
  strokeLinejoin: Sector.defaultProps.strokeLinejoin,
  strokeWidth: Sector.defaultProps.strokeWidth,
  startAngle: 0,
  angleMargin: 0,
  viewBoxSize: 100,
  transitionDuration: Sector.defaultProps.transitionDuration,
  transitionTimingFunction: Sector.defaultProps.transitionTimingFunction
};
export default PieChart;