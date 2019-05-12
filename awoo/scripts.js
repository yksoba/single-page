/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/awoo-display.tsx":
/*!******************************!*\
  !*** ./src/awoo-display.tsx ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const scrolling_container_1 = __webpack_require__(/*! ./scrolling-container */ "./src/scrolling-container.tsx");
class AwooDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'awoo'
        };
    }
    getIntensity() {
        return this.props.intensity === undefined ? 0 : this.props.intensity;
    }
    getFontSize() {
        return `${this.getIntensity() * 10 + 5}vh`;
    }
    getNextSymbol(text) {
        let intensity = this.getIntensity();
        let markov = {
            'a': [['w', 1]],
            'w': [['oo', .95], ['w', 0.5]],
            'o': [['o', 0.6 * intensity + 0.2], ['w', 0.05], ['.', 1 - intensity], ['\xa0', 1]],
            '.': [['.', 0.8 * (1 - intensity)], ['\xa0', 1]],
            '\xa0': [['a', 0.025 + intensity * .95], ['w', 0.05 + intensity * .5], ['\xa0', 1]]
        };
        let last = text[text.length - 1];
        let uppercase = false;
        if (intensity > 0.3) {
            if (last == 'a' || last == 'w' || last == 'o') {
                uppercase = Math.random() < intensity * 1.5 - 0.5;
            }
            else {
                uppercase = Math.random() < intensity;
            }
        }
        let x = Math.random();
        let q = 0;
        for (let item of markov[last.toLowerCase()]) {
            q += item[1];
            if (x <= q) {
                return uppercase ? item[0].toUpperCase() : item[0];
            }
        }
    }
    tick() {
        this.setState((currentState) => {
            return { text: currentState.text + this.getNextSymbol(currentState.text) };
        });
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 100);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.intensity != this.props.intensity)
            this.scrollingContainer.snap();
    }
    render() {
        return (React.createElement("div", { id: "awoo-display", style: { backgroundColor: `rgba(145,124,118,${this.getIntensity()})` } },
            React.createElement(scrolling_container_1.ScrollingContainer, { ref: (elm) => this.scrollingContainer = elm },
                React.createElement("div", { className: "soft-awoo", style: { fontSize: this.getFontSize() } }, this.state.text))));
    }
}
exports.AwooDisplay = AwooDisplay;


/***/ }),

/***/ "./src/awoo-meter.tsx":
/*!****************************!*\
  !*** ./src/awoo-meter.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
class AwooMeter extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(event) {
        if (this.props.onInput) {
            let intensity = parseFloat(event.currentTarget.value);
            this.props.onInput(intensity);
        }
    }
    render() {
        return (React.createElement("div", { id: "awoo-meter" },
            React.createElement("h2", null, "Awoo Meter"),
            React.createElement("div", { id: "awoo-meter-slider-container" },
                React.createElement("span", null, "Less awoo"),
                React.createElement("input", { id: "awoo-meter-slider", type: "range", min: "0", max: "1", step: "0.01", defaultValue: "0", onInput: this.handleInput }),
                React.createElement("span", null, "More awoo"))));
    }
}
exports.AwooMeter = AwooMeter;


/***/ }),

/***/ "./src/awoo.tsx":
/*!**********************!*\
  !*** ./src/awoo.tsx ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const awoo_display_1 = __webpack_require__(/*! ./awoo-display */ "./src/awoo-display.tsx");
const awoo_meter_1 = __webpack_require__(/*! ./awoo-meter */ "./src/awoo-meter.tsx");
class Awoo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intensity: 0
        };
        this.onAwooMeterInput = this.onAwooMeterInput.bind(this);
    }
    onAwooMeterInput(intensity) {
        this.setState(() => {
            return { intensity: intensity };
        });
    }
    render() {
        return [
            React.createElement(awoo_display_1.AwooDisplay, { intensity: this.state.intensity, key: "AwooDisplay" }),
            React.createElement(awoo_meter_1.AwooMeter, { onInput: this.onAwooMeterInput, key: "AwooMeter" })
        ];
    }
}
exports.Awoo = Awoo;


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
const awoo_1 = __webpack_require__(/*! ./awoo */ "./src/awoo.tsx");
ReactDOM.render(React.createElement(awoo_1.Awoo, null), document.getElementById('awoo-root'));


/***/ }),

/***/ "./src/scrolling-container.tsx":
/*!*************************************!*\
  !*** ./src/scrolling-container.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
class ScrollingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xoffset: 0
        };
        this.mounted = false;
        window.addEventListener('resize', () => this.snap());
    }
    animate() {
        if (this.mounted) {
            this.setState((currentState) => {
                let width = this.container.clientWidth;
                let alpha = 0.1;
                let xoffset = currentState.xoffset * (1 - alpha) + alpha * width;
                requestAnimationFrame(() => this.animate());
                return {
                    xoffset: xoffset
                };
            });
        }
    }
    componentDidMount() {
        this.mounted = true;
        this.animate();
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    render() {
        return (React.createElement("div", { className: "scrolling-container", ref: (elm) => this.container = elm, style: { left: `calc(100vw - ${this.state.xoffset}px)` } }, this.props.children));
    }
    /**
     * Instantly scrolls all the way to the right
     */
    snap() {
        this.setState(() => {
            return { xoffset: this.container.clientWidth };
        });
    }
}
exports.ScrollingContainer = ScrollingContainer;


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=scripts.js.map