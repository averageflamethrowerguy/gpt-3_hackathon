/*!
 * react-svg-piechart v2.4.2 - https://github.com/xuopled/react-svg-piechart#readme
 * MIT Licensed
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types", "react"], factory);
	else if(typeof exports === 'object')
		exports["ReactSvgPiechart"] = factory(require("prop-types"), require("react"));
	else
		root["ReactSvgPiechart"] = factory(root["PropTypes"], root["React"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}
var external_root_React_commonjs2_react_commonjs_react_amd_react_ = __webpack_require__(1);
var external_root_React_commonjs2_react_commonjs_react_amd_react_default = /*#__PURE__*/__webpack_require__.n(external_root_React_commonjs2_react_commonjs_react_amd_react_);

// EXTERNAL MODULE: external {"root":"PropTypes","commonjs2":"prop-types","commonjs":"prop-types","amd":"prop-types"}
var external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_ = __webpack_require__(0);
var external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_);

// CONCATENATED MODULE: ./src/Sector/index.js



var Sector_Sector = function Sector(_ref) {
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
  var content = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("path", {
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
  }, title && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("title", null, title));

  if (href) {
    result = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("a", {
      href: href
    }, content);
  } else {
    result = content;
  }

  return result;
};

Sector_Sector.propTypes = {
  fill: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string.isRequired,
  onMouseEnter: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.func,
  onMouseLeave: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.func,
  onTouchEnd: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.func,
  onTouchStart: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.func,
  path: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string.isRequired,
  strokeColor: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string,
  strokeLinejoin: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string,
  strokeWidth: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.number,
  title: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string,
  href: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string,
  transitionDuration: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string,
  transitionTimingFunction: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string
};
Sector_Sector.defaultProps = {
  strokeColor: "#fff",
  strokeWidth: 1,
  strokeLinejoin: "round",
  title: null,
  href: null,
  transitionDuration: "0s",
  transitionTimingFunction: "ease-out"
};
/* harmony default export */ var src_Sector = (Sector_Sector);
// CONCATENATED MODULE: ./src/Circle/index.js




var Circle_Circle = function Circle(_ref) {
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
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("ellipse", {
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
  }, title && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("title", null, title));
};

Circle_Circle.propTypes = {
  onMouseEnter: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.func,
  onMouseLeave: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.func,
  onTouchEnd: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.func,
  onTouchStart: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.func,
  center: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.number.isRequired,
  color: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string.isRequired,
  radius: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.number.isRequired,
  strokeColor: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string,
  strokeWidth: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.number,
  title: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string
};
Circle_Circle.defaultProps = {
  strokeColor: src_Sector.defaultProps.strokeColor,
  strokeWidth: src_Sector.defaultProps.strokeWidth
};
/* harmony default export */ var src_Circle = (Circle_Circle);
// CONCATENATED MODULE: ./src/Sectors/index.js
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var Sectors_Sectors = function Sectors(_ref) {
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
  return total > 0 ? /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("g", null, data.map(function (d, i) {
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
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(src_Sector, _extends({
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

Sectors_Sectors.propTypes = {
  center: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.number.isRequired,
  data: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.arrayOf(external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.shape({
    color: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string.isRequired,
    title: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string,
    value: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.number.isRequired
  })).isRequired,
  onSectorHover: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.func,
  expandSize: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.number,
  strokeColor: src_Sector.propTypes.strokeColor,
  strokeWidth: src_Sector.propTypes.strokeWidth,
  startAngle: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.number,
  angleMargin: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.number
};
Sectors_Sectors.defaultProps = {
  expandSize: 5
};
/* harmony default export */ var src_Sectors = (Sectors_Sectors);
// CONCATENATED MODULE: ./src/index.js
function src_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function src_extends() { src_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return src_extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var src_PieChart = /*#__PURE__*/function (_React$Component) {
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
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(src_Circle, src_extends({
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
        props = src_objectWithoutPropertiesLoose(_this$props4, ["data", "expandOnHover"]);

    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(src_Sectors, src_extends({
      center: center,
      data: expandOnHover ? data.map(function (d, i) {
        return src_extends({}, d, {
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
    return dataWithValue && dataWithValue.length > 0 ? /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("svg", {
      viewBox: "0 0 " + (viewBoxSize + offset * 2) + " " + (viewBoxSize + offset * 2)
    }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("g", {
      transform: "translate(" + offset + ", " + offset + ")"
    }, dataWithValue.length === 1 ? this.renderSingleData(dataWithValue[0], center) : this.renderMultipleData(center))) : null;
  };

  return PieChart;
}(external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.Component);

src_PieChart.propTypes = {
  data: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.arrayOf(external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.shape({
    color: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string.isRequired,
    title: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string,
    value: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.number.isRequired,
    href: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.string
  })).isRequired,
  expandOnHover: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.bool,
  expandSize: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.number,
  expandedIndex: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.number,
  onSectorHover: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.func,
  strokeColor: src_Sector.propTypes.strokeColor,
  strokeLinejoin: src_Sector.propTypes.strokeLinejoin,
  strokeWidth: src_Sector.propTypes.strokeWidth,
  startAngle: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.number,
  angleMargin: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.number,
  viewBoxSize: external_root_PropTypes_commonjs2_prop_types_commonjs_prop_types_amd_prop_types_default.a.number,
  transitionDuration: src_Sector.propTypes.transitionDuration,
  transitionTimingFunction: src_Sector.propTypes.transitionTimingFunction
};
src_PieChart.defaultProps = {
  data: [],
  expandOnHover: false,
  expandSize: src_Sectors.defaultProps.expandSize,
  expandedIndex: -1,
  onSectorHover: null,
  shrinkOnTouchEnd: false,
  strokeColor: src_Sector.defaultProps.strokeColor,
  strokeLinejoin: src_Sector.defaultProps.strokeLinejoin,
  strokeWidth: src_Sector.defaultProps.strokeWidth,
  startAngle: 0,
  angleMargin: 0,
  viewBoxSize: 100,
  transitionDuration: src_Sector.defaultProps.transitionDuration,
  transitionTimingFunction: src_Sector.defaultProps.transitionTimingFunction
};
/* harmony default export */ var src = __webpack_exports__["default"] = (src_PieChart);

/***/ })
/******/ ])["default"];
});