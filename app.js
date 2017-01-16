webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	var platform_browser_dynamic_1 = __webpack_require__(2);
	var core_1 = __webpack_require__(4);
	var app_module_1 = __webpack_require__(24);
	__webpack_require__(78);
	if (process.env.ENV === 'production') {
	    core_1.enableProdMode();
	}
	platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var core_1 = __webpack_require__(4);
	var forms_1 = __webpack_require__(25);
	var platform_browser_1 = __webpack_require__(22);
	var material_1 = __webpack_require__(29);
	var app_component_1 = __webpack_require__(65);
	var src_1 = __webpack_require__(68);
	var AppModule = (function () {
	    function AppModule() {
	    }
	    return AppModule;
	}());
	AppModule = __decorate([
	    core_1.NgModule({
	        imports: [
	            platform_browser_1.BrowserModule,
	            forms_1.FormsModule,
	            material_1.MaterialModule.forRoot(),
	            src_1.MdModule
	        ],
	        declarations: [
	            app_component_1.AppComponent
	        ],
	        bootstrap: [app_component_1.AppComponent]
	    })
	], AppModule);
	exports.AppModule = AppModule;


/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var core_1 = __webpack_require__(4);
	var AppComponent = (function () {
	    function AppComponent() {
	        this.title = 'Angular 2 Markdown Demo!';
	        this.md = "## hello markdown!\n```js\nlet a = 1;\nlet b = 2;\nlet sum = a+b;\nconsole.log(`sum: ${sum}`);\n```";
	        this.options = {
	            omitExtraWLInCodeBlocks: true,
	            noHeaderId: true,
	            prefixHeaderId: true,
	            parseImgDimensions: true,
	            headerLevelStart: 1,
	            literalMidWordUnderscores: true,
	            strikethrough: true,
	            tables: true,
	            tablesHeaderId: true,
	            ghCodeBlocks: true,
	            tasklists: true,
	            smoothLivePreview: true,
	            trimEachLine: 'space'
	        };
	    }
	    AppComponent.prototype.keys = function (obj) {
	        return Object.keys(obj);
	    };
	    AppComponent.prototype.isType = function (value, type) {
	        return typeof value === type;
	    };
	    return AppComponent;
	}());
	AppComponent = __decorate([
	    core_1.Component({
	        selector: 'my-app',
	        template: __webpack_require__(66),
	        styles: [__webpack_require__(67)]
	    })
	], AppComponent);
	exports.AppComponent = AppComponent;


/***/ },

/***/ 66:
/***/ function(module, exports) {

	module.exports = "<md-sidenav-layout fullscreen>\n    <md-sidenav #start>\n        <md-nav-list>\n            <div *ngFor=\"let key of keys(options)\">\n                <md-slide-toggle *ngIf=\"isType(options[key],'boolean')\" class=\"nav-item-center\" md-list-item [(ngModel)]=\"options[key]\">{{key}}\n                </md-slide-toggle>\n                <md-input type=\"number\" *ngIf=\"isType(options[key],'number')\" class=\"nav-item-center\" md-list-item [(ngModel)]=\"options[key]\"\n                    placeholder=\"{{key}}\"></md-input>\n                <md-input type=\"text\" *ngIf=\"isType(options[key],'string')\" class=\"nav-item-center\" md-list-item [(ngModel)]=\"options[key]\"\n                    placeholder=\"{{key}}\"></md-input>\n            </div>\n            <hr/>\n        </md-nav-list>\n        <hr/>\n        <button md-button (click)=\"start.close()\">CLOSE</button>\n    </md-sidenav>\n    <div class=\"page\">\n        <md-toolbar color=\"primary\">\n            <button md-icon-button (click)=\"start.open()\">\n                <md-icon class=\"md-24\">menu</md-icon>\n            </button>\n            <h1 class=\"app-title\">{{title}}</h1>\n        </md-toolbar>\n        <div class=\"content\">\n            <div class=\"left\">\n                <textarea [(ngModel)]=\"md\"></textarea>\n            </div>\n            <div class=\"right\">\n                <md [value]=\"md\" [trimEachLine]=\"options.trimEachLine\" [omitExtraWLInCodeBlocks]=\"options.omitExtraWLInCodeBlocks\"\n                    [noHeaderId]=\"options.noHeaderId\" [prefixHeaderId]=\"options.prefixHeaderId\" [parseImgDimensions]=\"options.parseImgDimensions\"\n                    [headerLevelStart]=\"options.headerLevelStart\" [literalMidWordUnderscores]=\"options.literalMidWordUnderscores\"\n                    [strikethrough]=\"options.strikethrough\" [tables]=\"options.tables\" [tablesHeaderId]=\"options.tablesHeaderId\"\n                    [ghCodeBlocks]=\"options.ghCodeBlocks\" [tasklists]=\"options.tasklists\" [smoothLivePreview]=\"options.smoothLivePreview\"></md>\n            </div>\n        </div>\n    </div>\n</md-sidenav-layout>\n<a href=\"https://github.com/yisraelx/ng2-md\"><img style=\"position: absolute; top: 0; right: 0; border: 0;\" src=\"https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67\"\nalt=\"Fork me on GitHub\" data-canonical-src=\"https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png\">\n</a>";

/***/ },

/***/ 67:
/***/ function(module, exports) {

	module.exports = ".app-title {\n    width: 100%;\n    text-align: center;\n}\n\nmd-sidenav {\n    width: 30%;\n    text-align: center;\n}\n\n.page {\n    height: calc(90%);\n}\n\n.content {\n    display: flex;\n    height: 100%;\n}\n\nmd, textarea {\n    height: 100%;\n    overflow-y: scroll;\n    border: none;\n    padding: 10px;\n}\n\n.left, .right {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    flex: 1;\n    padding: 1rem;\n}"

/***/ },

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var base_converter_class_1 = __webpack_require__(69);
	exports.BaseConverter = base_converter_class_1.BaseConverter;
	var base_converter_options_provider_1 = __webpack_require__(72);
	exports.ConverterOptions = base_converter_options_provider_1.ConverterOptions;
	exports.BaseConverterOptions = base_converter_options_provider_1.BaseConverterOptions;
	var md_converter_provider_1 = __webpack_require__(73);
	exports.MdConverter = md_converter_provider_1.MdConverter;
	var md_directive_1 = __webpack_require__(74);
	exports.MdDirective = md_directive_1.MdDirective;
	var src_directive_1 = __webpack_require__(75);
	exports.SrcDirective = src_directive_1.SrcDirective;
	var md_pipe_1 = __webpack_require__(76);
	exports.MdPipe = md_pipe_1.MdPipe;
	var md_module_1 = __webpack_require__(77);
	exports.MdModule = md_module_1.MdModule;


/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var showdown_1 = __webpack_require__(70);
	var utils_1 = __webpack_require__(71);
	var BaseConverter = (function (_super) {
	    __extends(BaseConverter, _super);
	    function BaseConverter(options) {
	        var _this = _super.call(this, options) || this;
	        // override makeHtml method (define in super constructor)
	        var makeHtml = _this.makeHtml;
	        _this.makeHtml = function (text) {
	            text = _this._preMakeHtml(text);
	            return makeHtml.call(_this, text);
	        };
	        return _this;
	    }
	    BaseConverter.prototype.setOptions = function (options) {
	        var _this = this;
	        if (utils_1.default.isObject(options)) {
	            utils_1.default.forIn(options, function (value, optionKey) {
	                _this.setOption(optionKey, value);
	            });
	        }
	    };
	    /** pre super.makeHtml (situation that not possible to achieve it with subParsers or extensions) */
	    BaseConverter.prototype._preMakeHtml = function (text) {
	        var trimEachLine = this.getOptions().trimEachLine;
	        text = utils_1.default.trimEachLine(text, trimEachLine);
	        return text;
	    };
	    return BaseConverter;
	}(showdown_1.Converter));
	exports.BaseConverter = BaseConverter;


/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;/*! showdown 09-01-2017 */
	(function(){
	/**
	 * Created by Tivie on 13-07-2015.
	 */
	
	function getDefaultOpts(simple) {
	  'use strict';
	
	  var defaultOptions = {
	    omitExtraWLInCodeBlocks: {
	      defaultValue: false,
	      describe: 'Omit the default extra whiteline added to code blocks',
	      type: 'boolean'
	    },
	    noHeaderId: {
	      defaultValue: false,
	      describe: 'Turn on/off generated header id',
	      type: 'boolean'
	    },
	    prefixHeaderId: {
	      defaultValue: false,
	      describe: 'Specify a prefix to generated header ids',
	      type: 'string'
	    },
	    ghCompatibleHeaderId: {
	      defaultValue: false,
	      describe: 'Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)',
	      type: 'boolean'
	    },
	    headerLevelStart: {
	      defaultValue: false,
	      describe: 'The header blocks level start',
	      type: 'integer'
	    },
	    parseImgDimensions: {
	      defaultValue: false,
	      describe: 'Turn on/off image dimension parsing',
	      type: 'boolean'
	    },
	    simplifiedAutoLink: {
	      defaultValue: false,
	      describe: 'Turn on/off GFM autolink style',
	      type: 'boolean'
	    },
	    excludeTrailingPunctuationFromURLs: {
	      defaultValue: false,
	      describe: 'Excludes trailing punctuation from links generated with autoLinking',
	      type: 'boolean'
	    },
	    literalMidWordUnderscores: {
	      defaultValue: false,
	      describe: 'Parse midword underscores as literal underscores',
	      type: 'boolean'
	    },
	    strikethrough: {
	      defaultValue: false,
	      describe: 'Turn on/off strikethrough support',
	      type: 'boolean'
	    },
	    tables: {
	      defaultValue: false,
	      describe: 'Turn on/off tables support',
	      type: 'boolean'
	    },
	    tablesHeaderId: {
	      defaultValue: false,
	      describe: 'Add an id to table headers',
	      type: 'boolean'
	    },
	    ghCodeBlocks: {
	      defaultValue: true,
	      describe: 'Turn on/off GFM fenced code blocks support',
	      type: 'boolean'
	    },
	    tasklists: {
	      defaultValue: false,
	      describe: 'Turn on/off GFM tasklist support',
	      type: 'boolean'
	    },
	    smoothLivePreview: {
	      defaultValue: false,
	      describe: 'Prevents weird effects in live previews due to incomplete input',
	      type: 'boolean'
	    },
	    smartIndentationFix: {
	      defaultValue: false,
	      description: 'Tries to smartly fix indentation in es6 strings',
	      type: 'boolean'
	    },
	    disableForced4SpacesIndentedSublists: {
	      defaultValue: false,
	      description: 'Disables the requirement of indenting nested sublists by 4 spaces',
	      type: 'boolean'
	    },
	    simpleLineBreaks: {
	      defaultValue: false,
	      description: 'Parses simple line breaks as <br> (GFM Style)',
	      type: 'boolean'
	    },
	    requireSpaceBeforeHeadingText: {
	      defaultValue: false,
	      description: 'Makes adding a space between `#` and the header text mandatory (GFM Style)',
	      type: 'boolean'
	    },
	    ghMentions: {
	      defaultValue: false,
	      description: 'Enables github @mentions',
	      type: 'boolean'
	    }
	  };
	  if (simple === false) {
	    return JSON.parse(JSON.stringify(defaultOptions));
	  }
	  var ret = {};
	  for (var opt in defaultOptions) {
	    if (defaultOptions.hasOwnProperty(opt)) {
	      ret[opt] = defaultOptions[opt].defaultValue;
	    }
	  }
	  return ret;
	}
	
	function allOptionsOn() {
	  'use strict';
	  var options = getDefaultOpts(true),
	      ret = {};
	  for (var opt in options) {
	    if (options.hasOwnProperty(opt)) {
	      ret[opt] = true;
	    }
	  }
	  return ret;
	}
	
	/**
	 * Created by Tivie on 06-01-2015.
	 */
	
	// Private properties
	var showdown = {},
	    parsers = {},
	    extensions = {},
	    globalOptions = getDefaultOpts(true),
	    setFlavor = 'vanilla',
	    flavor = {
	      github: {
	        omitExtraWLInCodeBlocks:              true,
	        prefixHeaderId:                       'user-content-',
	        simplifiedAutoLink:                   true,
	        excludeTrailingPunctuationFromURLs:   true,
	        literalMidWordUnderscores:            true,
	        strikethrough:                        true,
	        tables:                               true,
	        tablesHeaderId:                       true,
	        ghCodeBlocks:                         true,
	        tasklists:                            true,
	        disableForced4SpacesIndentedSublists: true,
	        simpleLineBreaks:                     true,
	        requireSpaceBeforeHeadingText:        true,
	        ghCompatibleHeaderId:                 true,
	        ghMentions:                           true
	      },
	      vanilla: getDefaultOpts(true),
	      allOn: allOptionsOn()
	    };
	
	/**
	 * helper namespace
	 * @type {{}}
	 */
	showdown.helper = {};
	
	/**
	 * TODO LEGACY SUPPORT CODE
	 * @type {{}}
	 */
	showdown.extensions = {};
	
	/**
	 * Set a global option
	 * @static
	 * @param {string} key
	 * @param {*} value
	 * @returns {showdown}
	 */
	showdown.setOption = function (key, value) {
	  'use strict';
	  globalOptions[key] = value;
	  return this;
	};
	
	/**
	 * Get a global option
	 * @static
	 * @param {string} key
	 * @returns {*}
	 */
	showdown.getOption = function (key) {
	  'use strict';
	  return globalOptions[key];
	};
	
	/**
	 * Get the global options
	 * @static
	 * @returns {{}}
	 */
	showdown.getOptions = function () {
	  'use strict';
	  return globalOptions;
	};
	
	/**
	 * Reset global options to the default values
	 * @static
	 */
	showdown.resetOptions = function () {
	  'use strict';
	  globalOptions = getDefaultOpts(true);
	};
	
	/**
	 * Set the flavor showdown should use as default
	 * @param {string} name
	 */
	showdown.setFlavor = function (name) {
	  'use strict';
	  if (!flavor.hasOwnProperty(name)) {
	    throw Error(name + ' flavor was not found');
	  }
	  var preset = flavor[name];
	  setFlavor = name;
	  for (var option in preset) {
	    if (preset.hasOwnProperty(option)) {
	      globalOptions[option] = preset[option];
	    }
	  }
	};
	
	/**
	 * Get the currently set flavor
	 * @returns {string}
	 */
	showdown.getFlavor = function () {
	  'use strict';
	  return setFlavor;
	};
	
	/**
	 * Get the options of a specified flavor. Returns undefined if the flavor was not found
	 * @param {string} name Name of the flavor
	 * @returns {{}|undefined}
	 */
	showdown.getFlavorOptions = function (name) {
	  'use strict';
	  if (flavor.hasOwnProperty(name)) {
	    return flavor[name];
	  }
	};
	
	/**
	 * Get the default options
	 * @static
	 * @param {boolean} [simple=true]
	 * @returns {{}}
	 */
	showdown.getDefaultOptions = function (simple) {
	  'use strict';
	  return getDefaultOpts(simple);
	};
	
	/**
	 * Get or set a subParser
	 *
	 * subParser(name)       - Get a registered subParser
	 * subParser(name, func) - Register a subParser
	 * @static
	 * @param {string} name
	 * @param {function} [func]
	 * @returns {*}
	 */
	showdown.subParser = function (name, func) {
	  'use strict';
	  if (showdown.helper.isString(name)) {
	    if (typeof func !== 'undefined') {
	      parsers[name] = func;
	    } else {
	      if (parsers.hasOwnProperty(name)) {
	        return parsers[name];
	      } else {
	        throw Error('SubParser named ' + name + ' not registered!');
	      }
	    }
	  }
	};
	
	/**
	 * Gets or registers an extension
	 * @static
	 * @param {string} name
	 * @param {object|function=} ext
	 * @returns {*}
	 */
	showdown.extension = function (name, ext) {
	  'use strict';
	
	  if (!showdown.helper.isString(name)) {
	    throw Error('Extension \'name\' must be a string');
	  }
	
	  name = showdown.helper.stdExtName(name);
	
	  // Getter
	  if (showdown.helper.isUndefined(ext)) {
	    if (!extensions.hasOwnProperty(name)) {
	      throw Error('Extension named ' + name + ' is not registered!');
	    }
	    return extensions[name];
	
	    // Setter
	  } else {
	    // Expand extension if it's wrapped in a function
	    if (typeof ext === 'function') {
	      ext = ext();
	    }
	
	    // Ensure extension is an array
	    if (!showdown.helper.isArray(ext)) {
	      ext = [ext];
	    }
	
	    var validExtension = validate(ext, name);
	
	    if (validExtension.valid) {
	      extensions[name] = ext;
	    } else {
	      throw Error(validExtension.error);
	    }
	  }
	};
	
	/**
	 * Gets all extensions registered
	 * @returns {{}}
	 */
	showdown.getAllExtensions = function () {
	  'use strict';
	  return extensions;
	};
	
	/**
	 * Remove an extension
	 * @param {string} name
	 */
	showdown.removeExtension = function (name) {
	  'use strict';
	  delete extensions[name];
	};
	
	/**
	 * Removes all extensions
	 */
	showdown.resetExtensions = function () {
	  'use strict';
	  extensions = {};
	};
	
	/**
	 * Validate extension
	 * @param {array} extension
	 * @param {string} name
	 * @returns {{valid: boolean, error: string}}
	 */
	function validate(extension, name) {
	  'use strict';
	
	  var errMsg = (name) ? 'Error in ' + name + ' extension->' : 'Error in unnamed extension',
	    ret = {
	      valid: true,
	      error: ''
	    };
	
	  if (!showdown.helper.isArray(extension)) {
	    extension = [extension];
	  }
	
	  for (var i = 0; i < extension.length; ++i) {
	    var baseMsg = errMsg + ' sub-extension ' + i + ': ',
	        ext = extension[i];
	    if (typeof ext !== 'object') {
	      ret.valid = false;
	      ret.error = baseMsg + 'must be an object, but ' + typeof ext + ' given';
	      return ret;
	    }
	
	    if (!showdown.helper.isString(ext.type)) {
	      ret.valid = false;
	      ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + ' given';
	      return ret;
	    }
	
	    var type = ext.type = ext.type.toLowerCase();
	
	    // normalize extension type
	    if (type === 'language') {
	      type = ext.type = 'lang';
	    }
	
	    if (type === 'html') {
	      type = ext.type = 'output';
	    }
	
	    if (type !== 'lang' && type !== 'output' && type !== 'listener') {
	      ret.valid = false;
	      ret.error = baseMsg + 'type ' + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
	      return ret;
	    }
	
	    if (type === 'listener') {
	      if (showdown.helper.isUndefined(ext.listeners)) {
	        ret.valid = false;
	        ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
	        return ret;
	      }
	    } else {
	      if (showdown.helper.isUndefined(ext.filter) && showdown.helper.isUndefined(ext.regex)) {
	        ret.valid = false;
	        ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
	        return ret;
	      }
	    }
	
	    if (ext.listeners) {
	      if (typeof ext.listeners !== 'object') {
	        ret.valid = false;
	        ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + ' given';
	        return ret;
	      }
	      for (var ln in ext.listeners) {
	        if (ext.listeners.hasOwnProperty(ln)) {
	          if (typeof ext.listeners[ln] !== 'function') {
	            ret.valid = false;
	            ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln +
	              ' must be a function but ' + typeof ext.listeners[ln] + ' given';
	            return ret;
	          }
	        }
	      }
	    }
	
	    if (ext.filter) {
	      if (typeof ext.filter !== 'function') {
	        ret.valid = false;
	        ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + ' given';
	        return ret;
	      }
	    } else if (ext.regex) {
	      if (showdown.helper.isString(ext.regex)) {
	        ext.regex = new RegExp(ext.regex, 'g');
	      }
	      if (!ext.regex instanceof RegExp) {
	        ret.valid = false;
	        ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + ' given';
	        return ret;
	      }
	      if (showdown.helper.isUndefined(ext.replace)) {
	        ret.valid = false;
	        ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
	        return ret;
	      }
	    }
	  }
	  return ret;
	}
	
	/**
	 * Validate extension
	 * @param {object} ext
	 * @returns {boolean}
	 */
	showdown.validateExtension = function (ext) {
	  'use strict';
	
	  var validateExtension = validate(ext, null);
	  if (!validateExtension.valid) {
	    console.warn(validateExtension.error);
	    return false;
	  }
	  return true;
	};
	
	/**
	 * showdownjs helper functions
	 */
	
	if (!showdown.hasOwnProperty('helper')) {
	  showdown.helper = {};
	}
	
	/**
	 * Check if var is string
	 * @static
	 * @param {string} a
	 * @returns {boolean}
	 */
	showdown.helper.isString = function isString(a) {
	  'use strict';
	  return (typeof a === 'string' || a instanceof String);
	};
	
	/**
	 * Check if var is a function
	 * @static
	 * @param {string} a
	 * @returns {boolean}
	 */
	showdown.helper.isFunction = function isFunction(a) {
	  'use strict';
	  var getType = {};
	  return a && getType.toString.call(a) === '[object Function]';
	};
	
	/**
	 * ForEach helper function
	 * @static
	 * @param {*} obj
	 * @param {function} callback
	 */
	showdown.helper.forEach = function forEach(obj, callback) {
	  'use strict';
	  if (typeof obj.forEach === 'function') {
	    obj.forEach(callback);
	  } else {
	    for (var i = 0; i < obj.length; i++) {
	      callback(obj[i], i, obj);
	    }
	  }
	};
	
	/**
	 * isArray helper function
	 * @static
	 * @param {*} a
	 * @returns {boolean}
	 */
	showdown.helper.isArray = function isArray(a) {
	  'use strict';
	  return a.constructor === Array;
	};
	
	/**
	 * Check if value is undefined
	 * @static
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 */
	showdown.helper.isUndefined = function isUndefined(value) {
	  'use strict';
	  return typeof value === 'undefined';
	};
	
	/**
	 * Standardidize extension name
	 * @static
	 * @param {string} s extension name
	 * @returns {string}
	 */
	showdown.helper.stdExtName = function (s) {
	  'use strict';
	  return s.replace(/[_-]||\s/g, '').toLowerCase();
	};
	
	function escapeCharactersCallback(wholeMatch, m1) {
	  'use strict';
	  var charCodeToEscape = m1.charCodeAt(0);
	  return '~E' + charCodeToEscape + 'E';
	}
	
	/**
	 * Callback used to escape characters when passing through String.replace
	 * @static
	 * @param {string} wholeMatch
	 * @param {string} m1
	 * @returns {string}
	 */
	showdown.helper.escapeCharactersCallback = escapeCharactersCallback;
	
	/**
	 * Escape characters in a string
	 * @static
	 * @param {string} text
	 * @param {string} charsToEscape
	 * @param {boolean} afterBackslash
	 * @returns {XML|string|void|*}
	 */
	showdown.helper.escapeCharacters = function escapeCharacters(text, charsToEscape, afterBackslash) {
	  'use strict';
	  // First we have to escape the escape characters so that
	  // we can build a character class out of them
	  var regexString = '([' + charsToEscape.replace(/([\[\]\\])/g, '\\$1') + '])';
	
	  if (afterBackslash) {
	    regexString = '\\\\' + regexString;
	  }
	
	  var regex = new RegExp(regexString, 'g');
	  text = text.replace(regex, escapeCharactersCallback);
	
	  return text;
	};
	
	var rgxFindMatchPos = function (str, left, right, flags) {
	  'use strict';
	  var f = flags || '',
	    g = f.indexOf('g') > -1,
	    x = new RegExp(left + '|' + right, 'g' + f.replace(/g/g, '')),
	    l = new RegExp(left, f.replace(/g/g, '')),
	    pos = [],
	    t, s, m, start, end;
	
	  do {
	    t = 0;
	    while ((m = x.exec(str))) {
	      if (l.test(m[0])) {
	        if (!(t++)) {
	          s = x.lastIndex;
	          start = s - m[0].length;
	        }
	      } else if (t) {
	        if (!--t) {
	          end = m.index + m[0].length;
	          var obj = {
	            left: {start: start, end: s},
	            match: {start: s, end: m.index},
	            right: {start: m.index, end: end},
	            wholeMatch: {start: start, end: end}
	          };
	          pos.push(obj);
	          if (!g) {
	            return pos;
	          }
	        }
	      }
	    }
	  } while (t && (x.lastIndex = s));
	
	  return pos;
	};
	
	/**
	 * matchRecursiveRegExp
	 *
	 * (c) 2007 Steven Levithan <stevenlevithan.com>
	 * MIT License
	 *
	 * Accepts a string to search, a left and right format delimiter
	 * as regex patterns, and optional regex flags. Returns an array
	 * of matches, allowing nested instances of left/right delimiters.
	 * Use the "g" flag to return all matches, otherwise only the
	 * first is returned. Be careful to ensure that the left and
	 * right format delimiters produce mutually exclusive matches.
	 * Backreferences are not supported within the right delimiter
	 * due to how it is internally combined with the left delimiter.
	 * When matching strings whose format delimiters are unbalanced
	 * to the left or right, the output is intentionally as a
	 * conventional regex library with recursion support would
	 * produce, e.g. "<<x>" and "<x>>" both produce ["x"] when using
	 * "<" and ">" as the delimiters (both strings contain a single,
	 * balanced instance of "<x>").
	 *
	 * examples:
	 * matchRecursiveRegExp("test", "\\(", "\\)")
	 * returns: []
	 * matchRecursiveRegExp("<t<<e>><s>>t<>", "<", ">", "g")
	 * returns: ["t<<e>><s>", ""]
	 * matchRecursiveRegExp("<div id=\"x\">test</div>", "<div\\b[^>]*>", "</div>", "gi")
	 * returns: ["test"]
	 */
	showdown.helper.matchRecursiveRegExp = function (str, left, right, flags) {
	  'use strict';
	
	  var matchPos = rgxFindMatchPos (str, left, right, flags),
	    results = [];
	
	  for (var i = 0; i < matchPos.length; ++i) {
	    results.push([
	      str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
	      str.slice(matchPos[i].match.start, matchPos[i].match.end),
	      str.slice(matchPos[i].left.start, matchPos[i].left.end),
	      str.slice(matchPos[i].right.start, matchPos[i].right.end)
	    ]);
	  }
	  return results;
	};
	
	/**
	 *
	 * @param {string} str
	 * @param {string|function} replacement
	 * @param {string} left
	 * @param {string} right
	 * @param {string} flags
	 * @returns {string}
	 */
	showdown.helper.replaceRecursiveRegExp = function (str, replacement, left, right, flags) {
	  'use strict';
	
	  if (!showdown.helper.isFunction(replacement)) {
	    var repStr = replacement;
	    replacement = function () {
	      return repStr;
	    };
	  }
	
	  var matchPos = rgxFindMatchPos(str, left, right, flags),
	      finalStr = str,
	      lng = matchPos.length;
	
	  if (lng > 0) {
	    var bits = [];
	    if (matchPos[0].wholeMatch.start !== 0) {
	      bits.push(str.slice(0, matchPos[0].wholeMatch.start));
	    }
	    for (var i = 0; i < lng; ++i) {
	      bits.push(
	        replacement(
	          str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
	          str.slice(matchPos[i].match.start, matchPos[i].match.end),
	          str.slice(matchPos[i].left.start, matchPos[i].left.end),
	          str.slice(matchPos[i].right.start, matchPos[i].right.end)
	        )
	      );
	      if (i < lng - 1) {
	        bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
	      }
	    }
	    if (matchPos[lng - 1].wholeMatch.end < str.length) {
	      bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
	    }
	    finalStr = bits.join('');
	  }
	  return finalStr;
	};
	
	/**
	 * POLYFILLS
	 */
	// use this instead of builtin is undefined for IE8 compatibility
	if (typeof(console) === 'undefined') {
	  console = {
	    warn: function (msg) {
	      'use strict';
	      alert(msg);
	    },
	    log: function (msg) {
	      'use strict';
	      alert(msg);
	    },
	    error: function (msg) {
	      'use strict';
	      throw msg;
	    }
	  };
	}
	
	/**
	 * Created by Estevao on 31-05-2015.
	 */
	
	/**
	 * Showdown Converter class
	 * @class
	 * @param {object} [converterOptions]
	 * @returns {Converter}
	 */
	showdown.Converter = function (converterOptions) {
	  'use strict';
	
	  var
	      /**
	       * Options used by this converter
	       * @private
	       * @type {{}}
	       */
	      options = {},
	
	      /**
	       * Language extensions used by this converter
	       * @private
	       * @type {Array}
	       */
	      langExtensions = [],
	
	      /**
	       * Output modifiers extensions used by this converter
	       * @private
	       * @type {Array}
	       */
	      outputModifiers = [],
	
	      /**
	       * Event listeners
	       * @private
	       * @type {{}}
	       */
	      listeners = {},
	
	      /**
	       * The flavor set in this converter
	       */
	      setConvFlavor = setFlavor;
	
	  _constructor();
	
	  /**
	   * Converter constructor
	   * @private
	   */
	  function _constructor() {
	    converterOptions = converterOptions || {};
	
	    for (var gOpt in globalOptions) {
	      if (globalOptions.hasOwnProperty(gOpt)) {
	        options[gOpt] = globalOptions[gOpt];
	      }
	    }
	
	    // Merge options
	    if (typeof converterOptions === 'object') {
	      for (var opt in converterOptions) {
	        if (converterOptions.hasOwnProperty(opt)) {
	          options[opt] = converterOptions[opt];
	        }
	      }
	    } else {
	      throw Error('Converter expects the passed parameter to be an object, but ' + typeof converterOptions +
	      ' was passed instead.');
	    }
	
	    if (options.extensions) {
	      showdown.helper.forEach(options.extensions, _parseExtension);
	    }
	  }
	
	  /**
	   * Parse extension
	   * @param {*} ext
	   * @param {string} [name='']
	   * @private
	   */
	  function _parseExtension(ext, name) {
	
	    name = name || null;
	    // If it's a string, the extension was previously loaded
	    if (showdown.helper.isString(ext)) {
	      ext = showdown.helper.stdExtName(ext);
	      name = ext;
	
	      // LEGACY_SUPPORT CODE
	      if (showdown.extensions[ext]) {
	        console.warn('DEPRECATION WARNING: ' + ext + ' is an old extension that uses a deprecated loading method.' +
	          'Please inform the developer that the extension should be updated!');
	        legacyExtensionLoading(showdown.extensions[ext], ext);
	        return;
	      // END LEGACY SUPPORT CODE
	
	      } else if (!showdown.helper.isUndefined(extensions[ext])) {
	        ext = extensions[ext];
	
	      } else {
	        throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
	      }
	    }
	
	    if (typeof ext === 'function') {
	      ext = ext();
	    }
	
	    if (!showdown.helper.isArray(ext)) {
	      ext = [ext];
	    }
	
	    var validExt = validate(ext, name);
	    if (!validExt.valid) {
	      throw Error(validExt.error);
	    }
	
	    for (var i = 0; i < ext.length; ++i) {
	      switch (ext[i].type) {
	
	        case 'lang':
	          langExtensions.push(ext[i]);
	          break;
	
	        case 'output':
	          outputModifiers.push(ext[i]);
	          break;
	      }
	      if (ext[i].hasOwnProperty('listeners')) {
	        for (var ln in ext[i].listeners) {
	          if (ext[i].listeners.hasOwnProperty(ln)) {
	            listen(ln, ext[i].listeners[ln]);
	          }
	        }
	      }
	    }
	
	  }
	
	  /**
	   * LEGACY_SUPPORT
	   * @param {*} ext
	   * @param {string} name
	   */
	  function legacyExtensionLoading(ext, name) {
	    if (typeof ext === 'function') {
	      ext = ext(new showdown.Converter());
	    }
	    if (!showdown.helper.isArray(ext)) {
	      ext = [ext];
	    }
	    var valid = validate(ext, name);
	
	    if (!valid.valid) {
	      throw Error(valid.error);
	    }
	
	    for (var i = 0; i < ext.length; ++i) {
	      switch (ext[i].type) {
	        case 'lang':
	          langExtensions.push(ext[i]);
	          break;
	        case 'output':
	          outputModifiers.push(ext[i]);
	          break;
	        default:// should never reach here
	          throw Error('Extension loader error: Type unrecognized!!!');
	      }
	    }
	  }
	
	  /**
	   * Listen to an event
	   * @param {string} name
	   * @param {function} callback
	   */
	  function listen(name, callback) {
	    if (!showdown.helper.isString(name)) {
	      throw Error('Invalid argument in converter.listen() method: name must be a string, but ' + typeof name + ' given');
	    }
	
	    if (typeof callback !== 'function') {
	      throw Error('Invalid argument in converter.listen() method: callback must be a function, but ' + typeof callback + ' given');
	    }
	
	    if (!listeners.hasOwnProperty(name)) {
	      listeners[name] = [];
	    }
	    listeners[name].push(callback);
	  }
	
	  function rTrimInputText(text) {
	    var rsp = text.match(/^\s*/)[0].length,
	        rgx = new RegExp('^\\s{0,' + rsp + '}', 'gm');
	    return text.replace(rgx, '');
	  }
	
	  /**
	   * Dispatch an event
	   * @private
	   * @param {string} evtName Event name
	   * @param {string} text Text
	   * @param {{}} options Converter Options
	   * @param {{}} globals
	   * @returns {string}
	   */
	  this._dispatch = function dispatch (evtName, text, options, globals) {
	    if (listeners.hasOwnProperty(evtName)) {
	      for (var ei = 0; ei < listeners[evtName].length; ++ei) {
	        var nText = listeners[evtName][ei](evtName, text, this, options, globals);
	        if (nText && typeof nText !== 'undefined') {
	          text = nText;
	        }
	      }
	    }
	    return text;
	  };
	
	  /**
	   * Listen to an event
	   * @param {string} name
	   * @param {function} callback
	   * @returns {showdown.Converter}
	   */
	  this.listen = function (name, callback) {
	    listen(name, callback);
	    return this;
	  };
	
	  /**
	   * Converts a markdown string into HTML
	   * @param {string} text
	   * @returns {*}
	   */
	  this.makeHtml = function (text) {
	    //check if text is not falsy
	    if (!text) {
	      return text;
	    }
	
	    var globals = {
	      gHtmlBlocks:     [],
	      gHtmlMdBlocks:   [],
	      gHtmlSpans:      [],
	      gUrls:           {},
	      gTitles:         {},
	      gDimensions:     {},
	      gListLevel:      0,
	      hashLinkCounts:  {},
	      langExtensions:  langExtensions,
	      outputModifiers: outputModifiers,
	      converter:       this,
	      ghCodeBlocks:    []
	    };
	
	    // attacklab: Replace ~ with ~T
	    // This lets us use tilde as an escape char to avoid md5 hashes
	    // The choice of character is arbitrary; anything that isn't
	    // magic in Markdown will work.
	    text = text.replace(/~/g, '~T');
	
	    // attacklab: Replace $ with ~D
	    // RegExp interprets $ as a special character
	    // when it's in a replacement string
	    text = text.replace(/\$/g, '~D');
	
	    // Standardize line endings
	    text = text.replace(/\r\n/g, '\n'); // DOS to Unix
	    text = text.replace(/\r/g, '\n'); // Mac to Unix
	
	    // Stardardize line spaces (nbsp causes trouble in older browsers and some regex flavors)
	    text = text.replace(/\u00A0/g, ' ');
	
	    if (options.smartIndentationFix) {
	      text = rTrimInputText(text);
	    }
	
	    // Make sure text begins and ends with a couple of newlines:
	    text = '\n\n' + text + '\n\n';
	
	    // detab
	    text = showdown.subParser('detab')(text, options, globals);
	
	    // stripBlankLines
	    text = showdown.subParser('stripBlankLines')(text, options, globals);
	
	    //run languageExtensions
	    showdown.helper.forEach(langExtensions, function (ext) {
	      text = showdown.subParser('runExtension')(ext, text, options, globals);
	    });
	
	    // run the sub parsers
	    text = showdown.subParser('hashPreCodeTags')(text, options, globals);
	    text = showdown.subParser('githubCodeBlocks')(text, options, globals);
	    text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
	    text = showdown.subParser('hashHTMLSpans')(text, options, globals);
	    text = showdown.subParser('stripLinkDefinitions')(text, options, globals);
	    text = showdown.subParser('blockGamut')(text, options, globals);
	    text = showdown.subParser('unhashHTMLSpans')(text, options, globals);
	    text = showdown.subParser('unescapeSpecialChars')(text, options, globals);
	
	    // attacklab: Restore dollar signs
	    text = text.replace(/~D/g, '$$');
	
	    // attacklab: Restore tildes
	    text = text.replace(/~T/g, '~');
	
	    // Run output modifiers
	    showdown.helper.forEach(outputModifiers, function (ext) {
	      text = showdown.subParser('runExtension')(ext, text, options, globals);
	    });
	
	    return text;
	  };
	
	  /**
	   * Set an option of this Converter instance
	   * @param {string} key
	   * @param {*} value
	   */
	  this.setOption = function (key, value) {
	    options[key] = value;
	  };
	
	  /**
	   * Get the option of this Converter instance
	   * @param {string} key
	   * @returns {*}
	   */
	  this.getOption = function (key) {
	    return options[key];
	  };
	
	  /**
	   * Get the options of this Converter instance
	   * @returns {{}}
	   */
	  this.getOptions = function () {
	    return options;
	  };
	
	  /**
	   * Add extension to THIS converter
	   * @param {{}} extension
	   * @param {string} [name=null]
	   */
	  this.addExtension = function (extension, name) {
	    name = name || null;
	    _parseExtension(extension, name);
	  };
	
	  /**
	   * Use a global registered extension with THIS converter
	   * @param {string} extensionName Name of the previously registered extension
	   */
	  this.useExtension = function (extensionName) {
	    _parseExtension(extensionName);
	  };
	
	  /**
	   * Set the flavor THIS converter should use
	   * @param {string} name
	   */
	  this.setFlavor = function (name) {
	    if (!flavor.hasOwnProperty(name)) {
	      throw Error(name + ' flavor was not found');
	    }
	    var preset = flavor[name];
	    setConvFlavor = name;
	    for (var option in preset) {
	      if (preset.hasOwnProperty(option)) {
	        options[option] = preset[option];
	      }
	    }
	  };
	
	  /**
	   * Get the currently set flavor of this converter
	   * @returns {string}
	   */
	  this.getFlavor = function () {
	    return setConvFlavor;
	  };
	
	  /**
	   * Remove an extension from THIS converter.
	   * Note: This is a costly operation. It's better to initialize a new converter
	   * and specify the extensions you wish to use
	   * @param {Array} extension
	   */
	  this.removeExtension = function (extension) {
	    if (!showdown.helper.isArray(extension)) {
	      extension = [extension];
	    }
	    for (var a = 0; a < extension.length; ++a) {
	      var ext = extension[a];
	      for (var i = 0; i < langExtensions.length; ++i) {
	        if (langExtensions[i] === ext) {
	          langExtensions[i].splice(i, 1);
	        }
	      }
	      for (var ii = 0; ii < outputModifiers.length; ++i) {
	        if (outputModifiers[ii] === ext) {
	          outputModifiers[ii].splice(i, 1);
	        }
	      }
	    }
	  };
	
	  /**
	   * Get all extension of THIS converter
	   * @returns {{language: Array, output: Array}}
	   */
	  this.getAllExtensions = function () {
	    return {
	      language: langExtensions,
	      output: outputModifiers
	    };
	  };
	};
	
	/**
	 * Turn Markdown link shortcuts into XHTML <a> tags.
	 */
	showdown.subParser('anchors', function (text, options, globals) {
	  'use strict';
	
	  text = globals.converter._dispatch('anchors.before', text, options, globals);
	
	  var writeAnchorTag = function (wholeMatch, m1, m2, m3, m4, m5, m6, m7) {
	    if (showdown.helper.isUndefined(m7)) {
	      m7 = '';
	    }
	    wholeMatch = m1;
	    var linkText = m2,
	        linkId = m3.toLowerCase(),
	        url = m4,
	        title = m7;
	
	    if (!url) {
	      if (!linkId) {
	        // lower-case and turn embedded newlines into spaces
	        linkId = linkText.toLowerCase().replace(/ ?\n/g, ' ');
	      }
	      url = '#' + linkId;
	
	      if (!showdown.helper.isUndefined(globals.gUrls[linkId])) {
	        url = globals.gUrls[linkId];
	        if (!showdown.helper.isUndefined(globals.gTitles[linkId])) {
	          title = globals.gTitles[linkId];
	        }
	      } else {
	        if (wholeMatch.search(/\(\s*\)$/m) > -1) {
	          // Special case for explicit empty url
	          url = '';
	        } else {
	          return wholeMatch;
	        }
	      }
	    }
	
	    url = showdown.helper.escapeCharacters(url, '*_', false);
	    var result = '<a href="' + url + '"';
	
	    if (title !== '' && title !== null) {
	      title = title.replace(/"/g, '&quot;');
	      title = showdown.helper.escapeCharacters(title, '*_', false);
	      result += ' title="' + title + '"';
	    }
	
	    result += '>' + linkText + '</a>';
	
	    return result;
	  };
	
	  // First, handle reference-style links: [link text] [id]
	  text = text.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g, writeAnchorTag);
	
	  // Next, inline-style links: [link text](url "optional title")
	  text = text.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,
	                      writeAnchorTag);
	
	  // handle reference-style shortcuts: [link text]
	  // These must come last in case you've also got [link test][1]
	  // or [link test](/foo)
	  text = text.replace(/(\[([^\[\]]+)])()()()()()/g, writeAnchorTag);
	
	  // Lastly handle GithubMentions if option is enabled
	  if (options.ghMentions) {
	    text = text.replace(/(^|\s)(\\)?(@([a-z\d\-]+))(?=[.!?;,[\]()]|\s|$)/gmi, function (wm, st, escape, mentions, username) {
	      if (escape === '\\') {
	        return st + mentions;
	      }
	      return st + '<a href="https://www.github.com/' + username + '">' + mentions + '</a>';
	    });
	  }
	
	  text = globals.converter._dispatch('anchors.after', text, options, globals);
	  return text;
	});
	
	showdown.subParser('autoLinks', function (text, options, globals) {
	  'use strict';
	
	  text = globals.converter._dispatch('autoLinks.before', text, options, globals);
	
	  var simpleURLRegex  = /\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)()(?=\s|$)(?!["<>])/gi,
	      simpleURLRegex2 = /\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?()]?)(?=\s|$)(?!["<>])/gi,
	      delimUrlRegex   = /<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi,
	      simpleMailRegex = /(?:^|\s)([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|\s)/gi,
	      delimMailRegex  = /<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi;
	
	  text = text.replace(delimUrlRegex, replaceLink);
	  text = text.replace(delimMailRegex, replaceMail);
	  // simpleURLRegex  = /\b(((https?|ftp|dict):\/\/|www\.)[-.+~:?#@!$&'()*,;=[\]\w]+)\b/gi,
	  // Email addresses: <address@domain.foo>
	
	  if (options.simplifiedAutoLink) {
	    if (options.excludeTrailingPunctuationFromURLs) {
	      text = text.replace(simpleURLRegex2, replaceLink);
	    } else {
	      text = text.replace(simpleURLRegex, replaceLink);
	    }
	    text = text.replace(simpleMailRegex, replaceMail);
	  }
	
	  function replaceLink(wm, link, m2, m3, trailingPunctuation) {
	    var lnkTxt = link,
	        append = '';
	    if (/^www\./i.test(link)) {
	      link = link.replace(/^www\./i, 'http://www.');
	    }
	    if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
	      append = trailingPunctuation;
	    }
	    return '<a href="' + link + '">' + lnkTxt + '</a>' + append;
	  }
	
	  function replaceMail(wholeMatch, mail) {
	    var unescapedStr = showdown.subParser('unescapeSpecialChars')(mail);
	    return showdown.subParser('encodeEmailAddress')(unescapedStr);
	  }
	
	  text = globals.converter._dispatch('autoLinks.after', text, options, globals);
	
	  return text;
	});
	
	/**
	 * These are all the transformations that form block-level
	 * tags like paragraphs, headers, and list items.
	 */
	showdown.subParser('blockGamut', function (text, options, globals) {
	  'use strict';
	
	  text = globals.converter._dispatch('blockGamut.before', text, options, globals);
	
	  // we parse blockquotes first so that we can have headings and hrs
	  // inside blockquotes
	  text = showdown.subParser('blockQuotes')(text, options, globals);
	  text = showdown.subParser('headers')(text, options, globals);
	
	  // Do Horizontal Rules:
	  var key = showdown.subParser('hashBlock')('<hr />', options, globals);
	  text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
	  text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
	  text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);
	
	  text = showdown.subParser('lists')(text, options, globals);
	  text = showdown.subParser('codeBlocks')(text, options, globals);
	  text = showdown.subParser('tables')(text, options, globals);
	
	  // We already ran _HashHTMLBlocks() before, in Markdown(), but that
	  // was to escape raw HTML in the original Markdown source. This time,
	  // we're escaping the markup we've just created, so that we don't wrap
	  // <p> tags around block-level tags.
	  text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
	  text = showdown.subParser('paragraphs')(text, options, globals);
	
	  text = globals.converter._dispatch('blockGamut.after', text, options, globals);
	
	  return text;
	});
	
	showdown.subParser('blockQuotes', function (text, options, globals) {
	  'use strict';
	
	  text = globals.converter._dispatch('blockQuotes.before', text, options, globals);
	
	  text = text.replace(/((^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm, function (wholeMatch, m1) {
	    var bq = m1;
	
	    // attacklab: hack around Konqueror 3.5.4 bug:
	    // "----------bug".replace(/^-/g,"") == "bug"
	    bq = bq.replace(/^[ \t]*>[ \t]?/gm, '~0'); // trim one level of quoting
	
	    // attacklab: clean up hack
	    bq = bq.replace(/~0/g, '');
	
	    bq = bq.replace(/^[ \t]+$/gm, ''); // trim whitespace-only lines
	    bq = showdown.subParser('githubCodeBlocks')(bq, options, globals);
	    bq = showdown.subParser('blockGamut')(bq, options, globals); // recurse
	
	    bq = bq.replace(/(^|\n)/g, '$1  ');
	    // These leading spaces screw with <pre> content, so we need to fix that:
	    bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch, m1) {
	      var pre = m1;
	      // attacklab: hack around Konqueror 3.5.4 bug:
	      pre = pre.replace(/^  /mg, '~0');
	      pre = pre.replace(/~0/g, '');
	      return pre;
	    });
	
	    return showdown.subParser('hashBlock')('<blockquote>\n' + bq + '\n</blockquote>', options, globals);
	  });
	
	  text = globals.converter._dispatch('blockQuotes.after', text, options, globals);
	  return text;
	});
	
	/**
	 * Process Markdown `<pre><code>` blocks.
	 */
	showdown.subParser('codeBlocks', function (text, options, globals) {
	  'use strict';
	
	  text = globals.converter._dispatch('codeBlocks.before', text, options, globals);
	
	  // sentinel workarounds for lack of \A and \Z, safari\khtml bug
	  text += '~0';
	
	  var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;
	  text = text.replace(pattern, function (wholeMatch, m1, m2) {
	    var codeblock = m1,
	        nextChar = m2,
	        end = '\n';
	
	    codeblock = showdown.subParser('outdent')(codeblock);
	    codeblock = showdown.subParser('encodeCode')(codeblock);
	    codeblock = showdown.subParser('detab')(codeblock);
	    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
	    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing newlines
	
	    if (options.omitExtraWLInCodeBlocks) {
	      end = '';
	    }
	
	    codeblock = '<pre><code>' + codeblock + end + '</code></pre>';
	
	    return showdown.subParser('hashBlock')(codeblock, options, globals) + nextChar;
	  });
	
	  // strip sentinel
	  text = text.replace(/~0/, '');
	
	  text = globals.converter._dispatch('codeBlocks.after', text, options, globals);
	  return text;
	});
	
	/**
	 *
	 *   *  Backtick quotes are used for <code></code> spans.
	 *
	 *   *  You can use multiple backticks as the delimiters if you want to
	 *     include literal backticks in the code span. So, this input:
	 *
	 *         Just type ``foo `bar` baz`` at the prompt.
	 *
	 *       Will translate to:
	 *
	 *         <p>Just type <code>foo `bar` baz</code> at the prompt.</p>
	 *
	 *    There's no arbitrary limit to the number of backticks you
	 *    can use as delimters. If you need three consecutive backticks
	 *    in your code, use four for delimiters, etc.
	 *
	 *  *  You can use spaces to get literal backticks at the edges:
	 *
	 *         ... type `` `bar` `` ...
	 *
	 *       Turns to:
	 *
	 *         ... type <code>`bar`</code> ...
	 */
	showdown.subParser('codeSpans', function (text, options, globals) {
	  'use strict';
	
	  text = globals.converter._dispatch('codeSpans.before', text, options, globals);
	
	  /*
	   text = text.replace(/
	   (^|[^\\])					// Character before opening ` can't be a backslash
	   (`+)						// $2 = Opening run of `
	   (							// $3 = The code block
	   [^\r]*?
	   [^`]					// attacklab: work around lack of lookbehind
	   )
	   \2							// Matching closer
	   (?!`)
	   /gm, function(){...});
	   */
	
	  if (typeof(text) === 'undefined') {
	    text = '';
	  }
	  text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
	    function (wholeMatch, m1, m2, m3) {
	      var c = m3;
	      c = c.replace(/^([ \t]*)/g, '');	// leading whitespace
	      c = c.replace(/[ \t]*$/g, '');	// trailing whitespace
	      c = showdown.subParser('encodeCode')(c);
	      return m1 + '<code>' + c + '</code>';
	    }
	  );
	
	  text = globals.converter._dispatch('codeSpans.after', text, options, globals);
	  return text;
	});
	
	/**
	 * Convert all tabs to spaces
	 */
	showdown.subParser('detab', function (text) {
	  'use strict';
	
	  // expand first n-1 tabs
	  text = text.replace(/\t(?=\t)/g, '    '); // g_tab_width
	
	  // replace the nth with two sentinels
	  text = text.replace(/\t/g, '~A~B');
	
	  // use the sentinel to anchor our regex so it doesn't explode
	  text = text.replace(/~B(.+?)~A/g, function (wholeMatch, m1) {
	    var leadingText = m1,
	        numSpaces = 4 - leadingText.length % 4;  // g_tab_width
	
	    // there *must* be a better way to do this:
	    for (var i = 0; i < numSpaces; i++) {
	      leadingText += ' ';
	    }
	
	    return leadingText;
	  });
	
	  // clean up sentinels
	  text = text.replace(/~A/g, '    ');  // g_tab_width
	  text = text.replace(/~B/g, '');
	
	  return text;
	
	});
	
	/**
	 * Smart processing for ampersands and angle brackets that need to be encoded.
	 */
	showdown.subParser('encodeAmpsAndAngles', function (text) {
	  'use strict';
	  // Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:
	  // http://bumppo.net/projects/amputator/
	  text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, '&amp;');
	
	  // Encode naked <'s
	  text = text.replace(/<(?![a-z\/?\$!])/gi, '&lt;');
	
	  return text;
	});
	
	/**
	 * Returns the string, with after processing the following backslash escape sequences.
	 *
	 * attacklab: The polite way to do this is with the new escapeCharacters() function:
	 *
	 *    text = escapeCharacters(text,"\\",true);
	 *    text = escapeCharacters(text,"`*_{}[]()>#+-.!",true);
	 *
	 * ...but we're sidestepping its use of the (slow) RegExp constructor
	 * as an optimization for Firefox.  This function gets called a LOT.
	 */
	showdown.subParser('encodeBackslashEscapes', function (text) {
	  'use strict';
	  text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
	  text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g, showdown.helper.escapeCharactersCallback);
	  return text;
	});
	
	/**
	 * Encode/escape certain characters inside Markdown code runs.
	 * The point is that in code, these characters are literals,
	 * and lose their special Markdown meanings.
	 */
	showdown.subParser('encodeCode', function (text) {
	  'use strict';
	
	  // Encode all ampersands; HTML entities are not
	  // entities within a Markdown code span.
	  text = text.replace(/&/g, '&amp;');
	
	  // Do the angle bracket song and dance:
	  text = text.replace(/</g, '&lt;');
	  text = text.replace(/>/g, '&gt;');
	
	  // Now, escape characters that are magic in Markdown:
	  text = showdown.helper.escapeCharacters(text, '*_{}[]\\', false);
	
	  // jj the line above breaks this:
	  //---
	  //* Item
	  //   1. Subitem
	  //            special char: *
	  // ---
	
	  return text;
	});
	
	/**
	 *  Input: an email address, e.g. "foo@example.com"
	 *
	 *  Output: the email address as a mailto link, with each character
	 *    of the address encoded as either a decimal or hex entity, in
	 *    the hopes of foiling most address harvesting spam bots. E.g.:
	 *
	 *    <a href="&#x6D;&#97;&#105;&#108;&#x74;&#111;:&#102;&#111;&#111;&#64;&#101;
	 *       x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;">&#102;&#111;&#111;
	 *       &#64;&#101;x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;</a>
	 *
	 *  Based on a filter by Matthew Wickline, posted to the BBEdit-Talk
	 *  mailing list: <http://tinyurl.com/yu7ue>
	 *
	 */
	showdown.subParser('encodeEmailAddress', function (addr) {
	  'use strict';
	
	  var encode = [
	    function (ch) {
	      return '&#' + ch.charCodeAt(0) + ';';
	    },
	    function (ch) {
	      return '&#x' + ch.charCodeAt(0).toString(16) + ';';
	    },
	    function (ch) {
	      return ch;
	    }
	  ];
	
	  addr = 'mailto:' + addr;
	
	  addr = addr.replace(/./g, function (ch) {
	    if (ch === '@') {
	      // this *must* be encoded. I insist.
	      ch = encode[Math.floor(Math.random() * 2)](ch);
	    } else if (ch !== ':') {
	      // leave ':' alone (to spot mailto: later)
	      var r = Math.random();
	      // roughly 10% raw, 45% hex, 45% dec
	      ch = (
	        r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch)
	      );
	    }
	    return ch;
	  });
	
	  addr = '<a href="' + addr + '">' + addr + '</a>';
	  addr = addr.replace(/">.+:/g, '">'); // strip the mailto: from the visible part
	
	  return addr;
	});
	
	/**
	 * Within tags -- meaning between < and > -- encode [\ ` * _] so they
	 * don't conflict with their use in Markdown for code, italics and strong.
	 */
	showdown.subParser('escapeSpecialCharsWithinTagAttributes', function (text) {
	  'use strict';
	
	  // Build a regex to find HTML tags and comments.  See Friedl's
	  // "Mastering Regular Expressions", 2nd Ed., pp. 200-201.
	  var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
	
	  text = text.replace(regex, function (wholeMatch) {
	    var tag = wholeMatch.replace(/(.)<\/?code>(?=.)/g, '$1`');
	    tag = showdown.helper.escapeCharacters(tag, '\\`*_', false);
	    return tag;
	  });
	
	  return text;
	});
	
	/**
	 * Handle github codeblocks prior to running HashHTML so that
	 * HTML contained within the codeblock gets escaped properly
	 * Example:
	 * ```ruby
	 *     def hello_world(x)
	 *       puts "Hello, #{x}"
	 *     end
	 * ```
	 */
	showdown.subParser('githubCodeBlocks', function (text, options, globals) {
	  'use strict';
	
	  // early exit if option is not enabled
	  if (!options.ghCodeBlocks) {
	    return text;
	  }
	
	  text = globals.converter._dispatch('githubCodeBlocks.before', text, options, globals);
	
	  text += '~0';
	
	  text = text.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function (wholeMatch, language, codeblock) {
	    var end = (options.omitExtraWLInCodeBlocks) ? '' : '\n';
	
	    // First parse the github code block
	    codeblock = showdown.subParser('encodeCode')(codeblock);
	    codeblock = showdown.subParser('detab')(codeblock);
	    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
	    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing whitespace
	
	    codeblock = '<pre><code' + (language ? ' class="' + language + ' language-' + language + '"' : '') + '>' + codeblock + end + '</code></pre>';
	
	    codeblock = showdown.subParser('hashBlock')(codeblock, options, globals);
	
	    // Since GHCodeblocks can be false positives, we need to
	    // store the primitive text and the parsed text in a global var,
	    // and then return a token
	    return '\n\n~G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
	  });
	
	  // attacklab: strip sentinel
	  text = text.replace(/~0/, '');
	
	  return globals.converter._dispatch('githubCodeBlocks.after', text, options, globals);
	});
	
	showdown.subParser('hashBlock', function (text, options, globals) {
	  'use strict';
	  text = text.replace(/(^\n+|\n+$)/g, '');
	  return '\n\n~K' + (globals.gHtmlBlocks.push(text) - 1) + 'K\n\n';
	});
	
	showdown.subParser('hashElement', function (text, options, globals) {
	  'use strict';
	
	  return function (wholeMatch, m1) {
	    var blockText = m1;
	
	    // Undo double lines
	    blockText = blockText.replace(/\n\n/g, '\n');
	    blockText = blockText.replace(/^\n/, '');
	
	    // strip trailing blank lines
	    blockText = blockText.replace(/\n+$/g, '');
	
	    // Replace the element text with a marker ("~KxK" where x is its key)
	    blockText = '\n\n~K' + (globals.gHtmlBlocks.push(blockText) - 1) + 'K\n\n';
	
	    return blockText;
	  };
	});
	
	showdown.subParser('hashHTMLBlocks', function (text, options, globals) {
	  'use strict';
	
	  var blockTags = [
	      'pre',
	      'div',
	      'h1',
	      'h2',
	      'h3',
	      'h4',
	      'h5',
	      'h6',
	      'blockquote',
	      'table',
	      'dl',
	      'ol',
	      'ul',
	      'script',
	      'noscript',
	      'form',
	      'fieldset',
	      'iframe',
	      'math',
	      'style',
	      'section',
	      'header',
	      'footer',
	      'nav',
	      'article',
	      'aside',
	      'address',
	      'audio',
	      'canvas',
	      'figure',
	      'hgroup',
	      'output',
	      'video',
	      'p'
	    ],
	    repFunc = function (wholeMatch, match, left, right) {
	      var txt = wholeMatch;
	      // check if this html element is marked as markdown
	      // if so, it's contents should be parsed as markdown
	      if (left.search(/\bmarkdown\b/) !== -1) {
	        txt = left + globals.converter.makeHtml(match) + right;
	      }
	      return '\n\n~K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
	    };
	
	  for (var i = 0; i < blockTags.length; ++i) {
	    text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^ {0,3}<' + blockTags[i] + '\\b[^>]*>', '</' + blockTags[i] + '>', 'gim');
	  }
	
	  // HR SPECIAL CASE
	  text = text.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
	    showdown.subParser('hashElement')(text, options, globals));
	
	  // Special case for standalone HTML comments
	  text = showdown.helper.replaceRecursiveRegExp(text, function (txt) {
	    return '\n\n~K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
	  }, '^ {0,3}<!--', '-->', 'gm');
	
	  // PHP and ASP-style processor instructions (<?...?> and <%...%>)
	  text = text.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
	    showdown.subParser('hashElement')(text, options, globals));
	
	  return text;
	});
	
	/**
	 * Hash span elements that should not be parsed as markdown
	 */
	showdown.subParser('hashHTMLSpans', function (text, config, globals) {
	  'use strict';
	
	  var matches = showdown.helper.matchRecursiveRegExp(text, '<code\\b[^>]*>', '</code>', 'gi');
	
	  for (var i = 0; i < matches.length; ++i) {
	    text = text.replace(matches[i][0], '~C' + (globals.gHtmlSpans.push(matches[i][0]) - 1) + 'C');
	  }
	  return text;
	});
	
	/**
	 * Unhash HTML spans
	 */
	showdown.subParser('unhashHTMLSpans', function (text, config, globals) {
	  'use strict';
	
	  for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
	    text = text.replace('~C' + i + 'C', globals.gHtmlSpans[i]);
	  }
	
	  return text;
	});
	
	/**
	 * Hash span elements that should not be parsed as markdown
	 */
	showdown.subParser('hashPreCodeTags', function (text, config, globals) {
	  'use strict';
	
	  var repFunc = function (wholeMatch, match, left, right) {
	    // encode html entities
	    var codeblock = left + showdown.subParser('encodeCode')(match) + right;
	    return '\n\n~G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
	  };
	
	  text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>', '^ {0,3}</code>\\s*</pre>', 'gim');
	  return text;
	});
	
	showdown.subParser('headers', function (text, options, globals) {
	  'use strict';
	
	  text = globals.converter._dispatch('headers.before', text, options, globals);
	
	  var prefixHeader = options.prefixHeaderId,
	      headerLevelStart = (isNaN(parseInt(options.headerLevelStart))) ? 1 : parseInt(options.headerLevelStart),
	      ghHeaderId = options.ghCompatibleHeaderId,
	
	  // Set text-style headers:
	  //	Header 1
	  //	========
	  //
	  //	Header 2
	  //	--------
	  //
	      setextRegexH1 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
	      setextRegexH2 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
	
	  text = text.replace(setextRegexH1, function (wholeMatch, m1) {
	
	    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
	        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
	        hLevel = headerLevelStart,
	        hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
	    return showdown.subParser('hashBlock')(hashBlock, options, globals);
	  });
	
	  text = text.replace(setextRegexH2, function (matchFound, m1) {
	    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
	        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
	        hLevel = headerLevelStart + 1,
	      hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
	    return showdown.subParser('hashBlock')(hashBlock, options, globals);
	  });
	
	  // atx-style headers:
	  //  # Header 1
	  //  ## Header 2
	  //  ## Header 2 with closing hashes ##
	  //  ...
	  //  ###### Header 6
	  //
	  var atxStyle = (options.requireSpaceBeforeHeadingText) ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
	
	  text = text.replace(atxStyle, function (wholeMatch, m1, m2) {
	    var span = showdown.subParser('spanGamut')(m2, options, globals),
	        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m2) + '"',
	        hLevel = headerLevelStart - 1 + m1.length,
	        header = '<h' + hLevel + hID + '>' + span + '</h' + hLevel + '>';
	
	    return showdown.subParser('hashBlock')(header, options, globals);
	  });
	
	  function headerId(m) {
	    var title, escapedId;
	
	    if (ghHeaderId) {
	      escapedId = m
	        .replace(/ /g, '-')
	        //replace previously escaped chars (&, ~ and $)
	        .replace(/&amp;/g, '')
	        .replace(/~T/g, '')
	        .replace(/~D/g, '')
	        //replace rest of the chars (&~$ are repeated as they might have been escaped)
	        // borrowed from github's redcarpet (some they should produce similar results)
	        .replace(/[&+$,\/:;=?@"#{}|^~\[\]`\\*)(%.!'<>]/g, '')
	        .toLowerCase();
	    } else {
	      escapedId = m.replace(/[^\w]/g, '').toLowerCase();
	    }
	
	    if (globals.hashLinkCounts[escapedId]) {
	      title = escapedId + '-' + (globals.hashLinkCounts[escapedId]++);
	    } else {
	      title = escapedId;
	      globals.hashLinkCounts[escapedId] = 1;
	    }
	
	    // Prefix id to prevent causing inadvertent pre-existing style matches.
	    if (prefixHeader === true) {
	      prefixHeader = 'section';
	    }
	
	    if (showdown.helper.isString(prefixHeader)) {
	      return prefixHeader + title;
	    }
	    return title;
	  }
	
	  text = globals.converter._dispatch('headers.after', text, options, globals);
	  return text;
	});
	
	/**
	 * Turn Markdown image shortcuts into <img> tags.
	 */
	showdown.subParser('images', function (text, options, globals) {
	  'use strict';
	
	  text = globals.converter._dispatch('images.before', text, options, globals);
	
	  var inlineRegExp    = /!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g,
	      referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g;
	
	  function writeImageTag (wholeMatch, altText, linkId, url, width, height, m5, title) {
	
	    var gUrls   = globals.gUrls,
	        gTitles = globals.gTitles,
	        gDims   = globals.gDimensions;
	
	    linkId = linkId.toLowerCase();
	
	    if (!title) {
	      title = '';
	    }
	
	    if (url === '' || url === null) {
	      if (linkId === '' || linkId === null) {
	        // lower-case and turn embedded newlines into spaces
	        linkId = altText.toLowerCase().replace(/ ?\n/g, ' ');
	      }
	      url = '#' + linkId;
	
	      if (!showdown.helper.isUndefined(gUrls[linkId])) {
	        url = gUrls[linkId];
	        if (!showdown.helper.isUndefined(gTitles[linkId])) {
	          title = gTitles[linkId];
	        }
	        if (!showdown.helper.isUndefined(gDims[linkId])) {
	          width = gDims[linkId].width;
	          height = gDims[linkId].height;
	        }
	      } else {
	        return wholeMatch;
	      }
	    }
	
	    altText = altText.replace(/"/g, '&quot;');
	    altText = showdown.helper.escapeCharacters(altText, '*_', false);
	    url = showdown.helper.escapeCharacters(url, '*_', false);
	    var result = '<img src="' + url + '" alt="' + altText + '"';
	
	    if (title) {
	      title = title.replace(/"/g, '&quot;');
	      title = showdown.helper.escapeCharacters(title, '*_', false);
	      result += ' title="' + title + '"';
	    }
	
	    if (width && height) {
	      width  = (width === '*') ? 'auto' : width;
	      height = (height === '*') ? 'auto' : height;
	
	      result += ' width="' + width + '"';
	      result += ' height="' + height + '"';
	    }
	
	    result += ' />';
	
	    return result;
	  }
	
	  // First, handle reference-style labeled images: ![alt text][id]
	  text = text.replace(referenceRegExp, writeImageTag);
	
	  // Next, handle inline images:  ![alt text](url =<width>x<height> "optional title")
	  text = text.replace(inlineRegExp, writeImageTag);
	
	  text = globals.converter._dispatch('images.after', text, options, globals);
	  return text;
	});
	
	showdown.subParser('italicsAndBold', function (text, options, globals) {
	  'use strict';
	
	  text = globals.converter._dispatch('italicsAndBold.before', text, options, globals);
	
	  if (options.literalMidWordUnderscores) {
	    //underscores
	    // Since we are consuming a \s character, we need to add it
	    text = text.replace(/(^|\s|>|\b)__(?=\S)([\s\S]+?)__(?=\b|<|\s|$)/gm, '$1<strong>$2</strong>');
	    text = text.replace(/(^|\s|>|\b)_(?=\S)([\s\S]+?)_(?=\b|<|\s|$)/gm, '$1<em>$2</em>');
	    //asterisks
	    text = text.replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g, '<strong>$2</strong>');
	    text = text.replace(/(\*)(?=\S)([^\r]*?\S)\1/g, '<em>$2</em>');
	
	  } else {
	    // <strong> must go first:
	    text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, '<strong>$2</strong>');
	    text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, '<em>$2</em>');
	  }
	
	  text = globals.converter._dispatch('italicsAndBold.after', text, options, globals);
	  return text;
	});
	
	/**
	 * Form HTML ordered (numbered) and unordered (bulleted) lists.
	 */
	showdown.subParser('lists', function (text, options, globals) {
	  'use strict';
	  text = globals.converter._dispatch('lists.before', text, options, globals);
	
	  /**
	   * Process the contents of a single ordered or unordered list, splitting it
	   * into individual list items.
	   * @param {string} listStr
	   * @param {boolean} trimTrailing
	   * @returns {string}
	   */
	  function processListItems (listStr, trimTrailing) {
	    // The $g_list_level global keeps track of when we're inside a list.
	    // Each time we enter a list, we increment it; when we leave a list,
	    // we decrement. If it's zero, we're not in a list anymore.
	    //
	    // We do this because when we're not inside a list, we want to treat
	    // something like this:
	    //
	    //    I recommend upgrading to version
	    //    8. Oops, now this line is treated
	    //    as a sub-list.
	    //
	    // As a single paragraph, despite the fact that the second line starts
	    // with a digit-period-space sequence.
	    //
	    // Whereas when we're inside a list (or sub-list), that line will be
	    // treated as the start of a sub-list. What a kludge, huh? This is
	    // an aspect of Markdown's syntax that's hard to parse perfectly
	    // without resorting to mind-reading. Perhaps the solution is to
	    // change the syntax rules such that sub-lists must start with a
	    // starting cardinal number; e.g. "1." or "a.".
	    globals.gListLevel++;
	
	    // trim trailing blank lines:
	    listStr = listStr.replace(/\n{2,}$/, '\n');
	
	    // attacklab: add sentinel to emulate \z
	    listStr += '~0';
	
	    var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,
	        isParagraphed = (/\n[ \t]*\n(?!~0)/.test(listStr));
	
	    // Since version 1.5, nesting sublists requires 4 spaces (or 1 tab) indentation,
	    // which is a syntax breaking change
	    // activating this option reverts to old behavior
	    if (options.disableForced4SpacesIndentedSublists) {
	      rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm;
	    }
	
	    listStr = listStr.replace(rgx, function (wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
	      checked = (checked && checked.trim() !== '');
	
	      var item = showdown.subParser('outdent')(m4, options, globals),
	          bulletStyle = '';
	
	      // Support for github tasklists
	      if (taskbtn && options.tasklists) {
	        bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
	        item = item.replace(/^[ \t]*\[(x|X| )?]/m, function () {
	          var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
	          if (checked) {
	            otp += ' checked';
	          }
	          otp += '>';
	          return otp;
	        });
	      }
	
	      // ISSUE #312
	      // This input: - - - a
	      // causes trouble to the parser, since it interprets it as:
	      // <ul><li><li><li>a</li></li></li></ul>
	      // instead of:
	      // <ul><li>- - a</li></ul>
	      // So, to prevent it, we will put a marker (~A)in the beginning of the line
	      // Kind of hackish/monkey patching, but seems more effective than overcomplicating the list parser
	      item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function (wm2) {
	        return '~A' + wm2;
	      });
	
	      // m1 - Leading line or
	      // Has a double return (multi paragraph) or
	      // Has sublist
	      if (m1 || (item.search(/\n{2,}/) > -1)) {
	        item = showdown.subParser('githubCodeBlocks')(item, options, globals);
	        item = showdown.subParser('blockGamut')(item, options, globals);
	      } else {
	        // Recursion for sub-lists:
	        item = showdown.subParser('lists')(item, options, globals);
	        item = item.replace(/\n$/, ''); // chomp(item)
	        item = showdown.subParser('hashHTMLBlocks')(item, options, globals);
	        // Colapse double linebreaks
	        item = item.replace(/\n\n+/g, '\n\n');
	        // replace double linebreaks with a placeholder
	        item = item.replace(/\n\n/g, '~B');
	        if (isParagraphed) {
	          item = showdown.subParser('paragraphs')(item, options, globals);
	        } else {
	          item = showdown.subParser('spanGamut')(item, options, globals);
	        }
	        item = item.replace(/~B/g, '\n\n');
	      }
	
	      // now we need to remove the marker (~A)
	      item = item.replace('~A', '');
	      // we can finally wrap the line in list item tags
	      item =  '<li' + bulletStyle + '>' + item + '</li>\n';
	
	      return item;
	    });
	
	    // attacklab: strip sentinel
	    listStr = listStr.replace(/~0/g, '');
	
	    globals.gListLevel--;
	
	    if (trimTrailing) {
	      listStr = listStr.replace(/\s+$/, '');
	    }
	
	    return listStr;
	  }
	
	  /**
	   * Check and parse consecutive lists (better fix for issue #142)
	   * @param {string} list
	   * @param {string} listType
	   * @param {boolean} trimTrailing
	   * @returns {string}
	   */
	  function parseConsecutiveLists(list, listType, trimTrailing) {
	    // check if we caught 2 or more consecutive lists by mistake
	    // we use the counterRgx, meaning if listType is UL we look for OL and vice versa
	    var olRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm,
	        ulRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm,
	        counterRxg = (listType === 'ul') ? olRgx : ulRgx,
	        result = '';
	
	    if (list.search(counterRxg) !== -1) {
	      (function parseCL(txt) {
	        var pos = txt.search(counterRxg);
	        if (pos !== -1) {
	          // slice
	          result += '\n<' + listType + '>\n' + processListItems(txt.slice(0, pos), !!trimTrailing) + '</' + listType + '>\n';
	
	          // invert counterType and listType
	          listType = (listType === 'ul') ? 'ol' : 'ul';
	          counterRxg = (listType === 'ul') ? olRgx : ulRgx;
	
	          //recurse
	          parseCL(txt.slice(pos));
	        } else {
	          result += '\n<' + listType + '>\n' + processListItems(txt, !!trimTrailing) + '</' + listType + '>\n';
	        }
	      })(list);
	    } else {
	      result = '\n<' + listType + '>\n' + processListItems(list, !!trimTrailing) + '</' + listType + '>\n';
	    }
	
	    return result;
	  }
	
	  // add sentinel to hack around khtml/safari bug:
	  // http://bugs.webkit.org/show_bug.cgi?id=11231
	  text += '~0';
	
	  if (globals.gListLevel) {
	    text = text.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
	      function (wholeMatch, list, m2) {
	        var listType = (m2.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
	        return parseConsecutiveLists(list, listType, true);
	      }
	    );
	  } else {
	    text = text.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
	      function (wholeMatch, m1, list, m3) {
	        var listType = (m3.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
	        return parseConsecutiveLists(list, listType, false);
	      }
	    );
	  }
	
	  // strip sentinel
	  text = text.replace(/~0/, '');
	  text = globals.converter._dispatch('lists.after', text, options, globals);
	  return text;
	});
	
	/**
	 * Remove one level of line-leading tabs or spaces
	 */
	showdown.subParser('outdent', function (text) {
	  'use strict';
	
	  // attacklab: hack around Konqueror 3.5.4 bug:
	  // "----------bug".replace(/^-/g,"") == "bug"
	  text = text.replace(/^(\t|[ ]{1,4})/gm, '~0'); // attacklab: g_tab_width
	
	  // attacklab: clean up hack
	  text = text.replace(/~0/g, '');
	
	  return text;
	});
	
	/**
	 *
	 */
	showdown.subParser('paragraphs', function (text, options, globals) {
	  'use strict';
	
	  text = globals.converter._dispatch('paragraphs.before', text, options, globals);
	  // Strip leading and trailing lines:
	  text = text.replace(/^\n+/g, '');
	  text = text.replace(/\n+$/g, '');
	
	  var grafs = text.split(/\n{2,}/g),
	      grafsOut = [],
	      end = grafs.length; // Wrap <p> tags
	
	  for (var i = 0; i < end; i++) {
	    var str = grafs[i];
	    // if this is an HTML marker, copy it
	    if (str.search(/~(K|G)(\d+)\1/g) >= 0) {
	      grafsOut.push(str);
	    } else {
	      str = showdown.subParser('spanGamut')(str, options, globals);
	      str = str.replace(/^([ \t]*)/g, '<p>');
	      str += '</p>';
	      grafsOut.push(str);
	    }
	  }
	
	  /** Unhashify HTML blocks */
	  end = grafsOut.length;
	  for (i = 0; i < end; i++) {
	    var blockText = '',
	        grafsOutIt = grafsOut[i],
	        codeFlag = false;
	    // if this is a marker for an html block...
	    while (grafsOutIt.search(/~(K|G)(\d+)\1/) >= 0) {
	      var delim = RegExp.$1,
	          num   = RegExp.$2;
	
	      if (delim === 'K') {
	        blockText = globals.gHtmlBlocks[num];
	      } else {
	        // we need to check if ghBlock is a false positive
	        if (codeFlag) {
	          // use encoded version of all text
	          blockText = showdown.subParser('encodeCode')(globals.ghCodeBlocks[num].text);
	        } else {
	          blockText = globals.ghCodeBlocks[num].codeblock;
	        }
	      }
	      blockText = blockText.replace(/\$/g, '$$$$'); // Escape any dollar signs
	
	      grafsOutIt = grafsOutIt.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/, blockText);
	      // Check if grafsOutIt is a pre->code
	      if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
	        codeFlag = true;
	      }
	    }
	    grafsOut[i] = grafsOutIt;
	  }
	  text = grafsOut.join('\n');
	  // Strip leading and trailing lines:
	  text = text.replace(/^\n+/g, '');
	  text = text.replace(/\n+$/g, '');
	  return globals.converter._dispatch('paragraphs.after', text, options, globals);
	});
	
	/**
	 * Run extension
	 */
	showdown.subParser('runExtension', function (ext, text, options, globals) {
	  'use strict';
	
	  if (ext.filter) {
	    text = ext.filter(text, globals.converter, options);
	
	  } else if (ext.regex) {
	    // TODO remove this when old extension loading mechanism is deprecated
	    var re = ext.regex;
	    if (!re instanceof RegExp) {
	      re = new RegExp(re, 'g');
	    }
	    text = text.replace(re, ext.replace);
	  }
	
	  return text;
	});
	
	/**
	 * These are all the transformations that occur *within* block-level
	 * tags like paragraphs, headers, and list items.
	 */
	showdown.subParser('spanGamut', function (text, options, globals) {
	  'use strict';
	
	  text = globals.converter._dispatch('spanGamut.before', text, options, globals);
	  text = showdown.subParser('codeSpans')(text, options, globals);
	  text = showdown.subParser('escapeSpecialCharsWithinTagAttributes')(text, options, globals);
	  text = showdown.subParser('encodeBackslashEscapes')(text, options, globals);
	
	  // Process anchor and image tags. Images must come first,
	  // because ![foo][f] looks like an anchor.
	  text = showdown.subParser('images')(text, options, globals);
	  text = showdown.subParser('anchors')(text, options, globals);
	
	  // Make links out of things like `<http://example.com/>`
	  // Must come after _DoAnchors(), because you can use < and >
	  // delimiters in inline links like [this](<url>).
	  text = showdown.subParser('autoLinks')(text, options, globals);
	  text = showdown.subParser('encodeAmpsAndAngles')(text, options, globals);
	  text = showdown.subParser('italicsAndBold')(text, options, globals);
	  text = showdown.subParser('strikethrough')(text, options, globals);
	
	  // Do hard breaks
	  if (options.simpleLineBreaks) {
	    // GFM style hard breaks
	    text = text.replace(/\n/g, '<br />\n');
	  } else {
	    // Vanilla hard breaks
	    text = text.replace(/  +\n/g, '<br />\n');
	  }
	
	  text = globals.converter._dispatch('spanGamut.after', text, options, globals);
	  return text;
	});
	
	showdown.subParser('strikethrough', function (text, options, globals) {
	  'use strict';
	
	  if (options.strikethrough) {
	    text = globals.converter._dispatch('strikethrough.before', text, options, globals);
	    text = text.replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g, '<del>$1</del>');
	    text = globals.converter._dispatch('strikethrough.after', text, options, globals);
	  }
	
	  return text;
	});
	
	/**
	 * Strip any lines consisting only of spaces and tabs.
	 * This makes subsequent regexs easier to write, because we can
	 * match consecutive blank lines with /\n+/ instead of something
	 * contorted like /[ \t]*\n+/
	 */
	showdown.subParser('stripBlankLines', function (text) {
	  'use strict';
	  return text.replace(/^[ \t]+$/mg, '');
	});
	
	/**
	 * Strips link definitions from text, stores the URLs and titles in
	 * hash references.
	 * Link defs are in the form: ^[id]: url "optional title"
	 */
	showdown.subParser('stripLinkDefinitions', function (text, options, globals) {
	  'use strict';
	
	  var regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm;
	
	  // attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug
	  text += '~0';
	
	  text = text.replace(regex, function (wholeMatch, linkId, url, width, height, blankLines, title) {
	    linkId = linkId.toLowerCase();
	    globals.gUrls[linkId] = showdown.subParser('encodeAmpsAndAngles')(url);  // Link IDs are case-insensitive
	
	    if (blankLines) {
	      // Oops, found blank lines, so it's not a title.
	      // Put back the parenthetical statement we stole.
	      return blankLines + title;
	
	    } else {
	      if (title) {
	        globals.gTitles[linkId] = title.replace(/"|'/g, '&quot;');
	      }
	      if (options.parseImgDimensions && width && height) {
	        globals.gDimensions[linkId] = {
	          width:  width,
	          height: height
	        };
	      }
	    }
	    // Completely remove the definition from the text
	    return '';
	  });
	
	  // attacklab: strip sentinel
	  text = text.replace(/~0/, '');
	
	  return text;
	});
	
	showdown.subParser('tables', function (text, options, globals) {
	  'use strict';
	
	  if (!options.tables) {
	    return text;
	  }
	
	  var tableRgx = /^ {0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|~0)/gm;
	
	  function parseStyles(sLine) {
	    if (/^:[ \t]*--*$/.test(sLine)) {
	      return ' style="text-align:left;"';
	    } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
	      return ' style="text-align:right;"';
	    } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
	      return ' style="text-align:center;"';
	    } else {
	      return '';
	    }
	  }
	
	  function parseHeaders(header, style) {
	    var id = '';
	    header = header.trim();
	    if (options.tableHeaderId) {
	      id = ' id="' + header.replace(/ /g, '_').toLowerCase() + '"';
	    }
	    header = showdown.subParser('spanGamut')(header, options, globals);
	
	    return '<th' + id + style + '>' + header + '</th>\n';
	  }
	
	  function parseCells(cell, style) {
	    var subText = showdown.subParser('spanGamut')(cell, options, globals);
	    return '<td' + style + '>' + subText + '</td>\n';
	  }
	
	  function buildTable(headers, cells) {
	    var tb = '<table>\n<thead>\n<tr>\n',
	        tblLgn = headers.length;
	
	    for (var i = 0; i < tblLgn; ++i) {
	      tb += headers[i];
	    }
	    tb += '</tr>\n</thead>\n<tbody>\n';
	
	    for (i = 0; i < cells.length; ++i) {
	      tb += '<tr>\n';
	      for (var ii = 0; ii < tblLgn; ++ii) {
	        tb += cells[i][ii];
	      }
	      tb += '</tr>\n';
	    }
	    tb += '</tbody>\n</table>\n';
	    return tb;
	  }
	
	  text = globals.converter._dispatch('tables.before', text, options, globals);
	
	  text = text.replace(tableRgx, function (rawTable) {
	
	    var i, tableLines = rawTable.split('\n');
	
	    // strip wrong first and last column if wrapped tables are used
	    for (i = 0; i < tableLines.length; ++i) {
	      if (/^ {0,3}\|/.test(tableLines[i])) {
	        tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, '');
	      }
	      if (/\|[ \t]*$/.test(tableLines[i])) {
	        tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, '');
	      }
	    }
	
	    var rawHeaders = tableLines[0].split('|').map(function (s) { return s.trim();}),
	        rawStyles = tableLines[1].split('|').map(function (s) { return s.trim();}),
	        rawCells = [],
	        headers = [],
	        styles = [],
	        cells = [];
	
	    tableLines.shift();
	    tableLines.shift();
	
	    for (i = 0; i < tableLines.length; ++i) {
	      if (tableLines[i].trim() === '') {
	        continue;
	      }
	      rawCells.push(
	        tableLines[i]
	          .split('|')
	          .map(function (s) {
	            return s.trim();
	          })
	      );
	    }
	
	    if (rawHeaders.length < rawStyles.length) {
	      return rawTable;
	    }
	
	    for (i = 0; i < rawStyles.length; ++i) {
	      styles.push(parseStyles(rawStyles[i]));
	    }
	
	    for (i = 0; i < rawHeaders.length; ++i) {
	      if (showdown.helper.isUndefined(styles[i])) {
	        styles[i] = '';
	      }
	      headers.push(parseHeaders(rawHeaders[i], styles[i]));
	    }
	
	    for (i = 0; i < rawCells.length; ++i) {
	      var row = [];
	      for (var ii = 0; ii < headers.length; ++ii) {
	        if (showdown.helper.isUndefined(rawCells[i][ii])) {
	
	        }
	        row.push(parseCells(rawCells[i][ii], styles[ii]));
	      }
	      cells.push(row);
	    }
	
	    return buildTable(headers, cells);
	  });
	
	  text = globals.converter._dispatch('tables.after', text, options, globals);
	
	  return text;
	});
	
	/**
	 * Swap back in all the special characters we've hidden.
	 */
	showdown.subParser('unescapeSpecialChars', function (text) {
	  'use strict';
	
	  text = text.replace(/~E(\d+)E/g, function (wholeMatch, m1) {
	    var charCodeToReplace = parseInt(m1);
	    return String.fromCharCode(charCodeToReplace);
	  });
	  return text;
	});
	
	var root = this;
	
	// CommonJS/nodeJS Loader
	if (typeof module !== 'undefined' && module.exports) {
	  module.exports = showdown;
	
	// AMD Loader
	} else if (true) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    'use strict';
	    return showdown;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	// Regular Browser loader
	} else {
	  root.showdown = showdown;
	}
	}).call(this);
	
	//# sourceMappingURL=showdown.js.map


/***/ },

/***/ 71:
/***/ function(module, exports) {

	"use strict";
	var Utils = (function () {
	    function Utils() {
	    }
	    Utils.isEmpty = function (val) {
	        return val === void 0 || val === null || ("" + val).trim() === '';
	    };
	    Utils.isObject = function (obj) {
	        return typeof obj === 'object';
	    };
	    Utils.isFunction = function (fn) {
	        return typeof fn === 'function';
	    };
	    Utils.forIn = function (object, cb) {
	        if (object === void 0) { object = {}; }
	        if (cb === void 0) { cb = (function () {
	        }); }
	        Object.keys(object).forEach(function (key) {
	            cb(object[key], key, object);
	        });
	    };
	    Utils.trimEachLine = function (text, trimEachLine) {
	        if (this.isEmpty(text))
	            return text;
	        switch (trimEachLine) {
	            case 'space':
	                return text.replace(/^(?=\n)$|^[ ]+|[ ]+$/gm, '');
	            case 'tab':
	                return text.replace(/^(?=\n)$|^\t+|\t+$/gm, '');
	            case true:
	                return text.replace(/^(?=\n)$|^\s+|\s+$/gm, '');
	            default:
	                return text;
	        }
	    };
	    return Utils;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Utils;


/***/ },

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(71);
	var ConverterOptions = (function () {
	    function ConverterOptions(options) {
	        this.merge(options);
	    }
	    ConverterOptions.prototype.merge = function (options) {
	        var _this = this;
	        if (!utils_1.default.isObject(options))
	            return;
	        utils_1.default.forIn(options, function (val, key) {
	            _this[key] = val;
	        });
	    };
	    return ConverterOptions;
	}());
	exports.ConverterOptions = ConverterOptions;
	/**
	 * @example
	 * ```javascript
	 * import { NgModel } from '@angular/core';
	 * import { ConverterOptions, BaseConverterOptions } from 'ng2-md';
	 * export class MyConverterOptions extends ConverterOptions{
	 *  constructor(){
	 *      super({...});
	 *  }
	 * }
	 * @NgModel({
	 *  providers:[
	 *      {provide: ConverterOptions, useClass: MyConverterOptions},
	 *  ]
	 * })
	 * export class AppModule{}
	 * ```
	 */
	var BaseConverterOptions = (function (_super) {
	    __extends(BaseConverterOptions, _super);
	    function BaseConverterOptions() {
	        return _super.call(this, {
	            omitExtraWLInCodeBlocks: false,
	            noHeaderId: false,
	            prefixHeaderId: false,
	            parseImgDimensions: false,
	            headerLevelStart: 1,
	            literalMidWordUnderscores: false,
	            strikethrough: false,
	            tables: false,
	            tablesHeaderId: false,
	            ghCodeBlocks: true,
	            tasklists: false,
	            smoothLivePreview: false,
	            trimEachLine: false
	        }) || this;
	    }
	    return BaseConverterOptions;
	}(ConverterOptions));
	BaseConverterOptions = __decorate([
	    core_1.Injectable(),
	    __metadata("design:paramtypes", [])
	], BaseConverterOptions);
	exports.BaseConverterOptions = BaseConverterOptions;


/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(4);
	var base_converter_options_provider_1 = __webpack_require__(72);
	var base_converter_class_1 = __webpack_require__(69);
	/**
	 * @example
	 * ```javascript
	 * import { MdConverter } from 'ng2-md';
	 * class Some{
	 *  constructor(mdConverter: MdConverter){
	 *      console.log(mdConverter.makeHtml("..."));
	 *  }
	 * }
	 * ```
	 */
	var MdConverter = (function (_super) {
	    __extends(MdConverter, _super);
	    function MdConverter(options) {
	        return _super.call(this, options) || this;
	    }
	    return MdConverter;
	}(base_converter_class_1.BaseConverter));
	MdConverter = __decorate([
	    core_1.Injectable(),
	    __param(0, core_1.Optional()),
	    __metadata("design:paramtypes", [base_converter_options_provider_1.ConverterOptions])
	], MdConverter);
	exports.MdConverter = MdConverter;


/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(71);
	var base_converter_options_provider_1 = __webpack_require__(72);
	var base_converter_class_1 = __webpack_require__(69);
	var optionsProperties = [
	    'omitExtraWLInCodeBlocks', 'noHeaderId', 'prefixHeaderId', 'parseImgDimensions', 'headerLevelStart', 'literalMidWordUnderscores', 'strikethrough', 'tables', 'tablesHeaderId', 'ghCodeBlocks', 'tasklists', 'smoothLivePreview', 'trimEachLine'
	];
	var MD_COMPONENT_TYPES;
	(function (MD_COMPONENT_TYPES) {
	    MD_COMPONENT_TYPES[MD_COMPONENT_TYPES["NONE"] = 0] = "NONE";
	    MD_COMPONENT_TYPES[MD_COMPONENT_TYPES["SRC"] = 1] = "SRC";
	    MD_COMPONENT_TYPES[MD_COMPONENT_TYPES["BINDING"] = 2] = "BINDING";
	    MD_COMPONENT_TYPES[MD_COMPONENT_TYPES["CONTENT"] = 3] = "CONTENT";
	})(MD_COMPONENT_TYPES = exports.MD_COMPONENT_TYPES || (exports.MD_COMPONENT_TYPES = {}));
	var MD_COMPONENT_STATUSES;
	(function (MD_COMPONENT_STATUSES) {
	    MD_COMPONENT_STATUSES[MD_COMPONENT_STATUSES["CREATED"] = 0] = "CREATED";
	    MD_COMPONENT_STATUSES[MD_COMPONENT_STATUSES["INIT"] = 1] = "INIT";
	    MD_COMPONENT_STATUSES[MD_COMPONENT_STATUSES["PROCESSING"] = 2] = "PROCESSING";
	    MD_COMPONENT_STATUSES[MD_COMPONENT_STATUSES["READY"] = 3] = "READY";
	})(MD_COMPONENT_STATUSES = exports.MD_COMPONENT_STATUSES || (exports.MD_COMPONENT_STATUSES = {}));
	/**
	 * @problem in content use <md>{}</md> - [unescaped "{":](https://github.com/angular/angular/issues/11859) the solution is to sanitize (html char code etc.).
	 *
	 * @example
	 * ```javascript
	 * import { NgModule } from '@angular/core';
	 * import { MdDirective } from 'ng2-md';
	 * @NgModule({
	 *  declarations: [ MdDirective ];
	 * })
	 * export class AppModule{}
	 * ```
	 * ```javascript
	 * import { IConverterOptions } from 'ng2-md';
	 * // ...
	 * text: string = "...";
	 * options: IConverterOptions = {...};
	 * // ...
	 * ```
	 * ```html
	 * <md [value]="text"><md/>
	 * ```
	 * ```html
	 * <div md="text"><div/>
	 * ```
	 * ```html
	 * <md [value]="text" [options]="options"><md/>
	 * ```
	 * ```html
	 * <md [value]="text" [omitExtraWLInCodeBlocks]="options.omitExtraWLInCodeBlocks" [noHeaderId]="options.noHeaderId" [prefixHeaderId]="options.prefixHeaderId" [parseImgDimensions]="options.parseImgDimensions" [headerLevelStart]="options.headerLevelStart" [literalMidWordUnderscores]="options.literalMidWordUnderscores" [strikethrough]="options.strikethrough" [tables]="options.tables" [tablesHeaderId]="options.tablesHeaderId" [ghCodeBlocks]="options.ghCodeBlocks" [tasklists]="options.tasklists" [smoothLivePreview]="options.smoothLivePreview"></md>
	 * ```
	 * ```html
	 * <md trimEachLine="space"> # abc </md> // <md><h1>abc</h1></md>
	 * ```
	 * ```html
	 * <md trimEachLine="tab">\t# abc\t</md> // <md><h1>abc</h1></md>
	 * ```
	 * both tab and space
	 * ```html
	 * <md trimEachLine>\t # abc\t </md> // <md><h1>abc</h1></md>
	 * ```
	 */
	var MdDirective = MdDirective_1 = (function (_super) {
	    __extends(MdDirective, _super);
	    function MdDirective(_elementRef, options) {
	        var _this = _super.call(this, options) || this;
	        _this._elementRef = _elementRef;
	        _this._type = MdDirective_1.TYPES.NONE;
	        _this._status = MdDirective_1.STATUSES.CREATED;
	        /** Default OnChange method, Called on change value or options */
	        _this._onChange = function () {
	            _this.compile();
	        };
	        // override the setOption method (define in the super constructor)
	        _this.setOption = function (optionKey, value) {
	            _this.getOptions()[optionKey] = value;
	            _this._onChange();
	        };
	        return _this;
	    }
	    Object.defineProperty(MdDirective.prototype, "value", {
	        /** Value of the component (the input md text pre converter). */
	        get: function () {
	            return this._value;
	        },
	        set: function (value) {
	            this.setValue(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdDirective.prototype, "type", {
	        /** Type of the input source [binding, content, src]. */
	        get: function () {
	            return MdDirective_1.TYPES[this._type].toLowerCase();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdDirective.prototype, "status", {
	        /** Status of the component life cycle. */
	        get: function () {
	            return MdDirective_1.STATUSES[this._status].toLowerCase();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdDirective.prototype, "md", {
	        /** Alias to value */
	        get: function () {
	            return this.value;
	        },
	        set: function (value) {
	            this.value = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdDirective.prototype, "options", {
	        get: function () {
	            return this.getOptions();
	        },
	        set: function (options) {
	            this.setOptions(options);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdDirective.prototype.ngOnInit = function () {
	        if (this._type === MdDirective_1.TYPES.NONE && !utils_1.default.isEmpty(this._elementRef.nativeElement.innerText)) {
	            var value = this._elementRef.nativeElement.innerHTML;
	            this.setValue(value, MdDirective_1.TYPES.CONTENT);
	        }
	        if (this._status === MdDirective_1.STATUSES.CREATED) {
	            this._status = MdDirective_1.STATUSES.INIT;
	        }
	    };
	    MdDirective.prototype.setValue = function (value, type) {
	        if (type === void 0) { type = MdDirective_1.TYPES.BINDING; }
	        this._value = value;
	        this._type = type;
	        this._onChange();
	    };
	    MdDirective.prototype.setOptions = function (options) {
	        _super.prototype.setOptions.call(this, options);
	        this._onChange();
	    };
	    MdDirective.prototype.compile = function () {
	        if (this._type === MdDirective_1.TYPES.NONE)
	            return;
	        this._status = MdDirective_1.STATUSES.PROCESSING;
	        this._elementRef.nativeElement.innerHTML = this.toHTML();
	        this._status = MdDirective_1.STATUSES.READY;
	    };
	    MdDirective.prototype.registerOnChange = function (fn) {
	        if (!utils_1.default.isFunction(fn))
	            throw new Error('Arg fn is missing or invalid.');
	        this._onChange = fn;
	    };
	    /** Converter the component (md value) to html */
	    MdDirective.prototype.toHTML = function () {
	        var value = this._value;
	        return this.makeHtml(value);
	    };
	    return MdDirective;
	}(base_converter_class_1.BaseConverter));
	MdDirective.TYPES = MD_COMPONENT_TYPES;
	MdDirective.STATUSES = MD_COMPONENT_STATUSES;
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", String),
	    __metadata("design:paramtypes", [String])
	], MdDirective.prototype, "value", null);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", String),
	    __metadata("design:paramtypes", [String])
	], MdDirective.prototype, "md", null);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Object),
	    __metadata("design:paramtypes", [Object])
	], MdDirective.prototype, "options", null);
	MdDirective = MdDirective_1 = __decorate([
	    core_1.Directive({
	        selector: 'md,[md]',
	        inputs: [].concat(optionsProperties)
	    }),
	    __param(1, core_1.Optional()),
	    __metadata("design:paramtypes", [core_1.ElementRef, base_converter_options_provider_1.ConverterOptions])
	], MdDirective);
	exports.MdDirective = MdDirective;
	// define options properties getter setter for angular directive and direct access 
	optionsProperties.forEach(function (key) {
	    Object.defineProperty(MdDirective.prototype, key, {
	        set: function (value) {
	            this.setOption(key, utils_1.default.isEmpty(value) ? true : value);
	        },
	        get: function () {
	            return this.getOption(key);
	        },
	        enumerable: true,
	        configurable: true
	    });
	});
	var MdDirective_1;


/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(4);
	var http_1 = __webpack_require__(33);
	var md_directive_1 = __webpack_require__(74);
	/**
	 * @example
	 * ```javascript
	 * import { NgModule } from '@angular/core';
	 * import { MdDirective, SrcDirective } from 'ng2-md';
	 * @NgModule({
	 *  declarations: [ MdDirective, SrcDirective ];
	 * })
	 * export class AppModule{}
	 * ```
	 * ```html
	 * <md src="README.md"><md/>
	 * ```
	 * ```html
	 * <md src="README.md" [options]="{...} as IConverterOptions"><md/>
	 * ```
	 * ```html
	 * <div md src="README.md"><div/>
	 * ```
	 */
	var SrcDirective = (function () {
	    function SrcDirective(_mdDirective, _http) {
	        this._mdDirective = _mdDirective;
	        this._http = _http;
	    }
	    Object.defineProperty(SrcDirective.prototype, "src", {
	        /** Source of md file */
	        get: function () {
	            return this._src;
	        },
	        set: function (src) {
	            this._src = src;
	            this.load();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SrcDirective.prototype.load = function () {
	        var _this = this;
	        var src = this.src;
	        this._http.get(src).subscribe(function (res) {
	            var value = res.text();
	            _this._mdDirective.setValue(value, md_directive_1.MdDirective.TYPES.SRC);
	        });
	    };
	    return SrcDirective;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", String),
	    __metadata("design:paramtypes", [String])
	], SrcDirective.prototype, "src", null);
	SrcDirective = __decorate([
	    core_1.Directive({
	        selector: 'md[src],[md][src]'
	    }),
	    __metadata("design:paramtypes", [md_directive_1.MdDirective, http_1.Http])
	], SrcDirective);
	exports.SrcDirective = SrcDirective;


/***/ },

/***/ 76:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(4);
	var base_converter_options_provider_1 = __webpack_require__(72);
	var base_converter_class_1 = __webpack_require__(69);
	/**
	 * @example
	 * ```javascript
	 * import { NgModule } from '@angular/core';
	 * import { MdPipe } from 'ng2-md';
	 * @NgModule({
	 *  declarations: [ MdPipe ];
	 * })
	 * export class AppModule{}
	 * ```
	 * ```javascript
	 * import { IConverterOptions } from 'ng2-md';
	 * // ...
	 * md: string = "...";
	 * options: IConverterOptions = {...};
	 * // ...
	 * ```
	 * ```html
	 * {{ md | md }}
	 * ```
	 * ```html
	 * {{ md | md:options}}
	 * ```
	 */
	var MdPipe = (function (_super) {
	    __extends(MdPipe, _super);
	    function MdPipe(options) {
	        return _super.call(this, options) || this;
	    }
	    MdPipe.prototype.transform = function (md, options) {
	        if (md === void 0) { md = ''; }
	        this.setOptions(options);
	        return this.makeHtml(md);
	    };
	    return MdPipe;
	}(base_converter_class_1.BaseConverter));
	MdPipe = __decorate([
	    core_1.Pipe({
	        name: 'md',
	        pure: false
	    }),
	    __param(0, core_1.Optional()),
	    __metadata("design:paramtypes", [base_converter_options_provider_1.ConverterOptions])
	], MdPipe);
	exports.MdPipe = MdPipe;


/***/ },

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var core_1 = __webpack_require__(4);
	var md_directive_1 = __webpack_require__(74);
	var src_directive_1 = __webpack_require__(75);
	var md_pipe_1 = __webpack_require__(76);
	var md_converter_provider_1 = __webpack_require__(73);
	var base_converter_options_provider_1 = __webpack_require__(72);
	var declarations = [
	    md_directive_1.MdDirective,
	    md_pipe_1.MdPipe,
	    src_directive_1.SrcDirective
	];
	/**
	 * @example
	 * ```javascript
	 * import { NgModule } from '@angular/core';
	 * import { MdModule} from 'ng2-md';
	 * @NgModule({
	 *  imports: [ MdModule ];
	 * })
	 * export class AppModule{}
	 */
	var MdModule = (function () {
	    function MdModule() {
	    }
	    return MdModule;
	}());
	MdModule = __decorate([
	    core_1.NgModule({
	        declarations: declarations,
	        providers: [
	            md_converter_provider_1.MdConverter,
	            { provide: base_converter_options_provider_1.ConverterOptions, useClass: base_converter_options_provider_1.BaseConverterOptions }
	        ],
	        exports: declarations
	    })
	], MdModule);
	exports.MdModule = MdModule;


/***/ },

/***/ 78:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=app.js.map