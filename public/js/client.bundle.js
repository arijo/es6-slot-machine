/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _game = __webpack_require__(1);

	var _game2 = _interopRequireDefault(_game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var el = document.getElementById('game');
	new _game2.default(el, {});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _model = __webpack_require__(2);

	var _model2 = _interopRequireDefault(_model);

	var _template = __webpack_require__(4);

	var _template2 = _interopRequireDefault(_template);

	var _game = __webpack_require__(5);

	var _game2 = _interopRequireDefault(_game);

	var _header = __webpack_require__(6);

	var _header2 = _interopRequireDefault(_header);

	var _content = __webpack_require__(7);

	var _content2 = _interopRequireDefault(_content);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	  function Game(el, options) {
	    var _this = this;

	    _classCallCheck(this, Game);

	    this.el = el;
	    this.el.innerHTML = (0, _template2.default)(_game2.default).render();

	    this.headerEl = this.el.querySelector('header');
	    this.contentEl = this.el.querySelector('.content');
	    this.goBtnEl = this.el.querySelector('.go');
	    this.goBtnEl.addEventListener('click', function (ev) {
	      return _this.go();
	    }, false);

	    this.outcomes = new _model2.default({
	      findAll: 'GET /outcomes'
	    });
	    this.outcomes.on('load', function (ev, outcomes) {
	      return _this.update(outcomes);
	    });
	  }

	  _createClass(Game, [{
	    key: 'update',
	    value: function update(outcomes) {
	      if (outcomes.bonus) {
	        this.outcomes.findAll({ win: outcomes.win });
	      }
	      this._update(outcomes);
	    }
	  }, {
	    key: '_update',
	    value: function _update(outcomes) {
	      this.headerEl.innerHTML = (0, _template2.default)(_header2.default).render(outcomes);
	      this.contentEl.innerHTML = (0, _template2.default)(_content2.default).render(outcomes);
	    }
	  }, {
	    key: 'go',
	    value: function go() {
	      this.outcomes.findAll();
	    }
	  }]);

	  return Game;
	}();

		exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _event = __webpack_require__(3);

	var _event2 = _interopRequireDefault(_event);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = function (_EventEmitter) {
	  _inherits(Model, _EventEmitter);

	  function Model(options) {
	    _classCallCheck(this, Model);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Model).call(this, options));

	    var parts = options.findAll.split(' ');
	    _this.method = parts[0];
	    _this.url = parts[1];
	    _this.transport = options.transport || XMLHttpRequest;
	    return _this;
	  }

	  _createClass(Model, [{
	    key: 'findAll',
	    value: function findAll(params) {
	      var _this2 = this;

	      var req = new this.transport();
	      req.onreadystatechange = function () {
	        return _this2._onreadystatechange(req);
	      };
	      req.open(this.method, this.url + (params ? '?win=' + params.win : ''));
	      req.send();
	    }
	  }, {
	    key: '_onreadystatechange',
	    value: function _onreadystatechange(req) {
	      // TODO: HANDLE NETWORK AND PARSING ERRORS
	      if (req.readyState === XMLHttpRequest.DONE) {
	        if (req.status === 200) {
	          this.emit('load', JSON.parse(req.responseText));
	        }
	      }
	    }
	  }]);

	  return Model;
	}(_event2.default);

		exports.default = Model;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventEmitter = function () {
	  function EventEmitter() {
	    _classCallCheck(this, EventEmitter);

	    this.events = {};
	  }

	  _createClass(EventEmitter, [{
	    key: "on",
	    value: function on(ev, handler) {
	      var handlers = this.events[ev];
	      if (!handlers) {
	        return this.events[ev] = [handler];
	      }
	      this.events[ev].push(handler);
	    }
	  }, {
	    key: "emit",
	    value: function emit(ev, data) {
	      var handlers = this.events[ev];
	      if (!handlers) return;
	      handlers.forEach(function (handler) {
	        handler(ev, data);
	      });
	    }
	  }]);

	  return EventEmitter;
	}();

		exports.default = EventEmitter;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function template(html) {
	  var re = /<%(.*)%>/g,
	      reExp = /(^\s*(if|for|else|switch|case|break|{|})).*/g,
	      code = 'var r=[];\n',
	      cursor = 0,
	      match = void 0;
	  var add = function add(line, js) {
	    js ? code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n' : code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"').replace(/\n/g, '') + '");\n' : '';
	    return add;
	  };
	  while (match = re.exec(html)) {
	    add(html.slice(cursor, match.index))(match[1], true);
	    cursor = match.index + match[0].length;
	  }
	  add(html.substr(cursor, html.length - cursor));
	  code += 'return r.join("");';
	  return {
	    render: function render(ctx) {
	      return new Function(code).apply(ctx);
	    }
	  };
	}

	exports.default = template;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var gameHTML = "\n  <header><h1>The Slot Machine</h1></header>\n  <div class='content'><h1>Hit GO! to Start Playing the Game!</h1></div>\n  <footer><button class='go'>GO!</button></footer>\n";

		exports.default = gameHTML;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var headerHTML = "\n  <h1 class='default'><% this.message.default %></h1>\n  <%if(this.message.bonus) { %>\n    <h1 class='bonus'><% this.message.bonus %></h1>\n  <% } %>\n";

		exports.default = headerHTML;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var contentHTML = "\n  <ul class='symbols'>\n  <% for(var i=0; i<this.symbols.length; i++) { %>\n    <li class='symbol'><img src='/img/<% this.symbols[i] %>' /></li>\n  <% } %>\n  </ul>\n";

		exports.default = contentHTML;

/***/ }
/******/ ]);
//# sourceMappingURL=client.bundle.js.map