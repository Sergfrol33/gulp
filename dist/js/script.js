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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/block/contacts.js":
/*!**********************************!*\
  !*** ./src/js/block/contacts.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener('DOMContentLoaded', function () {
  var submitButton = document.querySelector('.contacts__submit');
  var form = document.querySelector('form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
  });

  var initMap = function initMap() {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    new ymaps.Map('map', {
      // При инициализации карты обязательно нужно указать
      // её центр и коэффициент масштабирования.
      center: [55.76, 37.64],
      // Москва
      zoom: 10
    }, {
      searchControlProvider: 'yandex#search'
    });
  };

  ymaps.ready(initMap);
});

/***/ }),

/***/ "./src/js/block/main-block.js":
/*!************************************!*\
  !*** ./src/js/block/main-block.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.addEventListener('DOMContentLoaded', function () {
  var links = document.querySelectorAll('.landing__link');
  var contentBlock = document.querySelectorAll('.landing__content');

  var Content = /*#__PURE__*/function () {
    function Content(links, content, time) {
      _classCallCheck(this, Content);

      this.links = links;
      this.content = content;
      this.time = time || 300;
    }

    _createClass(Content, [{
      key: "init",
      value: function init() {
        var _this = this;

        this.links.forEach(function (link) {
          link.addEventListener('click', function (e) {
            _this.links.forEach(function (i) {
              return i.classList.remove('landing__link--active');
            });

            link.classList.toggle('landing__link--active');

            _this.content.forEach(function (i) {
              i.classList.remove('landing__content--active');
              i.classList.remove('landing__content--opacity');
            });

            _this.switchContent(e.currentTarget.id);
          });
        });
      }
    }, {
      key: "switchContent",
      value: function switchContent(id) {
        var _this2 = this;

        switch (id) {
          case this.links[0].id:
            this.content[0].classList.add('landing__content--active');
            setTimeout(function () {
              _this2.content[0].classList.add('landing__content--opacity');
            }, this.time);
            break;

          case this.links[1].id:
            this.content[1].classList.add('landing__content--active');
            setTimeout(function () {
              _this2.content[1].classList.add('landing__content--opacity');
            }, this.time);
            break;

          case this.links[2].id:
            this.content[2].classList.add('landing__content--active');
            setTimeout(function () {
              _this2.content[2].classList.add('landing__content--opacity');
            }, this.time);
            break;

          case this.links[3].id:
            this.content[3].classList.add('landing__content--active');
            setTimeout(function () {
              _this2.content[3].classList.add('landing__content--opacity');
            }, this.time);
            break;

          default:
            return;
        }
      }
    }]);

    return Content;
  }();
  /* parameters = {
       links: this.links,
       content: this.content,
       time: this.time
   }
   this.config = parameters*/


  var content = new Content(links, contentBlock);
  content.init();
});

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block_main_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block/main-block */ "./src/js/block/main-block.js");
/* harmony import */ var _block_main_block__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_block_main_block__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_contacts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block/contacts */ "./src/js/block/contacts.js");
/* harmony import */ var _block_contacts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_block_contacts__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),

/***/ 0:
/*!****************************************************************************************!*\
  !*** multi ./src/js/script.js ./src/js/block/contacts.js ./src/js/block/main-block.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\projects\layout\src\js\script.js */"./src/js/script.js");
__webpack_require__(/*! C:\projects\layout\src\js\block\contacts.js */"./src/js/block/contacts.js");
module.exports = __webpack_require__(/*! C:\projects\layout\src\js\block\main-block.js */"./src/js/block/main-block.js");


/***/ })

/******/ });