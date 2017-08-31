webpackJsonp([1],{

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
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
exports.default = Utils;


/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(8);
var utils_1 = __webpack_require__(140);
var base_converter_options_provider_1 = __webpack_require__(73);
var base_converter_class_1 = __webpack_require__(96);
var optionsProperties = [
    'customizedHeaderId', 'backslashEscapesHTMLTags', 'disableForced4SpacesIndentedSublists', 'encodeEmails', 'excludeTrailingPunctuationFromURLs', 'ghCodeBlocks', 'ghCompatibleHeaderId', 'ghMentions', 'ghMentionsLink', 'headerLevelStart', 'literalMidWordAsterisks', 'literalMidWordUnderscores', 'noHeaderId', 'omitExtraWLInCodeBlocks', 'openLinksInNewWindow', 'parseImgDimensions', 'prefixHeaderId', 'rawHeaderId', 'rawPrefixHeaderId', 'requireSpaceBeforeHeadingText', 'simpleLineBreaks', 'simplifiedAutoLink', 'smartIndentationFix', 'smoothLivePreview', 'strikethrough', 'tables', 'tablesHeaderId', 'tasklists', 'trimEachLine'
];
var SHOWDOWN_DIRECTIVE_TYPES;
(function (SHOWDOWN_DIRECTIVE_TYPES) {
    SHOWDOWN_DIRECTIVE_TYPES[SHOWDOWN_DIRECTIVE_TYPES["NONE"] = 0] = "NONE";
    SHOWDOWN_DIRECTIVE_TYPES[SHOWDOWN_DIRECTIVE_TYPES["SRC"] = 1] = "SRC";
    SHOWDOWN_DIRECTIVE_TYPES[SHOWDOWN_DIRECTIVE_TYPES["BINDING"] = 2] = "BINDING";
    SHOWDOWN_DIRECTIVE_TYPES[SHOWDOWN_DIRECTIVE_TYPES["CONTENT"] = 3] = "CONTENT";
})(SHOWDOWN_DIRECTIVE_TYPES = exports.SHOWDOWN_DIRECTIVE_TYPES || (exports.SHOWDOWN_DIRECTIVE_TYPES = {}));
var SHOWDOWN_DIRECTIVE_STATUSES;
(function (SHOWDOWN_DIRECTIVE_STATUSES) {
    SHOWDOWN_DIRECTIVE_STATUSES[SHOWDOWN_DIRECTIVE_STATUSES["CREATED"] = 0] = "CREATED";
    SHOWDOWN_DIRECTIVE_STATUSES[SHOWDOWN_DIRECTIVE_STATUSES["INIT"] = 1] = "INIT";
    SHOWDOWN_DIRECTIVE_STATUSES[SHOWDOWN_DIRECTIVE_STATUSES["PROCESSING"] = 2] = "PROCESSING";
    SHOWDOWN_DIRECTIVE_STATUSES[SHOWDOWN_DIRECTIVE_STATUSES["READY"] = 3] = "READY";
})(SHOWDOWN_DIRECTIVE_STATUSES = exports.SHOWDOWN_DIRECTIVE_STATUSES || (exports.SHOWDOWN_DIRECTIVE_STATUSES = {}));
/**
 * @problem in content use <showdown>{}</showdown> - [unescaped "{":](https://github.com/angular/angular/issues/11859) the solution is to sanitize (html char code etc.).
 *
 * @example
 * ```javascript
 * import { NgModule } from '@angular/core';
 * import { ShowdownDirective } from 'ngx-showdown';
 * @NgModule({
 *  declarations: [ ShowdownDirective ];
 * })
 * export class AppModule{}
 * ```
 * ```javascript
 * import { IConverterOptionsChangeable } from 'ngx-showdown';
 * // ...
 * text: string = "...";
 * options: IConverterOptionsChangeable = {...};
 * // ...
 * ```
 * ```html
 * <showdown [value]="text"></showdown>
 * ```
 * ```html
 * <div showdown="text"></div>
 * ```
 * ```html
 * <showdown [value]="text" [options]="options"></showdown>
 * ```
 * ```html
 * <showdown [value]="text" [disableForced4SpacesIndentedSublists]="options.disableForced4SpacesIndentedSublists" [encodeEmails]="options.encodeEmails" [excludeTrailingPunctuationFromURLs]="options.excludeTrailingPunctuationFromURLs" [ghCodeBlocks]="options.ghCodeBlocks" [ghCompatibleHeaderId]="options.ghCompatibleHeaderId" [ghMentions]="options.ghMentions" [ghMentionsLink]="options.ghMentionsLink" [headerLevelStart]="options.headerLevelStart" [literalMidWordUnderscores]="options.literalMidWordUnderscores" [noHeaderId]="options.noHeaderId" [omitExtraWLInCodeBlocks]="options.omitExtraWLInCodeBlocks" [parseImgDimensions]="options.parseImgDimensions" [prefixHeaderId]="options.prefixHeaderId" [requireSpaceBeforeHeadingText]="options.requireSpaceBeforeHeadingText" [simpleLineBreaks]="options.simpleLineBreaks" [simplifiedAutoLink]="options.simplifiedAutoLink" [smartIndentationFix]="options.smartIndentationFix" [smoothLivePreview]="options.smoothLivePreview" [strikethrough]="options.strikethrough" [tables]="options.tables" [tablesHeaderId]="options.tablesHeaderId" [tasklists]="options.tasklists" [trimEachLine]="options.trimEachLine"></showdown>
 * ```
 * ```html
 * <showdown trimEachLine="space"> # abc </showdown> // <showdown><h1>abc</h1></showdown>
 * ```
 * ```html
 * <showdown trimEachLine="tab">\t# abc\t</showdown> // <showdown><h1>abc</h1></showdown>
 * ```
 * both tab and space
 * ```html
 * <showdown trimEachLine>\t # abc\t </showdown> // <showdown><h1>abc</h1></showdown>
 * ```
 */
var ShowdownDirective = /** @class */ (function (_super) {
    __extends(ShowdownDirective, _super);
    function ShowdownDirective(_elementRef, options) {
        var _this = _super.call(this, options) || this;
        _this._elementRef = _elementRef;
        _this._type = ShowdownDirective_1.TYPES.NONE;
        _this._status = ShowdownDirective_1.STATUSES.CREATED;
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
    ShowdownDirective_1 = ShowdownDirective;
    Object.defineProperty(ShowdownDirective.prototype, "value", {
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
    Object.defineProperty(ShowdownDirective.prototype, "type", {
        /** Type of the input source [binding, content, src]. */
        get: function () {
            return ShowdownDirective_1.TYPES[this._type].toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShowdownDirective.prototype, "status", {
        /** Status of the component life cycle. */
        get: function () {
            return ShowdownDirective_1.STATUSES[this._status].toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShowdownDirective.prototype, "showdown", {
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
    Object.defineProperty(ShowdownDirective.prototype, "options", {
        get: function () {
            return this.getOptions();
        },
        set: function (options) {
            this.setOptions(options);
        },
        enumerable: true,
        configurable: true
    });
    ShowdownDirective.prototype.ngOnInit = function () {
        if (this._type === ShowdownDirective_1.TYPES.NONE && !utils_1.default.isEmpty(this._elementRef.nativeElement.innerText)) {
            var value = this._elementRef.nativeElement.innerHTML;
            this.setValue(value, ShowdownDirective_1.TYPES.CONTENT);
        }
        if (this._status === ShowdownDirective_1.STATUSES.CREATED) {
            this._status = ShowdownDirective_1.STATUSES.INIT;
        }
    };
    ShowdownDirective.prototype.setValue = function (value, type) {
        if (type === void 0) { type = ShowdownDirective_1.TYPES.BINDING; }
        this._value = value;
        this._type = type;
        this._onChange();
    };
    ShowdownDirective.prototype.setOptions = function (options) {
        _super.prototype.setOptions.call(this, options);
        this._onChange();
    };
    ShowdownDirective.prototype.compile = function () {
        if (this._type === ShowdownDirective_1.TYPES.NONE)
            return;
        this._status = ShowdownDirective_1.STATUSES.PROCESSING;
        this._elementRef.nativeElement.innerHTML = this.toHTML();
        this._status = ShowdownDirective_1.STATUSES.READY;
    };
    ShowdownDirective.prototype.registerOnChange = function (fn) {
        if (!utils_1.default.isFunction(fn))
            throw new Error('Arg fn is missing or invalid.');
        this._onChange = fn;
    };
    /** Converter the component (md value) to html */
    ShowdownDirective.prototype.toHTML = function () {
        var value = this._value;
        return this.makeHtml(value);
    };
    ShowdownDirective.TYPES = SHOWDOWN_DIRECTIVE_TYPES;
    ShowdownDirective.STATUSES = SHOWDOWN_DIRECTIVE_STATUSES;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ShowdownDirective.prototype, "value", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ShowdownDirective.prototype, "showdown", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ShowdownDirective.prototype, "options", null);
    ShowdownDirective = ShowdownDirective_1 = __decorate([
        core_1.Directive({
            selector: 'showdown,[showdown]',
            inputs: [].concat(optionsProperties)
        }),
        __param(1, core_1.Optional()),
        __metadata("design:paramtypes", [core_1.ElementRef, base_converter_options_provider_1.ConverterOptions])
    ], ShowdownDirective);
    return ShowdownDirective;
    var ShowdownDirective_1;
}(base_converter_class_1.BaseConverter));
exports.ShowdownDirective = ShowdownDirective;
// define options properties getter setter for angular directive and direct access
optionsProperties.forEach(function (key) {
    Object.defineProperty(ShowdownDirective.prototype, key, {
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


/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(8);
var base_converter_options_provider_1 = __webpack_require__(73);
var base_converter_class_1 = __webpack_require__(96);
/**
 * @example
 * ```javascript
 * import { ShowdownConverter } from 'ngx-showdown';
 * class Some{
 *  constructor(showdownConverter: ShowdownConverter){
 *      console.log(showdownConverter.makeHtml("..."));
 *  }
 * }
 * ```
 */
var ShowdownConverter = /** @class */ (function (_super) {
    __extends(ShowdownConverter, _super);
    function ShowdownConverter(options) {
        return _super.call(this, options) || this;
    }
    ShowdownConverter = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()),
        __metadata("design:paramtypes", [base_converter_options_provider_1.ConverterOptions])
    ], ShowdownConverter);
    return ShowdownConverter;
}(base_converter_class_1.BaseConverter));
exports.ShowdownConverter = ShowdownConverter;


/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(8);
var http_1 = __webpack_require__(127);
var showdown_directive_1 = __webpack_require__(141);
/**
 * @example
 * ```javascript
 * import { NgModule } from '@angular/core';
 * import { ShowdownDirective, SrcDirective } from 'ngx-showdown';
 * @NgModule({
 *  declarations: [ ShowdownDirective, SrcDirective ];
 * })
 * export class AppModule{}
 * ```
 * ```html
 * <showdown src="README.md"></showdown>
 * ```
 * ```html
 * <showdown src="README.md" [options]="{...} as IConverterOptionsChangeable"></showdown>
 * ```
 * ```html
 * <div showdown src="README.md"></div>
 * ```
 */
var SrcDirective = /** @class */ (function () {
    function SrcDirective(_showdownDirective, _http) {
        this._showdownDirective = _showdownDirective;
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
            _this._showdownDirective.setValue(value, showdown_directive_1.ShowdownDirective.TYPES.SRC);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SrcDirective.prototype, "src", null);
    SrcDirective = __decorate([
        core_1.Directive({
            selector: 'showdown[src],[showdown][src]'
        }),
        __metadata("design:paramtypes", [showdown_directive_1.ShowdownDirective, http_1.Http])
    ], SrcDirective);
    return SrcDirective;
}());
exports.SrcDirective = SrcDirective;


/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(8);
var base_converter_options_provider_1 = __webpack_require__(73);
var base_converter_class_1 = __webpack_require__(96);
/**
 * @example
 * ```javascript
 * import { NgModule } from '@angular/core';
 * import { ShowdownPipe } from 'ngx-showdown';
 * @NgModule({
 *  declarations: [ ShowdownPipe ];
 * })
 * export class AppModule{}
 * ```
 * ```javascript
 * import { IConverterOptionsChangeable } from 'ngx-showdown';
 * // ...
 * text: string = "...";
 * options: IConverterOptionsChangeable = {...};
 * // ...
 * ```
 * ```html
 * {{ text | showdown }}
 * ```
 * ```html
 * {{ text | showdown:options}}
 * ```
 */
var ShowdownPipe = /** @class */ (function (_super) {
    __extends(ShowdownPipe, _super);
    function ShowdownPipe(options) {
        return _super.call(this, options) || this;
    }
    ShowdownPipe.prototype.transform = function (md, options) {
        if (md === void 0) { md = ''; }
        this.setOptions(options);
        return this.makeHtml(md);
    };
    ShowdownPipe = __decorate([
        core_1.Pipe({
            name: 'showdown',
            pure: false
        }),
        __param(0, core_1.Optional()),
        __metadata("design:paramtypes", [base_converter_options_provider_1.ConverterOptions])
    ], ShowdownPipe);
    return ShowdownPipe;
}(base_converter_class_1.BaseConverter));
exports.ShowdownPipe = ShowdownPipe;


/***/ }),

/***/ 652:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = __webpack_require__(182);
var core_1 = __webpack_require__(8);
var app_module_1 = __webpack_require__(653);
__webpack_require__(662);
if (process.env.ENV === 'production') {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ }),

/***/ 653:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(8);
var forms_1 = __webpack_require__(200);
var platform_browser_1 = __webpack_require__(38);
var animations_1 = __webpack_require__(654);
var material_1 = __webpack_require__(190);
var app_component_1 = __webpack_require__(656);
var src_1 = __webpack_require__(659);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                src_1.ShowdownModule,
                // material
                material_1.MdInputModule,
                material_1.MdSlideToggleModule,
                material_1.MdSliderModule,
                material_1.MdToolbarModule,
                material_1.MdButtonModule,
                material_1.MdListModule,
                material_1.MdSidenavModule,
                material_1.MdIconModule
            ],
            declarations: [
                app_component_1.AppComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ 654:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserAnimationsModule", function() { return BrowserAnimationsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoopAnimationsModule", function() { return NoopAnimationsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵBrowserAnimationBuilder", function() { return BrowserAnimationBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵBrowserAnimationFactory", function() { return BrowserAnimationFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵAnimationRenderer", function() { return AnimationRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵAnimationRendererFactory", function() { return AnimationRendererFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return BaseAnimationRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵf", function() { return BROWSER_ANIMATIONS_PROVIDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵg", function() { return BROWSER_NOOP_ANIMATIONS_PROVIDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return InjectableAnimationEngine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function() { return instantiateDefaultStyleNormalizer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵe", function() { return instantiateRendererFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return instantiateSupportedAnimationDriver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_animations__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__ = __webpack_require__(655);

/**
 * @license Angular v4.3.6
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */




/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var BrowserAnimationBuilder = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](BrowserAnimationBuilder, _super);
    /**
     * @param {?} rootRenderer
     * @param {?} doc
     */
    function BrowserAnimationBuilder(rootRenderer, doc) {
        var _this = _super.call(this) || this;
        _this._nextAnimationId = 0;
        var typeData = {
            id: '0',
            encapsulation: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewEncapsulation"].None,
            styles: [],
            data: { animation: [] }
        };
        _this._renderer = rootRenderer.createRenderer(doc.body, typeData);
        return _this;
    }
    /**
     * @param {?} animation
     * @return {?}
     */
    BrowserAnimationBuilder.prototype.build = function (animation) {
        var /** @type {?} */ id = this._nextAnimationId.toString();
        this._nextAnimationId++;
        var /** @type {?} */ entry = Array.isArray(animation) ? Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["f" /* sequence */])(animation) : animation;
        issueAnimationCommand(this._renderer, null, id, 'register', [entry]);
        return new BrowserAnimationFactory(id, this._renderer);
    };
    return BrowserAnimationBuilder;
}(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["b" /* AnimationBuilder */]));
BrowserAnimationBuilder.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
BrowserAnimationBuilder.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["RendererFactory2"], },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["DOCUMENT"],] },] },
]; };
var BrowserAnimationFactory = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](BrowserAnimationFactory, _super);
    /**
     * @param {?} _id
     * @param {?} _renderer
     */
    function BrowserAnimationFactory(_id, _renderer) {
        var _this = _super.call(this) || this;
        _this._id = _id;
        _this._renderer = _renderer;
        return _this;
    }
    /**
     * @param {?} element
     * @param {?=} options
     * @return {?}
     */
    BrowserAnimationFactory.prototype.create = function (element, options) {
        return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
    };
    return BrowserAnimationFactory;
}(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["c" /* AnimationFactory */]));
var RendererAnimationPlayer = (function () {
    /**
     * @param {?} id
     * @param {?} element
     * @param {?} options
     * @param {?} _renderer
     */
    function RendererAnimationPlayer(id, element, options, _renderer) {
        this.id = id;
        this.element = element;
        this._renderer = _renderer;
        this.parentPlayer = null;
        this._started = false;
        this.totalTime = 0;
        this._command('create', options);
    }
    /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    RendererAnimationPlayer.prototype._listen = function (eventName, callback) {
        return this._renderer.listen(this.element, "@@" + this.id + ":" + eventName, callback);
    };
    /**
     * @param {?} command
     * @param {...?} args
     * @return {?}
     */
    RendererAnimationPlayer.prototype._command = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return issueAnimationCommand(this._renderer, this.element, this.id, command, args);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    RendererAnimationPlayer.prototype.onDone = function (fn) { this._listen('done', fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    RendererAnimationPlayer.prototype.onStart = function (fn) { this._listen('start', fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    RendererAnimationPlayer.prototype.onDestroy = function (fn) { this._listen('destroy', fn); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.init = function () { this._command('init'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.hasStarted = function () { return this._started; };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.play = function () {
        this._command('play');
        this._started = true;
    };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.pause = function () { this._command('pause'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.restart = function () { this._command('restart'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.finish = function () { this._command('finish'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.destroy = function () { this._command('destroy'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.reset = function () { this._command('reset'); };
    /**
     * @param {?} p
     * @return {?}
     */
    RendererAnimationPlayer.prototype.setPosition = function (p) { this._command('setPosition', p); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.getPosition = function () { return 0; };
    return RendererAnimationPlayer;
}());
/**
 * @param {?} renderer
 * @param {?} element
 * @param {?} id
 * @param {?} command
 * @param {?} args
 * @return {?}
 */
function issueAnimationCommand(renderer, element, id, command, args) {
    return renderer.setProperty(element, "@@" + id + ":" + command, args);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ANIMATION_PREFIX = '@';
var DISABLE_ANIMATIONS_FLAG = '@.disabled';
var AnimationRendererFactory = (function () {
    /**
     * @param {?} delegate
     * @param {?} engine
     * @param {?} _zone
     */
    function AnimationRendererFactory(delegate, engine, _zone) {
        this.delegate = delegate;
        this.engine = engine;
        this._zone = _zone;
        this._currentId = 0;
        this._microtaskId = 1;
        this._animationCallbacksBuffer = [];
        this._rendererCache = new Map();
        this._cdRecurDepth = 0;
        engine.onRemovalComplete = function (element, delegate) {
            // Note: if an component element has a leave animation, and the component
            // a host leave animation, the view engine will call `removeChild` for the parent
            // component renderer as well as for the child component renderer.
            // Therefore, we need to check if we already removed the element.
            if (delegate && delegate.parentNode(element)) {
                delegate.removeChild(element.parentNode, element);
            }
        };
    }
    /**
     * @param {?} hostElement
     * @param {?} type
     * @return {?}
     */
    AnimationRendererFactory.prototype.createRenderer = function (hostElement, type) {
        var _this = this;
        var /** @type {?} */ EMPTY_NAMESPACE_ID = '';
        // cache the delegates to find out which cached delegate can
        // be used by which cached renderer
        var /** @type {?} */ delegate = this.delegate.createRenderer(hostElement, type);
        if (!hostElement || !type || !type.data || !type.data['animation']) {
            var /** @type {?} */ renderer = this._rendererCache.get(delegate);
            if (!renderer) {
                renderer = new BaseAnimationRenderer(EMPTY_NAMESPACE_ID, delegate, this.engine);
                // only cache this result when the base renderer is used
                this._rendererCache.set(delegate, renderer);
            }
            return renderer;
        }
        var /** @type {?} */ componentId = type.id;
        var /** @type {?} */ namespaceId = type.id + '-' + this._currentId;
        this._currentId++;
        this.engine.register(namespaceId, hostElement);
        var /** @type {?} */ animationTriggers = (type.data['animation']);
        animationTriggers.forEach(function (trigger) { return _this.engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger); });
        return new AnimationRenderer(this, namespaceId, delegate, this.engine);
    };
    /**
     * @return {?}
     */
    AnimationRendererFactory.prototype.begin = function () {
        this._cdRecurDepth++;
        if (this.delegate.begin) {
            this.delegate.begin();
        }
    };
    /**
     * @return {?}
     */
    AnimationRendererFactory.prototype._scheduleCountTask = function () {
        var _this = this;
        Zone.current.scheduleMicroTask('incremenet the animation microtask', function () { return _this._microtaskId++; });
    };
    /**
     * @param {?} count
     * @param {?} fn
     * @param {?} data
     * @return {?}
     */
    AnimationRendererFactory.prototype.scheduleListenerCallback = function (count, fn, data) {
        var _this = this;
        if (count >= 0 && count < this._microtaskId) {
            this._zone.run(function () { return fn(data); });
            return;
        }
        if (this._animationCallbacksBuffer.length == 0) {
            Promise.resolve(null).then(function () {
                _this._zone.run(function () {
                    _this._animationCallbacksBuffer.forEach(function (tuple) {
                        var fn = tuple[0], data = tuple[1];
                        fn(data);
                    });
                    _this._animationCallbacksBuffer = [];
                });
            });
        }
        this._animationCallbacksBuffer.push([fn, data]);
    };
    /**
     * @return {?}
     */
    AnimationRendererFactory.prototype.end = function () {
        var _this = this;
        this._cdRecurDepth--;
        // this is to prevent animations from running twice when an inner
        // component does CD when a parent component insted has inserted it
        if (this._cdRecurDepth == 0) {
            this._zone.runOutsideAngular(function () {
                _this._scheduleCountTask();
                _this.engine.flush(_this._microtaskId);
            });
        }
        if (this.delegate.end) {
            this.delegate.end();
        }
    };
    /**
     * @return {?}
     */
    AnimationRendererFactory.prototype.whenRenderingDone = function () { return this.engine.whenRenderingDone(); };
    return AnimationRendererFactory;
}());
AnimationRendererFactory.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
AnimationRendererFactory.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["RendererFactory2"], },
    { type: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["b" /* ɵAnimationEngine */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"], },
]; };
var BaseAnimationRenderer = (function () {
    /**
     * @param {?} namespaceId
     * @param {?} delegate
     * @param {?} engine
     */
    function BaseAnimationRenderer(namespaceId, delegate, engine) {
        this.namespaceId = namespaceId;
        this.delegate = delegate;
        this.engine = engine;
        this.destroyNode = this.delegate.destroyNode ? function (n) { return delegate.destroyNode(n); } : null;
    }
    Object.defineProperty(BaseAnimationRenderer.prototype, "data", {
        /**
         * @return {?}
         */
        get: function () { return this.delegate.data; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BaseAnimationRenderer.prototype.destroy = function () {
        this.engine.destroy(this.namespaceId, this.delegate);
        this.delegate.destroy();
    };
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    BaseAnimationRenderer.prototype.createElement = function (name, namespace) {
        return this.delegate.createElement(name, namespace);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    BaseAnimationRenderer.prototype.createComment = function (value) { return this.delegate.createComment(value); };
    /**
     * @param {?} value
     * @return {?}
     */
    BaseAnimationRenderer.prototype.createText = function (value) { return this.delegate.createText(value); };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    BaseAnimationRenderer.prototype.appendChild = function (parent, newChild) {
        this.delegate.appendChild(parent, newChild);
        this.engine.onInsert(this.namespaceId, newChild, parent, false);
    };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    BaseAnimationRenderer.prototype.insertBefore = function (parent, newChild, refChild) {
        this.delegate.insertBefore(parent, newChild, refChild);
        this.engine.onInsert(this.namespaceId, newChild, parent, true);
    };
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    BaseAnimationRenderer.prototype.removeChild = function (parent, oldChild) {
        this.engine.onRemove(this.namespaceId, oldChild, this.delegate);
    };
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    BaseAnimationRenderer.prototype.selectRootElement = function (selectorOrNode) { return this.delegate.selectRootElement(selectorOrNode); };
    /**
     * @param {?} node
     * @return {?}
     */
    BaseAnimationRenderer.prototype.parentNode = function (node) { return this.delegate.parentNode(node); };
    /**
     * @param {?} node
     * @return {?}
     */
    BaseAnimationRenderer.prototype.nextSibling = function (node) { return this.delegate.nextSibling(node); };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    BaseAnimationRenderer.prototype.setAttribute = function (el, name, value, namespace) {
        this.delegate.setAttribute(el, name, value, namespace);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    BaseAnimationRenderer.prototype.removeAttribute = function (el, name, namespace) {
        this.delegate.removeAttribute(el, name, namespace);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    BaseAnimationRenderer.prototype.addClass = function (el, name) { this.delegate.addClass(el, name); };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    BaseAnimationRenderer.prototype.removeClass = function (el, name) { this.delegate.removeClass(el, name); };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?=} flags
     * @return {?}
     */
    BaseAnimationRenderer.prototype.setStyle = function (el, style, value, flags) {
        this.delegate.setStyle(el, style, value, flags);
    };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?=} flags
     * @return {?}
     */
    BaseAnimationRenderer.prototype.removeStyle = function (el, style, flags) {
        this.delegate.removeStyle(el, style, flags);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    BaseAnimationRenderer.prototype.setProperty = function (el, name, value) {
        if (name.charAt(0) == ANIMATION_PREFIX && name == DISABLE_ANIMATIONS_FLAG) {
            this.disableAnimations(el, !!value);
        }
        else {
            this.delegate.setProperty(el, name, value);
        }
    };
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    BaseAnimationRenderer.prototype.setValue = function (node, value) { this.delegate.setValue(node, value); };
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    BaseAnimationRenderer.prototype.listen = function (target, eventName, callback) {
        return this.delegate.listen(target, eventName, callback);
    };
    /**
     * @param {?} element
     * @param {?} value
     * @return {?}
     */
    BaseAnimationRenderer.prototype.disableAnimations = function (element, value) {
        this.engine.disableAnimations(element, value);
    };
    return BaseAnimationRenderer;
}());
var AnimationRenderer = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](AnimationRenderer, _super);
    /**
     * @param {?} factory
     * @param {?} namespaceId
     * @param {?} delegate
     * @param {?} engine
     */
    function AnimationRenderer(factory, namespaceId, delegate, engine) {
        var _this = _super.call(this, namespaceId, delegate, engine) || this;
        _this.factory = factory;
        _this.namespaceId = namespaceId;
        return _this;
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    AnimationRenderer.prototype.setProperty = function (el, name, value) {
        if (name.charAt(0) == ANIMATION_PREFIX) {
            if (name.charAt(1) == '.' && name == DISABLE_ANIMATIONS_FLAG) {
                value = value === undefined ? true : !!value;
                this.disableAnimations(el, /** @type {?} */ (value));
            }
            else {
                this.engine.process(this.namespaceId, el, name.substr(1), value);
            }
        }
        else {
            this.delegate.setProperty(el, name, value);
        }
    };
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    AnimationRenderer.prototype.listen = function (target, eventName, callback) {
        var _this = this;
        if (eventName.charAt(0) == ANIMATION_PREFIX) {
            var /** @type {?} */ element = resolveElementFromTarget(target);
            var /** @type {?} */ name = eventName.substr(1);
            var /** @type {?} */ phase = '';
            // @listener.phase is for trigger animation callbacks
            // @@listener is for animation builder callbacks
            if (name.charAt(0) != ANIMATION_PREFIX) {
                _a = parseTriggerCallbackName(name), name = _a[0], phase = _a[1];
            }
            return this.engine.listen(this.namespaceId, element, name, phase, function (event) {
                var /** @type {?} */ countId = ((event))['_data'] || -1;
                _this.factory.scheduleListenerCallback(countId, callback, event);
            });
        }
        return this.delegate.listen(target, eventName, callback);
        var _a;
    };
    return AnimationRenderer;
}(BaseAnimationRenderer));
/**
 * @param {?} target
 * @return {?}
 */
function resolveElementFromTarget(target) {
    switch (target) {
        case 'body':
            return document.body;
        case 'document':
            return document;
        case 'window':
            return window;
        default:
            return target;
    }
}
/**
 * @param {?} triggerName
 * @return {?}
 */
function parseTriggerCallbackName(triggerName) {
    var /** @type {?} */ dotIndex = triggerName.indexOf('.');
    var /** @type {?} */ trigger = triggerName.substring(0, dotIndex);
    var /** @type {?} */ phase = triggerName.substr(dotIndex + 1);
    return [trigger, phase];
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var InjectableAnimationEngine = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](InjectableAnimationEngine, _super);
    /**
     * @param {?} driver
     * @param {?} normalizer
     */
    function InjectableAnimationEngine(driver, normalizer) {
        return _super.call(this, driver, normalizer) || this;
    }
    return InjectableAnimationEngine;
}(__WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["b" /* ɵAnimationEngine */]));
InjectableAnimationEngine.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
InjectableAnimationEngine.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["a" /* AnimationDriver */], },
    { type: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["c" /* ɵAnimationStyleNormalizer */], },
]; };
/**
 * @return {?}
 */
function instantiateSupportedAnimationDriver() {
    if (Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["g" /* ɵsupportsWebAnimations */])()) {
        return new __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["e" /* ɵWebAnimationsDriver */]();
    }
    return new __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["d" /* ɵNoopAnimationDriver */]();
}
/**
 * @return {?}
 */
function instantiateDefaultStyleNormalizer() {
    return new __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["f" /* ɵWebAnimationsStyleNormalizer */]();
}
/**
 * @param {?} renderer
 * @param {?} engine
 * @param {?} zone
 * @return {?}
 */
function instantiateRendererFactory(renderer, engine, zone) {
    return new AnimationRendererFactory(renderer, engine, zone);
}
var SHARED_ANIMATION_PROVIDERS = [
    { provide: __WEBPACK_IMPORTED_MODULE_3__angular_animations__["b" /* AnimationBuilder */], useClass: BrowserAnimationBuilder },
    { provide: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["c" /* ɵAnimationStyleNormalizer */], useFactory: instantiateDefaultStyleNormalizer },
    { provide: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["b" /* ɵAnimationEngine */], useClass: InjectableAnimationEngine }, {
        provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["RendererFactory2"],
        useFactory: instantiateRendererFactory,
        deps: [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["ɵDomRendererFactory2"], __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["b" /* ɵAnimationEngine */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"]]
    }
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserModule.
 */
var BROWSER_ANIMATIONS_PROVIDERS = [
    { provide: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["a" /* AnimationDriver */], useFactory: instantiateSupportedAnimationDriver }
].concat(SHARED_ANIMATION_PROVIDERS);
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserTestingModule.
 */
var BROWSER_NOOP_ANIMATIONS_PROVIDERS = [{ provide: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["a" /* AnimationDriver */], useClass: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["d" /* ɵNoopAnimationDriver */] }].concat(SHARED_ANIMATION_PROVIDERS);
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@experimental Animation support is experimental.
 */
var BrowserAnimationsModule = (function () {
    function BrowserAnimationsModule() {
    }
    return BrowserAnimationsModule;
}());
BrowserAnimationsModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"], args: [{
                exports: [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["BrowserModule"]],
                providers: BROWSER_ANIMATIONS_PROVIDERS,
            },] },
];
/**
 * @nocollapse
 */
BrowserAnimationsModule.ctorParameters = function () { return []; };
/**
 * \@experimental Animation support is experimental.
 */
var NoopAnimationsModule = (function () {
    function NoopAnimationsModule() {
    }
    return NoopAnimationsModule;
}());
NoopAnimationsModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"], args: [{
                exports: [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["BrowserModule"]],
                providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
            },] },
];
/**
 * @nocollapse
 */
NoopAnimationsModule.ctorParameters = function () { return []; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all animation APIs of the animation browser package.
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the animation package.
 */
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=animations.es5.js.map


/***/ }),

/***/ 655:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationDriver; });
/* unused harmony export ɵAnimation */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AnimationStyleNormalizer; });
/* unused harmony export ɵNoopAnimationStyleNormalizer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return WebAnimationsStyleNormalizer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NoopAnimationDriver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AnimationEngine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return WebAnimationsDriver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return supportsWebAnimations; });
/* unused harmony export ɵWebAnimationsPlayer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(137);

/**
 * @license Angular v4.3.6
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function optimizeGroupPlayer(players) {
    switch (players.length) {
        case 0:
            return new __WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* NoopAnimationPlayer */]();
        case 1:
            return players[0];
        default:
            return new __WEBPACK_IMPORTED_MODULE_1__angular_animations__["k" /* ɵAnimationGroupPlayer */](players);
    }
}
function normalizeKeyframes(driver, normalizer, element, keyframes, preStyles, postStyles) {
    if (preStyles === void 0) { preStyles = {}; }
    if (postStyles === void 0) { postStyles = {}; }
    var errors = [];
    var normalizedKeyframes = [];
    var previousOffset = -1;
    var previousKeyframe = null;
    keyframes.forEach(function (kf) {
        var offset = kf['offset'];
        var isSameOffset = offset == previousOffset;
        var normalizedKeyframe = (isSameOffset && previousKeyframe) || {};
        Object.keys(kf).forEach(function (prop) {
            var normalizedProp = prop;
            var normalizedValue = kf[prop];
            if (prop !== 'offset') {
                normalizedProp = normalizer.normalizePropertyName(normalizedProp, errors);
                switch (normalizedValue) {
                    case __WEBPACK_IMPORTED_MODULE_1__angular_animations__["l" /* ɵPRE_STYLE */]:
                        normalizedValue = preStyles[prop];
                        break;
                    case __WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* AUTO_STYLE */]:
                        normalizedValue = postStyles[prop];
                        break;
                    default:
                        normalizedValue =
                            normalizer.normalizeStyleValue(prop, normalizedProp, normalizedValue, errors);
                        break;
                }
            }
            normalizedKeyframe[normalizedProp] = normalizedValue;
        });
        if (!isSameOffset) {
            normalizedKeyframes.push(normalizedKeyframe);
        }
        previousKeyframe = normalizedKeyframe;
        previousOffset = offset;
    });
    if (errors.length) {
        var LINE_START = '\n - ';
        throw new Error("Unable to animate due to the following errors:" + LINE_START + errors.join(LINE_START));
    }
    return normalizedKeyframes;
}
function listenOnPlayer(player, eventName, event, callback) {
    switch (eventName) {
        case 'start':
            player.onStart(function () { return callback(event && copyAnimationEvent(event, 'start', player.totalTime)); });
            break;
        case 'done':
            player.onDone(function () { return callback(event && copyAnimationEvent(event, 'done', player.totalTime)); });
            break;
        case 'destroy':
            player.onDestroy(function () { return callback(event && copyAnimationEvent(event, 'destroy', player.totalTime)); });
            break;
    }
}
function copyAnimationEvent(e, phaseName, totalTime) {
    var event = makeAnimationEvent(e.element, e.triggerName, e.fromState, e.toState, phaseName || e.phaseName, totalTime == undefined ? e.totalTime : totalTime);
    var data = e['_data'];
    if (data != null) {
        event['_data'] = data;
    }
    return event;
}
function makeAnimationEvent(element, triggerName, fromState, toState, phaseName, totalTime) {
    if (phaseName === void 0) { phaseName = ''; }
    if (totalTime === void 0) { totalTime = 0; }
    return { element: element, triggerName: triggerName, fromState: fromState, toState: toState, phaseName: phaseName, totalTime: totalTime };
}
function getOrSetAsInMap(map, key, defaultValue) {
    var value;
    if (map instanceof Map) {
        value = map.get(key);
        if (!value) {
            map.set(key, value = defaultValue);
        }
    }
    else {
        value = map[key];
        if (!value) {
            value = map[key] = defaultValue;
        }
    }
    return value;
}
function parseTimelineCommand(command) {
    var separatorPos = command.indexOf(':');
    var id = command.substring(1, separatorPos);
    var action = command.substr(separatorPos + 1);
    return [id, action];
}
var _contains = function (elm1, elm2) { return false; };
var _matches = function (element, selector) { return false; };
var _query = function (element, selector, multi) {
    return [];
};
if (typeof Element != 'undefined') {
    // this is well supported in all browsers
    _contains = function (elm1, elm2) { return elm1.contains(elm2); };
    if (Element.prototype.matches) {
        _matches = function (element, selector) { return element.matches(selector); };
    }
    else {
        var proto = Element.prototype;
        var fn_1 = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector ||
            proto.oMatchesSelector || proto.webkitMatchesSelector;
        if (fn_1) {
            _matches = function (element, selector) { return fn_1.apply(element, [selector]); };
        }
    }
    _query = function (element, selector, multi) {
        var results = [];
        if (multi) {
            results.push.apply(results, element.querySelectorAll(selector));
        }
        else {
            var elm = element.querySelector(selector);
            if (elm) {
                results.push(elm);
            }
        }
        return results;
    };
}
var matchesElement = _matches;
var containsElement = _contains;
var invokeQuery = _query;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @experimental
 */
var NoopAnimationDriver = (function () {
    function NoopAnimationDriver() {
    }
    NoopAnimationDriver.prototype.matchesElement = function (element, selector) {
        return matchesElement(element, selector);
    };
    NoopAnimationDriver.prototype.containsElement = function (elm1, elm2) { return containsElement(elm1, elm2); };
    NoopAnimationDriver.prototype.query = function (element, selector, multi) {
        return invokeQuery(element, selector, multi);
    };
    NoopAnimationDriver.prototype.computeStyle = function (element, prop, defaultValue) {
        return defaultValue || '';
    };
    NoopAnimationDriver.prototype.animate = function (element, keyframes, duration, delay, easing, previousPlayers) {
        if (previousPlayers === void 0) { previousPlayers = []; }
        return new __WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* NoopAnimationPlayer */]();
    };
    return NoopAnimationDriver;
}());
/**
 * @experimental
 */
var AnimationDriver = (function () {
    function AnimationDriver() {
    }
    return AnimationDriver;
}());
AnimationDriver.NOOP = new NoopAnimationDriver();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ONE_SECOND = 1000;
var SUBSTITUTION_EXPR_START = '{{';
var SUBSTITUTION_EXPR_END = '}}';
var ENTER_CLASSNAME = 'ng-enter';
var LEAVE_CLASSNAME = 'ng-leave';
var ENTER_SELECTOR = '.ng-enter';
var LEAVE_SELECTOR = '.ng-leave';
var NG_TRIGGER_CLASSNAME = 'ng-trigger';
var NG_TRIGGER_SELECTOR = '.ng-trigger';
var NG_ANIMATING_CLASSNAME = 'ng-animating';
var NG_ANIMATING_SELECTOR = '.ng-animating';
function resolveTimingValue(value) {
    if (typeof value == 'number')
        return value;
    var matches = value.match(/^(-?[\.\d]+)(m?s)/);
    if (!matches || matches.length < 2)
        return 0;
    return _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
}
function _convertTimeValueToMS(value, unit) {
    switch (unit) {
        case 's':
            return value * ONE_SECOND;
        default:
            return value;
    }
}
function resolveTiming(timings, errors, allowNegativeValues) {
    return timings.hasOwnProperty('duration') ?
        timings :
        parseTimeExpression(timings, errors, allowNegativeValues);
}
function parseTimeExpression(exp, errors, allowNegativeValues) {
    var regex = /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i;
    var duration;
    var delay = 0;
    var easing = '';
    if (typeof exp === 'string') {
        var matches = exp.match(regex);
        if (matches === null) {
            errors.push("The provided timing value \"" + exp + "\" is invalid.");
            return { duration: 0, delay: 0, easing: '' };
        }
        duration = _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
        var delayMatch = matches[3];
        if (delayMatch != null) {
            delay = _convertTimeValueToMS(Math.floor(parseFloat(delayMatch)), matches[4]);
        }
        var easingVal = matches[5];
        if (easingVal) {
            easing = easingVal;
        }
    }
    else {
        duration = exp;
    }
    if (!allowNegativeValues) {
        var containsErrors = false;
        var startIndex = errors.length;
        if (duration < 0) {
            errors.push("Duration values below 0 are not allowed for this animation step.");
            containsErrors = true;
        }
        if (delay < 0) {
            errors.push("Delay values below 0 are not allowed for this animation step.");
            containsErrors = true;
        }
        if (containsErrors) {
            errors.splice(startIndex, 0, "The provided timing value \"" + exp + "\" is invalid.");
        }
    }
    return { duration: duration, delay: delay, easing: easing };
}
function copyObj(obj, destination) {
    if (destination === void 0) { destination = {}; }
    Object.keys(obj).forEach(function (prop) { destination[prop] = obj[prop]; });
    return destination;
}
function normalizeStyles(styles) {
    var normalizedStyles = {};
    if (Array.isArray(styles)) {
        styles.forEach(function (data) { return copyStyles(data, false, normalizedStyles); });
    }
    else {
        copyStyles(styles, false, normalizedStyles);
    }
    return normalizedStyles;
}
function copyStyles(styles, readPrototype, destination) {
    if (destination === void 0) { destination = {}; }
    if (readPrototype) {
        // we make use of a for-in loop so that the
        // prototypically inherited properties are
        // revealed from the backFill map
        for (var prop in styles) {
            destination[prop] = styles[prop];
        }
    }
    else {
        copyObj(styles, destination);
    }
    return destination;
}
function setStyles(element, styles) {
    if (element['style']) {
        Object.keys(styles).forEach(function (prop) {
            var camelProp = dashCaseToCamelCase(prop);
            element.style[camelProp] = styles[prop];
        });
    }
}
function eraseStyles(element, styles) {
    if (element['style']) {
        Object.keys(styles).forEach(function (prop) {
            var camelProp = dashCaseToCamelCase(prop);
            element.style[camelProp] = '';
        });
    }
}
function normalizeAnimationEntry(steps) {
    if (Array.isArray(steps)) {
        if (steps.length == 1)
            return steps[0];
        return Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* sequence */])(steps);
    }
    return steps;
}
function validateStyleParams(value, options, errors) {
    var params = options.params || {};
    var matches = extractStyleParams(value);
    if (matches.length) {
        matches.forEach(function (varName) {
            if (!params.hasOwnProperty(varName)) {
                errors.push("Unable to resolve the local animation param " + varName + " in the given list of values");
            }
        });
    }
}
var PARAM_REGEX = new RegExp(SUBSTITUTION_EXPR_START + "\\s*(.+?)\\s*" + SUBSTITUTION_EXPR_END, 'g');
function extractStyleParams(value) {
    var params = [];
    if (typeof value === 'string') {
        var val = value.toString();
        var match = void 0;
        while (match = PARAM_REGEX.exec(val)) {
            params.push(match[1]);
        }
        PARAM_REGEX.lastIndex = 0;
    }
    return params;
}
function interpolateParams(value, params, errors) {
    var original = value.toString();
    var str = original.replace(PARAM_REGEX, function (_, varName) {
        var localVal = params[varName];
        // this means that the value was never overidden by the data passed in by the user
        if (!params.hasOwnProperty(varName)) {
            errors.push("Please provide a value for the animation param " + varName);
            localVal = '';
        }
        return localVal.toString();
    });
    // we do this to assert that numeric values stay as they are
    return str == original ? value : str;
}
function iteratorToArray(iterator) {
    var arr = [];
    var item = iterator.next();
    while (!item.done) {
        arr.push(item.value);
        item = iterator.next();
    }
    return arr;
}
var DASH_CASE_REGEXP = /-+([a-z0-9])/g;
function dashCaseToCamelCase(input) {
    return input.replace(DASH_CASE_REGEXP, function () {
        var m = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            m[_i] = arguments[_i];
        }
        return m[1].toUpperCase();
    });
}
function allowPreviousPlayerStylesMerge(duration, delay) {
    return duration === 0 || delay === 0;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var EMPTY_ANIMATION_OPTIONS = {};
/**
 * @abstract
 */
var Ast = (function () {
    function Ast() {
        this.options = EMPTY_ANIMATION_OPTIONS;
    }
    /**
     * @abstract
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    Ast.prototype.visit = function (ast, context) { };
    Object.defineProperty(Ast.prototype, "params", {
        /**
         * @return {?}
         */
        get: function () { return this.options['params'] || null; },
        enumerable: true,
        configurable: true
    });
    return Ast;
}());
var TriggerAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](TriggerAst, _super);
    /**
     * @param {?} name
     * @param {?} states
     * @param {?} transitions
     */
    function TriggerAst(name, states, transitions) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.states = states;
        _this.transitions = transitions;
        _this.queryCount = 0;
        _this.depCount = 0;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    TriggerAst.prototype.visit = function (visitor, context) { return visitor.visitTrigger(this, context); };
    return TriggerAst;
}(Ast));
var StateAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](StateAst, _super);
    /**
     * @param {?} name
     * @param {?} style
     */
    function StateAst(name, style$$1) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.style = style$$1;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    StateAst.prototype.visit = function (visitor, context) { return visitor.visitState(this, context); };
    return StateAst;
}(Ast));
var TransitionAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](TransitionAst, _super);
    /**
     * @param {?} matchers
     * @param {?} animation
     */
    function TransitionAst(matchers, animation) {
        var _this = _super.call(this) || this;
        _this.matchers = matchers;
        _this.animation = animation;
        _this.queryCount = 0;
        _this.depCount = 0;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    TransitionAst.prototype.visit = function (visitor, context) { return visitor.visitTransition(this, context); };
    return TransitionAst;
}(Ast));
var SequenceAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](SequenceAst, _super);
    /**
     * @param {?} steps
     */
    function SequenceAst(steps) {
        var _this = _super.call(this) || this;
        _this.steps = steps;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    SequenceAst.prototype.visit = function (visitor, context) { return visitor.visitSequence(this, context); };
    return SequenceAst;
}(Ast));
var GroupAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](GroupAst, _super);
    /**
     * @param {?} steps
     */
    function GroupAst(steps) {
        var _this = _super.call(this) || this;
        _this.steps = steps;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    GroupAst.prototype.visit = function (visitor, context) { return visitor.visitGroup(this, context); };
    return GroupAst;
}(Ast));
var AnimateAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](AnimateAst, _super);
    /**
     * @param {?} timings
     * @param {?} style
     */
    function AnimateAst(timings, style$$1) {
        var _this = _super.call(this) || this;
        _this.timings = timings;
        _this.style = style$$1;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimateAst.prototype.visit = function (visitor, context) { return visitor.visitAnimate(this, context); };
    return AnimateAst;
}(Ast));
var StyleAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](StyleAst, _super);
    /**
     * @param {?} styles
     * @param {?} easing
     * @param {?} offset
     */
    function StyleAst(styles, easing, offset) {
        var _this = _super.call(this) || this;
        _this.styles = styles;
        _this.easing = easing;
        _this.offset = offset;
        _this.isEmptyStep = false;
        _this.containsDynamicStyles = false;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    StyleAst.prototype.visit = function (visitor, context) { return visitor.visitStyle(this, context); };
    return StyleAst;
}(Ast));
var KeyframesAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](KeyframesAst, _super);
    /**
     * @param {?} styles
     */
    function KeyframesAst(styles) {
        var _this = _super.call(this) || this;
        _this.styles = styles;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    KeyframesAst.prototype.visit = function (visitor, context) { return visitor.visitKeyframes(this, context); };
    return KeyframesAst;
}(Ast));
var ReferenceAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](ReferenceAst, _super);
    /**
     * @param {?} animation
     */
    function ReferenceAst(animation) {
        var _this = _super.call(this) || this;
        _this.animation = animation;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    ReferenceAst.prototype.visit = function (visitor, context) { return visitor.visitReference(this, context); };
    return ReferenceAst;
}(Ast));
var AnimateChildAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](AnimateChildAst, _super);
    function AnimateChildAst() {
        return _super.call(this) || this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimateChildAst.prototype.visit = function (visitor, context) { return visitor.visitAnimateChild(this, context); };
    return AnimateChildAst;
}(Ast));
var AnimateRefAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](AnimateRefAst, _super);
    /**
     * @param {?} animation
     */
    function AnimateRefAst(animation) {
        var _this = _super.call(this) || this;
        _this.animation = animation;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimateRefAst.prototype.visit = function (visitor, context) { return visitor.visitAnimateRef(this, context); };
    return AnimateRefAst;
}(Ast));
var QueryAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](QueryAst, _super);
    /**
     * @param {?} selector
     * @param {?} limit
     * @param {?} optional
     * @param {?} includeSelf
     * @param {?} animation
     */
    function QueryAst(selector, limit, optional, includeSelf, animation) {
        var _this = _super.call(this) || this;
        _this.selector = selector;
        _this.limit = limit;
        _this.optional = optional;
        _this.includeSelf = includeSelf;
        _this.animation = animation;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    QueryAst.prototype.visit = function (visitor, context) { return visitor.visitQuery(this, context); };
    return QueryAst;
}(Ast));
var StaggerAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](StaggerAst, _super);
    /**
     * @param {?} timings
     * @param {?} animation
     */
    function StaggerAst(timings, animation) {
        var _this = _super.call(this) || this;
        _this.timings = timings;
        _this.animation = animation;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    StaggerAst.prototype.visit = function (visitor, context) { return visitor.visitStagger(this, context); };
    return StaggerAst;
}(Ast));
var TimingAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](TimingAst, _super);
    /**
     * @param {?} duration
     * @param {?=} delay
     * @param {?=} easing
     */
    function TimingAst(duration, delay, easing) {
        if (delay === void 0) { delay = 0; }
        if (easing === void 0) { easing = null; }
        var _this = _super.call(this) || this;
        _this.duration = duration;
        _this.delay = delay;
        _this.easing = easing;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    TimingAst.prototype.visit = function (visitor, context) { return visitor.visitTiming(this, context); };
    return TimingAst;
}(Ast));
var DynamicTimingAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](DynamicTimingAst, _super);
    /**
     * @param {?} value
     */
    function DynamicTimingAst(value) {
        var _this = _super.call(this, 0, 0, '') || this;
        _this.value = value;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    DynamicTimingAst.prototype.visit = function (visitor, context) { return visitor.visitTiming(this, context); };
    return DynamicTimingAst;
}(TimingAst));
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} visitor
 * @param {?} node
 * @param {?} context
 * @return {?}
 */
function visitAnimationNode(visitor, node, context) {
    switch (node.type) {
        case 7 /* Trigger */:
            return visitor.visitTrigger(/** @type {?} */ (node), context);
        case 0 /* State */:
            return visitor.visitState(/** @type {?} */ (node), context);
        case 1 /* Transition */:
            return visitor.visitTransition(/** @type {?} */ (node), context);
        case 2 /* Sequence */:
            return visitor.visitSequence(/** @type {?} */ (node), context);
        case 3 /* Group */:
            return visitor.visitGroup(/** @type {?} */ (node), context);
        case 4 /* Animate */:
            return visitor.visitAnimate(/** @type {?} */ (node), context);
        case 5 /* Keyframes */:
            return visitor.visitKeyframes(/** @type {?} */ (node), context);
        case 6 /* Style */:
            return visitor.visitStyle(/** @type {?} */ (node), context);
        case 8 /* Reference */:
            return visitor.visitReference(/** @type {?} */ (node), context);
        case 9 /* AnimateChild */:
            return visitor.visitAnimateChild(/** @type {?} */ (node), context);
        case 10 /* AnimateRef */:
            return visitor.visitAnimateRef(/** @type {?} */ (node), context);
        case 11 /* Query */:
            return visitor.visitQuery(/** @type {?} */ (node), context);
        case 12 /* Stagger */:
            return visitor.visitStagger(/** @type {?} */ (node), context);
        default:
            throw new Error("Unable to resolve animation metadata node #" + node.type);
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ANY_STATE = '*';
/**
 * @param {?} transitionValue
 * @param {?} errors
 * @return {?}
 */
function parseTransitionExpr(transitionValue, errors) {
    var /** @type {?} */ expressions = [];
    if (typeof transitionValue == 'string') {
        ((transitionValue))
            .split(/\s*,\s*/)
            .forEach(function (str) { return parseInnerTransitionStr(str, expressions, errors); });
    }
    else {
        expressions.push(/** @type {?} */ (transitionValue));
    }
    return expressions;
}
/**
 * @param {?} eventStr
 * @param {?} expressions
 * @param {?} errors
 * @return {?}
 */
function parseInnerTransitionStr(eventStr, expressions, errors) {
    if (eventStr[0] == ':') {
        eventStr = parseAnimationAlias(eventStr, errors);
    }
    var /** @type {?} */ match = eventStr.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
    if (match == null || match.length < 4) {
        errors.push("The provided transition expression \"" + eventStr + "\" is not supported");
        return expressions;
    }
    var /** @type {?} */ fromState = match[1];
    var /** @type {?} */ separator = match[2];
    var /** @type {?} */ toState = match[3];
    expressions.push(makeLambdaFromStates(fromState, toState));
    var /** @type {?} */ isFullAnyStateExpr = fromState == ANY_STATE && toState == ANY_STATE;
    if (separator[0] == '<' && !isFullAnyStateExpr) {
        expressions.push(makeLambdaFromStates(toState, fromState));
    }
}
/**
 * @param {?} alias
 * @param {?} errors
 * @return {?}
 */
function parseAnimationAlias(alias, errors) {
    switch (alias) {
        case ':enter':
            return 'void => *';
        case ':leave':
            return '* => void';
        default:
            errors.push("The transition alias value \"" + alias + "\" is not supported");
            return '* => *';
    }
}
/**
 * @param {?} lhs
 * @param {?} rhs
 * @return {?}
 */
function makeLambdaFromStates(lhs, rhs) {
    return function (fromState, toState) {
        var /** @type {?} */ lhsMatch = lhs == ANY_STATE || lhs == fromState;
        var /** @type {?} */ rhsMatch = rhs == ANY_STATE || rhs == toState;
        if (!lhsMatch && typeof fromState === 'boolean') {
            lhsMatch = fromState ? lhs === 'true' : lhs === 'false';
        }
        if (!rhsMatch && typeof toState === 'boolean') {
            rhsMatch = toState ? rhs === 'true' : rhs === 'false';
        }
        return lhsMatch && rhsMatch;
    };
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var SELF_TOKEN = ':self';
var SELF_TOKEN_REGEX = new RegExp("s*" + SELF_TOKEN + "s*,?", 'g');
/**
 * @param {?} metadata
 * @param {?} errors
 * @return {?}
 */
function buildAnimationAst(metadata, errors) {
    return new AnimationAstBuilderVisitor().build(metadata, errors);
}
var LEAVE_TOKEN = ':leave';
var LEAVE_TOKEN_REGEX = new RegExp(LEAVE_TOKEN, 'g');
var ENTER_TOKEN = ':enter';
var ENTER_TOKEN_REGEX = new RegExp(ENTER_TOKEN, 'g');
var ROOT_SELECTOR = '';
var AnimationAstBuilderVisitor = (function () {
    function AnimationAstBuilderVisitor() {
    }
    /**
     * @param {?} metadata
     * @param {?} errors
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.build = function (metadata, errors) {
        var /** @type {?} */ context = new AnimationAstBuilderContext(errors);
        this._resetContextStyleTimingState(context);
        return (visitAnimationNode(this, normalizeAnimationEntry(metadata), context));
    };
    /**
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype._resetContextStyleTimingState = function (context) {
        context.currentQuerySelector = ROOT_SELECTOR;
        context.collectedStyles = {};
        context.collectedStyles[ROOT_SELECTOR] = {};
        context.currentTime = 0;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitTrigger = function (metadata, context) {
        var _this = this;
        var /** @type {?} */ queryCount = context.queryCount = 0;
        var /** @type {?} */ depCount = context.depCount = 0;
        var /** @type {?} */ states = [];
        var /** @type {?} */ transitions = [];
        metadata.definitions.forEach(function (def) {
            _this._resetContextStyleTimingState(context);
            if (def.type == 0 /* State */) {
                var /** @type {?} */ stateDef_1 = (def);
                var /** @type {?} */ name = stateDef_1.name;
                name.split(/\s*,\s*/).forEach(function (n) {
                    stateDef_1.name = n;
                    states.push(_this.visitState(stateDef_1, context));
                });
                stateDef_1.name = name;
            }
            else if (def.type == 1 /* Transition */) {
                var /** @type {?} */ transition = _this.visitTransition(/** @type {?} */ (def), context);
                queryCount += transition.queryCount;
                depCount += transition.depCount;
                transitions.push(transition);
            }
            else {
                context.errors.push('only state() and transition() definitions can sit inside of a trigger()');
            }
        });
        var /** @type {?} */ ast = new TriggerAst(metadata.name, states, transitions);
        ast.options = normalizeAnimationOptions(metadata.options);
        ast.queryCount = queryCount;
        ast.depCount = depCount;
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitState = function (metadata, context) {
        var /** @type {?} */ styleAst = this.visitStyle(metadata.styles, context);
        var /** @type {?} */ astParams = (metadata.options && metadata.options.params) || null;
        if (styleAst.containsDynamicStyles) {
            var /** @type {?} */ missingSubs_1 = new Set();
            var /** @type {?} */ params_1 = astParams || {};
            styleAst.styles.forEach(function (value) {
                if (isObject(value)) {
                    var /** @type {?} */ stylesObj_1 = (value);
                    Object.keys(stylesObj_1).forEach(function (prop) {
                        extractStyleParams(stylesObj_1[prop]).forEach(function (sub) {
                            if (!params_1.hasOwnProperty(sub)) {
                                missingSubs_1.add(sub);
                            }
                        });
                    });
                }
            });
            if (missingSubs_1.size) {
                var /** @type {?} */ missingSubsArr = iteratorToArray(missingSubs_1.values());
                context.errors.push("state(\"" + metadata.name + "\", ...) must define default values for all the following style substitutions: " + missingSubsArr.join(', '));
            }
        }
        var /** @type {?} */ stateAst = new StateAst(metadata.name, styleAst);
        if (astParams) {
            stateAst.options = { params: astParams };
        }
        return stateAst;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitTransition = function (metadata, context) {
        context.queryCount = 0;
        context.depCount = 0;
        var /** @type {?} */ entry = visitAnimationNode(this, normalizeAnimationEntry(metadata.animation), context);
        var /** @type {?} */ matchers = parseTransitionExpr(metadata.expr, context.errors);
        var /** @type {?} */ ast = new TransitionAst(matchers, entry);
        ast.options = normalizeAnimationOptions(metadata.options);
        ast.queryCount = context.queryCount;
        ast.depCount = context.depCount;
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitSequence = function (metadata, context) {
        var _this = this;
        var /** @type {?} */ ast = new SequenceAst(metadata.steps.map(function (s) { return visitAnimationNode(_this, s, context); }));
        ast.options = normalizeAnimationOptions(metadata.options);
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitGroup = function (metadata, context) {
        var _this = this;
        var /** @type {?} */ currentTime = context.currentTime;
        var /** @type {?} */ furthestTime = 0;
        var /** @type {?} */ steps = metadata.steps.map(function (step) {
            context.currentTime = currentTime;
            var /** @type {?} */ innerAst = visitAnimationNode(_this, step, context);
            furthestTime = Math.max(furthestTime, context.currentTime);
            return innerAst;
        });
        context.currentTime = furthestTime;
        var /** @type {?} */ ast = new GroupAst(steps);
        ast.options = normalizeAnimationOptions(metadata.options);
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitAnimate = function (metadata, context) {
        var /** @type {?} */ timingAst = constructTimingAst(metadata.timings, context.errors);
        context.currentAnimateTimings = timingAst;
        var /** @type {?} */ styles;
        var /** @type {?} */ styleMetadata = metadata.styles ? metadata.styles : Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({});
        if (styleMetadata.type == 5 /* Keyframes */) {
            styles = this.visitKeyframes(/** @type {?} */ (styleMetadata), context);
        }
        else {
            var /** @type {?} */ styleMetadata_1 = (metadata.styles);
            var /** @type {?} */ isEmpty = false;
            if (!styleMetadata_1) {
                isEmpty = true;
                var /** @type {?} */ newStyleData = {};
                if (timingAst.easing) {
                    newStyleData['easing'] = timingAst.easing;
                }
                styleMetadata_1 = Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])(newStyleData);
            }
            context.currentTime += timingAst.duration + timingAst.delay;
            var /** @type {?} */ styleAst = this.visitStyle(styleMetadata_1, context);
            styleAst.isEmptyStep = isEmpty;
            styles = styleAst;
        }
        context.currentAnimateTimings = null;
        return new AnimateAst(timingAst, styles);
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitStyle = function (metadata, context) {
        var /** @type {?} */ ast = this._makeStyleAst(metadata, context);
        this._validateStyleAst(ast, context);
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype._makeStyleAst = function (metadata, context) {
        var /** @type {?} */ styles = [];
        if (Array.isArray(metadata.styles)) {
            ((metadata.styles)).forEach(function (styleTuple) {
                if (typeof styleTuple == 'string') {
                    if (styleTuple == __WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* AUTO_STYLE */]) {
                        styles.push(/** @type {?} */ (styleTuple));
                    }
                    else {
                        context.errors.push("The provided style string value " + styleTuple + " is not allowed.");
                    }
                }
                else {
                    styles.push(/** @type {?} */ (styleTuple));
                }
            });
        }
        else {
            styles.push(metadata.styles);
        }
        var /** @type {?} */ containsDynamicStyles = false;
        var /** @type {?} */ collectedEasing = null;
        styles.forEach(function (styleData) {
            if (isObject(styleData)) {
                var /** @type {?} */ styleMap = (styleData);
                var /** @type {?} */ easing = styleMap['easing'];
                if (easing) {
                    collectedEasing = (easing);
                    delete styleMap['easing'];
                }
                if (!containsDynamicStyles) {
                    for (var /** @type {?} */ prop in styleMap) {
                        var /** @type {?} */ value = styleMap[prop];
                        if (value.toString().indexOf(SUBSTITUTION_EXPR_START) >= 0) {
                            containsDynamicStyles = true;
                            break;
                        }
                    }
                }
            }
        });
        var /** @type {?} */ ast = new StyleAst(styles, collectedEasing, metadata.offset);
        ast.containsDynamicStyles = containsDynamicStyles;
        return ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype._validateStyleAst = function (ast, context) {
        var /** @type {?} */ timings = context.currentAnimateTimings;
        var /** @type {?} */ endTime = context.currentTime;
        var /** @type {?} */ startTime = context.currentTime;
        if (timings && startTime > 0) {
            startTime -= timings.duration + timings.delay;
        }
        ast.styles.forEach(function (tuple) {
            if (typeof tuple == 'string')
                return;
            Object.keys(tuple).forEach(function (prop) {
                var /** @type {?} */ collectedStyles = context.collectedStyles[((context.currentQuerySelector))];
                var /** @type {?} */ collectedEntry = collectedStyles[prop];
                var /** @type {?} */ updateCollectedStyle = true;
                if (collectedEntry) {
                    if (startTime != endTime && startTime >= collectedEntry.startTime &&
                        endTime <= collectedEntry.endTime) {
                        context.errors.push("The CSS property \"" + prop + "\" that exists between the times of \"" + collectedEntry.startTime + "ms\" and \"" + collectedEntry.endTime + "ms\" is also being animated in a parallel animation between the times of \"" + startTime + "ms\" and \"" + endTime + "ms\"");
                        updateCollectedStyle = false;
                    }
                    // we always choose the smaller start time value since we
                    // want to have a record of the entire animation window where
                    // the style property is being animated in between
                    startTime = collectedEntry.startTime;
                }
                if (updateCollectedStyle) {
                    collectedStyles[prop] = { startTime: startTime, endTime: endTime };
                }
                if (context.options) {
                    validateStyleParams(tuple[prop], context.options, context.errors);
                }
            });
        });
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitKeyframes = function (metadata, context) {
        var _this = this;
        if (!context.currentAnimateTimings) {
            context.errors.push("keyframes() must be placed inside of a call to animate()");
            return new KeyframesAst([]);
        }
        var /** @type {?} */ MAX_KEYFRAME_OFFSET = 1;
        var /** @type {?} */ totalKeyframesWithOffsets = 0;
        var /** @type {?} */ offsets = [];
        var /** @type {?} */ offsetsOutOfOrder = false;
        var /** @type {?} */ keyframesOutOfRange = false;
        var /** @type {?} */ previousOffset = 0;
        var /** @type {?} */ keyframes = metadata.steps.map(function (styles) {
            var /** @type {?} */ style$$1 = _this._makeStyleAst(styles, context);
            var /** @type {?} */ offsetVal = style$$1.offset != null ? style$$1.offset : consumeOffset(style$$1.styles);
            var /** @type {?} */ offset = 0;
            if (offsetVal != null) {
                totalKeyframesWithOffsets++;
                offset = style$$1.offset = offsetVal;
            }
            keyframesOutOfRange = keyframesOutOfRange || offset < 0 || offset > 1;
            offsetsOutOfOrder = offsetsOutOfOrder || offset < previousOffset;
            previousOffset = offset;
            offsets.push(offset);
            return style$$1;
        });
        if (keyframesOutOfRange) {
            context.errors.push("Please ensure that all keyframe offsets are between 0 and 1");
        }
        if (offsetsOutOfOrder) {
            context.errors.push("Please ensure that all keyframe offsets are in order");
        }
        var /** @type {?} */ length = metadata.steps.length;
        var /** @type {?} */ generatedOffset = 0;
        if (totalKeyframesWithOffsets > 0 && totalKeyframesWithOffsets < length) {
            context.errors.push("Not all style() steps within the declared keyframes() contain offsets");
        }
        else if (totalKeyframesWithOffsets == 0) {
            generatedOffset = MAX_KEYFRAME_OFFSET / (length - 1);
        }
        var /** @type {?} */ limit = length - 1;
        var /** @type {?} */ currentTime = context.currentTime;
        var /** @type {?} */ currentAnimateTimings = ((context.currentAnimateTimings));
        var /** @type {?} */ animateDuration = currentAnimateTimings.duration;
        keyframes.forEach(function (kf, i) {
            var /** @type {?} */ offset = generatedOffset > 0 ? (i == limit ? 1 : (generatedOffset * i)) : offsets[i];
            var /** @type {?} */ durationUpToThisFrame = offset * animateDuration;
            context.currentTime = currentTime + currentAnimateTimings.delay + durationUpToThisFrame;
            currentAnimateTimings.duration = durationUpToThisFrame;
            _this._validateStyleAst(kf, context);
            kf.offset = offset;
        });
        return new KeyframesAst(keyframes);
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitReference = function (metadata, context) {
        var /** @type {?} */ entry = visitAnimationNode(this, normalizeAnimationEntry(metadata.animation), context);
        var /** @type {?} */ ast = new ReferenceAst(entry);
        ast.options = normalizeAnimationOptions(metadata.options);
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitAnimateChild = function (metadata, context) {
        context.depCount++;
        var /** @type {?} */ ast = new AnimateChildAst();
        ast.options = normalizeAnimationOptions(metadata.options);
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitAnimateRef = function (metadata, context) {
        var /** @type {?} */ animation = this.visitReference(metadata.animation, context);
        var /** @type {?} */ ast = new AnimateRefAst(animation);
        ast.options = normalizeAnimationOptions(metadata.options);
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitQuery = function (metadata, context) {
        var /** @type {?} */ parentSelector = ((context.currentQuerySelector));
        var /** @type {?} */ options = ((metadata.options || {}));
        context.queryCount++;
        context.currentQuery = metadata;
        var _a = normalizeSelector(metadata.selector), selector = _a[0], includeSelf = _a[1];
        context.currentQuerySelector =
            parentSelector.length ? (parentSelector + ' ' + selector) : selector;
        getOrSetAsInMap(context.collectedStyles, context.currentQuerySelector, {});
        var /** @type {?} */ entry = visitAnimationNode(this, normalizeAnimationEntry(metadata.animation), context);
        context.currentQuery = null;
        context.currentQuerySelector = parentSelector;
        var /** @type {?} */ ast = new QueryAst(selector, options.limit || 0, !!options.optional, includeSelf, entry);
        ast.originalSelector = metadata.selector;
        ast.options = normalizeAnimationOptions(metadata.options);
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitStagger = function (metadata, context) {
        if (!context.currentQuery) {
            context.errors.push("stagger() can only be used inside of query()");
        }
        var /** @type {?} */ timings = metadata.timings === 'full' ?
            { duration: 0, delay: 0, easing: 'full' } :
            resolveTiming(metadata.timings, context.errors, true);
        var /** @type {?} */ animation = visitAnimationNode(this, normalizeAnimationEntry(metadata.animation), context);
        return new StaggerAst(timings, animation);
    };
    return AnimationAstBuilderVisitor;
}());
/**
 * @param {?} selector
 * @return {?}
 */
function normalizeSelector(selector) {
    var /** @type {?} */ hasAmpersand = selector.split(/\s*,\s*/).find(function (token) { return token == SELF_TOKEN; }) ? true : false;
    if (hasAmpersand) {
        selector = selector.replace(SELF_TOKEN_REGEX, '');
    }
    selector = selector.replace(ENTER_TOKEN_REGEX, ENTER_SELECTOR)
        .replace(LEAVE_TOKEN_REGEX, LEAVE_SELECTOR)
        .replace(/@\*/g, NG_TRIGGER_SELECTOR)
        .replace(/@\w+/g, function (match) { return NG_TRIGGER_SELECTOR + '-' + match.substr(1); })
        .replace(/:animating/g, NG_ANIMATING_SELECTOR);
    return [selector, hasAmpersand];
}
/**
 * @param {?} obj
 * @return {?}
 */
function normalizeParams(obj) {
    return obj ? copyObj(obj) : null;
}
var AnimationAstBuilderContext = (function () {
    /**
     * @param {?} errors
     */
    function AnimationAstBuilderContext(errors) {
        this.errors = errors;
        this.queryCount = 0;
        this.depCount = 0;
        this.currentTransition = null;
        this.currentQuery = null;
        this.currentQuerySelector = null;
        this.currentAnimateTimings = null;
        this.currentTime = 0;
        this.collectedStyles = {};
        this.options = null;
    }
    return AnimationAstBuilderContext;
}());
/**
 * @param {?} styles
 * @return {?}
 */
function consumeOffset(styles) {
    if (typeof styles == 'string')
        return null;
    var /** @type {?} */ offset = null;
    if (Array.isArray(styles)) {
        styles.forEach(function (styleTuple) {
            if (isObject(styleTuple) && styleTuple.hasOwnProperty('offset')) {
                var /** @type {?} */ obj = (styleTuple);
                offset = parseFloat(/** @type {?} */ (obj['offset']));
                delete obj['offset'];
            }
        });
    }
    else if (isObject(styles) && styles.hasOwnProperty('offset')) {
        var /** @type {?} */ obj = (styles);
        offset = parseFloat(/** @type {?} */ (obj['offset']));
        delete obj['offset'];
    }
    return offset;
}
/**
 * @param {?} value
 * @return {?}
 */
function isObject(value) {
    return !Array.isArray(value) && typeof value == 'object';
}
/**
 * @param {?} value
 * @param {?} errors
 * @return {?}
 */
function constructTimingAst(value, errors) {
    var /** @type {?} */ timings = null;
    if (value.hasOwnProperty('duration')) {
        timings = (value);
    }
    else if (typeof value == 'number') {
        var /** @type {?} */ duration = resolveTiming(/** @type {?} */ (value), errors).duration;
        return new TimingAst(/** @type {?} */ (value), 0, '');
    }
    var /** @type {?} */ strValue = (value);
    var /** @type {?} */ isDynamic = strValue.split(/\s+/).some(function (v) { return v.charAt(0) == '{' && v.charAt(1) == '{'; });
    if (isDynamic) {
        return new DynamicTimingAst(strValue);
    }
    timings = timings || resolveTiming(strValue, errors);
    return new TimingAst(timings.duration, timings.delay, timings.easing);
}
/**
 * @param {?} options
 * @return {?}
 */
function normalizeAnimationOptions(options) {
    if (options) {
        options = copyObj(options);
        if (options['params']) {
            options['params'] = ((normalizeParams(options['params'])));
        }
    }
    else {
        options = {};
    }
    return options;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} element
 * @param {?} keyframes
 * @param {?} preStyleProps
 * @param {?} postStyleProps
 * @param {?} duration
 * @param {?} delay
 * @param {?=} easing
 * @param {?=} subTimeline
 * @return {?}
 */
function createTimelineInstruction(element, keyframes, preStyleProps, postStyleProps, duration, delay, easing, subTimeline) {
    if (easing === void 0) { easing = null; }
    if (subTimeline === void 0) { subTimeline = false; }
    return {
        type: 1 /* TimelineAnimation */,
        element: element,
        keyframes: keyframes,
        preStyleProps: preStyleProps,
        postStyleProps: postStyleProps,
        duration: duration,
        delay: delay,
        totalTime: duration + delay, easing: easing, subTimeline: subTimeline
    };
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ElementInstructionMap = (function () {
    function ElementInstructionMap() {
        this._map = new Map();
    }
    /**
     * @param {?} element
     * @return {?}
     */
    ElementInstructionMap.prototype.consume = function (element) {
        var /** @type {?} */ instructions = this._map.get(element);
        if (instructions) {
            this._map.delete(element);
        }
        else {
            instructions = [];
        }
        return instructions;
    };
    /**
     * @param {?} element
     * @param {?} instructions
     * @return {?}
     */
    ElementInstructionMap.prototype.append = function (element, instructions) {
        var /** @type {?} */ existingInstructions = this._map.get(element);
        if (!existingInstructions) {
            this._map.set(element, existingInstructions = []);
        }
        existingInstructions.push.apply(existingInstructions, instructions);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    ElementInstructionMap.prototype.has = function (element) { return this._map.has(element); };
    /**
     * @return {?}
     */
    ElementInstructionMap.prototype.clear = function () { this._map.clear(); };
    return ElementInstructionMap;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ONE_FRAME_IN_MILLISECONDS = 1;
/**
 * @param {?} driver
 * @param {?} rootElement
 * @param {?} ast
 * @param {?=} startingStyles
 * @param {?=} finalStyles
 * @param {?=} options
 * @param {?=} subInstructions
 * @param {?=} errors
 * @return {?}
 */
function buildAnimationTimelines(driver, rootElement, ast, startingStyles, finalStyles, options, subInstructions, errors) {
    if (startingStyles === void 0) { startingStyles = {}; }
    if (finalStyles === void 0) { finalStyles = {}; }
    if (errors === void 0) { errors = []; }
    return new AnimationTimelineBuilderVisitor().buildKeyframes(driver, rootElement, ast, startingStyles, finalStyles, options, subInstructions, errors);
}
var AnimationTimelineBuilderVisitor = (function () {
    function AnimationTimelineBuilderVisitor() {
    }
    /**
     * @param {?} driver
     * @param {?} rootElement
     * @param {?} ast
     * @param {?} startingStyles
     * @param {?} finalStyles
     * @param {?} options
     * @param {?=} subInstructions
     * @param {?=} errors
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.buildKeyframes = function (driver, rootElement, ast, startingStyles, finalStyles, options, subInstructions, errors) {
        if (errors === void 0) { errors = []; }
        subInstructions = subInstructions || new ElementInstructionMap();
        var /** @type {?} */ context = new AnimationTimelineContext(driver, rootElement, subInstructions, errors, []);
        context.options = options;
        context.currentTimeline.setStyles([startingStyles], null, context.errors, options);
        ast.visit(this, context);
        // this checks to see if an actual animation happened
        var /** @type {?} */ timelines = context.timelines.filter(function (timeline) { return timeline.containsAnimation(); });
        if (timelines.length && Object.keys(finalStyles).length) {
            var /** @type {?} */ tl = timelines[timelines.length - 1];
            if (!tl.allowOnlyTimelineStyles()) {
                tl.setStyles([finalStyles], null, context.errors, options);
            }
        }
        return timelines.length ? timelines.map(function (timeline) { return timeline.buildKeyframes(); }) :
            [createTimelineInstruction(rootElement, [], [], [], 0, 0, '', false)];
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitTrigger = function (ast, context) {
        // these values are not visited in this AST
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitState = function (ast, context) {
        // these values are not visited in this AST
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitTransition = function (ast, context) {
        // these values are not visited in this AST
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitAnimateChild = function (ast, context) {
        var /** @type {?} */ elementInstructions = context.subInstructions.consume(context.element);
        if (elementInstructions) {
            var /** @type {?} */ innerContext = context.createSubContext(ast.options);
            var /** @type {?} */ startTime = context.currentTimeline.currentTime;
            var /** @type {?} */ endTime = this._visitSubInstructions(elementInstructions, innerContext, /** @type {?} */ (innerContext.options));
            if (startTime != endTime) {
                // we do this on the upper context because we created a sub context for
                // the sub child animations
                context.transformIntoNewTimeline(endTime);
            }
        }
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitAnimateRef = function (ast, context) {
        var /** @type {?} */ innerContext = context.createSubContext(ast.options);
        innerContext.transformIntoNewTimeline();
        this.visitReference(ast.animation, innerContext);
        context.transformIntoNewTimeline(innerContext.currentTimeline.currentTime);
        context.previousNode = ast;
    };
    /**
     * @param {?} instructions
     * @param {?} context
     * @param {?} options
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype._visitSubInstructions = function (instructions, context, options) {
        var /** @type {?} */ startTime = context.currentTimeline.currentTime;
        var /** @type {?} */ furthestTime = startTime;
        // this is a special-case for when a user wants to skip a sub
        // animation from being fired entirely.
        var /** @type {?} */ duration = options.duration != null ? resolveTimingValue(options.duration) : null;
        var /** @type {?} */ delay = options.delay != null ? resolveTimingValue(options.delay) : null;
        if (duration !== 0) {
            instructions.forEach(function (instruction) {
                var /** @type {?} */ instructionTimings = context.appendInstructionToTimeline(instruction, duration, delay);
                furthestTime =
                    Math.max(furthestTime, instructionTimings.duration + instructionTimings.delay);
            });
        }
        return furthestTime;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitReference = function (ast, context) {
        context.updateOptions(ast.options, true);
        ast.animation.visit(this, context);
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitSequence = function (ast, context) {
        var _this = this;
        var /** @type {?} */ subContextCount = context.subContextCount;
        var /** @type {?} */ ctx = context;
        var /** @type {?} */ options = ast.options;
        if (options && (options.params || options.delay)) {
            ctx = context.createSubContext(options);
            ctx.transformIntoNewTimeline();
            if (options.delay != null) {
                if (ctx.previousNode instanceof StyleAst) {
                    ctx.currentTimeline.snapshotCurrentStyles();
                    ctx.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
                }
                var /** @type {?} */ delay = resolveTimingValue(options.delay);
                ctx.delayNextStep(delay);
            }
        }
        if (ast.steps.length) {
            ast.steps.forEach(function (s) { return s.visit(_this, ctx); });
            // this is here just incase the inner steps only contain or end with a style() call
            ctx.currentTimeline.applyStylesToKeyframe();
            // this means that some animation function within the sequence
            // ended up creating a sub timeline (which means the current
            // timeline cannot overlap with the contents of the sequence)
            if (ctx.subContextCount > subContextCount) {
                ctx.transformIntoNewTimeline();
            }
        }
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitGroup = function (ast, context) {
        var _this = this;
        var /** @type {?} */ innerTimelines = [];
        var /** @type {?} */ furthestTime = context.currentTimeline.currentTime;
        var /** @type {?} */ delay = ast.options && ast.options.delay ? resolveTimingValue(ast.options.delay) : 0;
        ast.steps.forEach(function (s) {
            var /** @type {?} */ innerContext = context.createSubContext(ast.options);
            if (delay) {
                innerContext.delayNextStep(delay);
            }
            s.visit(_this, innerContext);
            furthestTime = Math.max(furthestTime, innerContext.currentTimeline.currentTime);
            innerTimelines.push(innerContext.currentTimeline);
        });
        // this operation is run after the AST loop because otherwise
        // if the parent timeline's collected styles were updated then
        // it would pass in invalid data into the new-to-be forked items
        innerTimelines.forEach(function (timeline) { return context.currentTimeline.mergeTimelineCollectedStyles(timeline); });
        context.transformIntoNewTimeline(furthestTime);
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitTiming = function (ast, context) {
        if (ast instanceof DynamicTimingAst) {
            var /** @type {?} */ strValue = context.params ?
                interpolateParams(ast.value, context.params, context.errors) :
                ast.value.toString();
            return resolveTiming(strValue, context.errors);
        }
        else {
            return { duration: ast.duration, delay: ast.delay, easing: ast.easing };
        }
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitAnimate = function (ast, context) {
        var /** @type {?} */ timings = context.currentAnimateTimings = this.visitTiming(ast.timings, context);
        var /** @type {?} */ timeline = context.currentTimeline;
        if (timings.delay) {
            context.incrementTime(timings.delay);
            timeline.snapshotCurrentStyles();
        }
        var /** @type {?} */ style$$1 = ast.style;
        if (style$$1 instanceof KeyframesAst) {
            this.visitKeyframes(style$$1, context);
        }
        else {
            context.incrementTime(timings.duration);
            this.visitStyle(/** @type {?} */ (style$$1), context);
            timeline.applyStylesToKeyframe();
        }
        context.currentAnimateTimings = null;
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitStyle = function (ast, context) {
        var /** @type {?} */ timeline = context.currentTimeline;
        var /** @type {?} */ timings = ((context.currentAnimateTimings));
        // this is a special case for when a style() call
        // directly follows  an animate() call (but not inside of an animate() call)
        if (!timings && timeline.getCurrentStyleProperties().length) {
            timeline.forwardFrame();
        }
        var /** @type {?} */ easing = (timings && timings.easing) || ast.easing;
        if (ast.isEmptyStep) {
            timeline.applyEmptyStep(easing);
        }
        else {
            timeline.setStyles(ast.styles, easing, context.errors, context.options);
        }
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitKeyframes = function (ast, context) {
        var /** @type {?} */ currentAnimateTimings = ((context.currentAnimateTimings));
        var /** @type {?} */ startTime = (((context.currentTimeline))).duration;
        var /** @type {?} */ duration = currentAnimateTimings.duration;
        var /** @type {?} */ innerContext = context.createSubContext();
        var /** @type {?} */ innerTimeline = innerContext.currentTimeline;
        innerTimeline.easing = currentAnimateTimings.easing;
        ast.styles.forEach(function (step) {
            var /** @type {?} */ offset = step.offset || 0;
            innerTimeline.forwardTime(offset * duration);
            innerTimeline.setStyles(step.styles, step.easing, context.errors, context.options);
            innerTimeline.applyStylesToKeyframe();
        });
        // this will ensure that the parent timeline gets all the styles from
        // the child even if the new timeline below is not used
        context.currentTimeline.mergeTimelineCollectedStyles(innerTimeline);
        // we do this because the window between this timeline and the sub timeline
        // should ensure that the styles within are exactly the same as they were before
        context.transformIntoNewTimeline(startTime + duration);
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitQuery = function (ast, context) {
        var _this = this;
        // in the event that the first step before this is a style step we need
        // to ensure the styles are applied before the children are animated
        var /** @type {?} */ startTime = context.currentTimeline.currentTime;
        var /** @type {?} */ options = ((ast.options || {}));
        var /** @type {?} */ delay = options.delay ? resolveTimingValue(options.delay) : 0;
        if (delay && (context.previousNode instanceof StyleAst ||
            (startTime == 0 && context.currentTimeline.getCurrentStyleProperties().length))) {
            context.currentTimeline.snapshotCurrentStyles();
            context.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
        }
        var /** @type {?} */ furthestTime = startTime;
        var /** @type {?} */ elms = context.invokeQuery(ast.selector, ast.originalSelector, ast.limit, ast.includeSelf, options.optional ? true : false, context.errors);
        context.currentQueryTotal = elms.length;
        var /** @type {?} */ sameElementTimeline = null;
        elms.forEach(function (element, i) {
            context.currentQueryIndex = i;
            var /** @type {?} */ innerContext = context.createSubContext(ast.options, element);
            if (delay) {
                innerContext.delayNextStep(delay);
            }
            if (element === context.element) {
                sameElementTimeline = innerContext.currentTimeline;
            }
            ast.animation.visit(_this, innerContext);
            // this is here just incase the inner steps only contain or end
            // with a style() call (which is here to signal that this is a preparatory
            // call to style an element before it is animated again)
            innerContext.currentTimeline.applyStylesToKeyframe();
            var /** @type {?} */ endTime = innerContext.currentTimeline.currentTime;
            furthestTime = Math.max(furthestTime, endTime);
        });
        context.currentQueryIndex = 0;
        context.currentQueryTotal = 0;
        context.transformIntoNewTimeline(furthestTime);
        if (sameElementTimeline) {
            context.currentTimeline.mergeTimelineCollectedStyles(sameElementTimeline);
            context.currentTimeline.snapshotCurrentStyles();
        }
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitStagger = function (ast, context) {
        var /** @type {?} */ parentContext = ((context.parentContext));
        var /** @type {?} */ tl = context.currentTimeline;
        var /** @type {?} */ timings = ast.timings;
        var /** @type {?} */ duration = Math.abs(timings.duration);
        var /** @type {?} */ maxTime = duration * (context.currentQueryTotal - 1);
        var /** @type {?} */ delay = duration * context.currentQueryIndex;
        var /** @type {?} */ staggerTransformer = timings.duration < 0 ? 'reverse' : timings.easing;
        switch (staggerTransformer) {
            case 'reverse':
                delay = maxTime - delay;
                break;
            case 'full':
                delay = parentContext.currentStaggerTime;
                break;
        }
        var /** @type {?} */ timeline = context.currentTimeline;
        if (delay) {
            timeline.delayNextStep(delay);
        }
        var /** @type {?} */ startingTime = timeline.currentTime;
        ast.animation.visit(this, context);
        context.previousNode = ast;
        // time = duration + delay
        // the reason why this computation is so complex is because
        // the inner timeline may either have a delay value or a stretched
        // keyframe depending on if a subtimeline is not used or is used.
        parentContext.currentStaggerTime =
            (tl.currentTime - startingTime) + (tl.startTime - parentContext.currentTimeline.startTime);
    };
    return AnimationTimelineBuilderVisitor;
}());
var DEFAULT_NOOP_PREVIOUS_NODE = ({});
var AnimationTimelineContext = (function () {
    /**
     * @param {?} _driver
     * @param {?} element
     * @param {?} subInstructions
     * @param {?} errors
     * @param {?} timelines
     * @param {?=} initialTimeline
     */
    function AnimationTimelineContext(_driver, element, subInstructions, errors, timelines, initialTimeline) {
        this._driver = _driver;
        this.element = element;
        this.subInstructions = subInstructions;
        this.errors = errors;
        this.timelines = timelines;
        this.parentContext = null;
        this.currentAnimateTimings = null;
        this.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
        this.subContextCount = 0;
        this.options = {};
        this.currentQueryIndex = 0;
        this.currentQueryTotal = 0;
        this.currentStaggerTime = 0;
        this.currentTimeline = initialTimeline || new TimelineBuilder(element, 0);
        timelines.push(this.currentTimeline);
    }
    Object.defineProperty(AnimationTimelineContext.prototype, "params", {
        /**
         * @return {?}
         */
        get: function () { return this.options.params; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} options
     * @param {?=} skipIfExists
     * @return {?}
     */
    AnimationTimelineContext.prototype.updateOptions = function (options, skipIfExists) {
        var _this = this;
        if (!options)
            return;
        var /** @type {?} */ newOptions = (options);
        var /** @type {?} */ optionsToUpdate = this.options;
        // NOTE: this will get patched up when other animation methods support duration overrides
        if (newOptions.duration != null) {
            ((optionsToUpdate)).duration = resolveTimingValue(newOptions.duration);
        }
        if (newOptions.delay != null) {
            optionsToUpdate.delay = resolveTimingValue(newOptions.delay);
        }
        var /** @type {?} */ newParams = newOptions.params;
        if (newParams) {
            var /** @type {?} */ paramsToUpdate_1 = ((optionsToUpdate.params));
            if (!paramsToUpdate_1) {
                paramsToUpdate_1 = this.options.params = {};
            }
            Object.keys(newParams).forEach(function (name) {
                if (!skipIfExists || !paramsToUpdate_1.hasOwnProperty(name)) {
                    paramsToUpdate_1[name] = interpolateParams(newParams[name], paramsToUpdate_1, _this.errors);
                }
            });
        }
    };
    /**
     * @return {?}
     */
    AnimationTimelineContext.prototype._copyOptions = function () {
        var /** @type {?} */ options = {};
        if (this.options) {
            var /** @type {?} */ oldParams_1 = this.options.params;
            if (oldParams_1) {
                var /** @type {?} */ params_2 = options['params'] = {};
                Object.keys(this.options.params).forEach(function (name) { params_2[name] = oldParams_1[name]; });
            }
        }
        return options;
    };
    /**
     * @param {?=} options
     * @param {?=} element
     * @param {?=} newTime
     * @return {?}
     */
    AnimationTimelineContext.prototype.createSubContext = function (options, element, newTime) {
        if (options === void 0) { options = null; }
        var /** @type {?} */ target = element || this.element;
        var /** @type {?} */ context = new AnimationTimelineContext(this._driver, target, this.subInstructions, this.errors, this.timelines, this.currentTimeline.fork(target, newTime || 0));
        context.previousNode = this.previousNode;
        context.currentAnimateTimings = this.currentAnimateTimings;
        context.options = this._copyOptions();
        context.updateOptions(options);
        context.currentQueryIndex = this.currentQueryIndex;
        context.currentQueryTotal = this.currentQueryTotal;
        context.parentContext = this;
        this.subContextCount++;
        return context;
    };
    /**
     * @param {?=} newTime
     * @return {?}
     */
    AnimationTimelineContext.prototype.transformIntoNewTimeline = function (newTime) {
        this.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
        this.currentTimeline = this.currentTimeline.fork(this.element, newTime);
        this.timelines.push(this.currentTimeline);
        return this.currentTimeline;
    };
    /**
     * @param {?} instruction
     * @param {?} duration
     * @param {?} delay
     * @return {?}
     */
    AnimationTimelineContext.prototype.appendInstructionToTimeline = function (instruction, duration, delay) {
        var /** @type {?} */ updatedTimings = {
            duration: duration != null ? duration : instruction.duration,
            delay: this.currentTimeline.currentTime + (delay != null ? delay : 0) + instruction.delay,
            easing: ''
        };
        var /** @type {?} */ builder = new SubTimelineBuilder(instruction.element, instruction.keyframes, instruction.preStyleProps, instruction.postStyleProps, updatedTimings, instruction.stretchStartingKeyframe);
        this.timelines.push(builder);
        return updatedTimings;
    };
    /**
     * @param {?} time
     * @return {?}
     */
    AnimationTimelineContext.prototype.incrementTime = function (time) {
        this.currentTimeline.forwardTime(this.currentTimeline.duration + time);
    };
    /**
     * @param {?} delay
     * @return {?}
     */
    AnimationTimelineContext.prototype.delayNextStep = function (delay) {
        // negative delays are not yet supported
        if (delay > 0) {
            this.currentTimeline.delayNextStep(delay);
        }
    };
    /**
     * @param {?} selector
     * @param {?} originalSelector
     * @param {?} limit
     * @param {?} includeSelf
     * @param {?} optional
     * @param {?} errors
     * @return {?}
     */
    AnimationTimelineContext.prototype.invokeQuery = function (selector, originalSelector, limit, includeSelf, optional, errors) {
        var /** @type {?} */ results = [];
        if (includeSelf) {
            results.push(this.element);
        }
        if (selector.length > 0) {
            var /** @type {?} */ multi = limit != 1;
            results.push.apply(results, this._driver.query(this.element, selector, multi));
        }
        if (!optional && results.length == 0) {
            errors.push("`query(\"" + originalSelector + "\")` returned zero elements. (Use `query(\"" + originalSelector + "\", { optional: true })` if you wish to allow this.)");
        }
        return results;
    };
    return AnimationTimelineContext;
}());
var TimelineBuilder = (function () {
    /**
     * @param {?} element
     * @param {?} startTime
     * @param {?=} _elementTimelineStylesLookup
     */
    function TimelineBuilder(element, startTime, _elementTimelineStylesLookup) {
        this.element = element;
        this.startTime = startTime;
        this._elementTimelineStylesLookup = _elementTimelineStylesLookup;
        this.duration = 0;
        this._previousKeyframe = {};
        this._currentKeyframe = {};
        this._keyframes = new Map();
        this._styleSummary = {};
        this._pendingStyles = {};
        this._backFill = {};
        this._currentEmptyStepKeyframe = null;
        if (!this._elementTimelineStylesLookup) {
            this._elementTimelineStylesLookup = new Map();
        }
        this._localTimelineStyles = Object.create(this._backFill, {});
        this._globalTimelineStyles = this._elementTimelineStylesLookup.get(element);
        if (!this._globalTimelineStyles) {
            this._globalTimelineStyles = this._localTimelineStyles;
            this._elementTimelineStylesLookup.set(element, this._localTimelineStyles);
        }
        this._loadKeyframe();
    }
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.containsAnimation = function () {
        switch (this._keyframes.size) {
            case 0:
                return false;
            case 1:
                return this.getCurrentStyleProperties().length > 0;
            default:
                return true;
        }
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.getCurrentStyleProperties = function () { return Object.keys(this._currentKeyframe); };
    Object.defineProperty(TimelineBuilder.prototype, "currentTime", {
        /**
         * @return {?}
         */
        get: function () { return this.startTime + this.duration; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} delay
     * @return {?}
     */
    TimelineBuilder.prototype.delayNextStep = function (delay) {
        // in the event that a style() step is placed right before a stagger()
        // and that style() step is the very first style() value in the animation
        // then we need to make a copy of the keyframe [0, copy, 1] so that the delay
        // properly applies the style() values to work with the stagger...
        var /** @type {?} */ hasPreStyleStep = this._keyframes.size == 1 && Object.keys(this._pendingStyles).length;
        if (this.duration || hasPreStyleStep) {
            this.forwardTime(this.currentTime + delay);
            if (hasPreStyleStep) {
                this.snapshotCurrentStyles();
            }
        }
        else {
            this.startTime += delay;
        }
    };
    /**
     * @param {?} element
     * @param {?=} currentTime
     * @return {?}
     */
    TimelineBuilder.prototype.fork = function (element, currentTime) {
        this.applyStylesToKeyframe();
        return new TimelineBuilder(element, currentTime || this.currentTime, this._elementTimelineStylesLookup);
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype._loadKeyframe = function () {
        if (this._currentKeyframe) {
            this._previousKeyframe = this._currentKeyframe;
        }
        this._currentKeyframe = ((this._keyframes.get(this.duration)));
        if (!this._currentKeyframe) {
            this._currentKeyframe = Object.create(this._backFill, {});
            this._keyframes.set(this.duration, this._currentKeyframe);
        }
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.forwardFrame = function () {
        this.duration += ONE_FRAME_IN_MILLISECONDS;
        this._loadKeyframe();
    };
    /**
     * @param {?} time
     * @return {?}
     */
    TimelineBuilder.prototype.forwardTime = function (time) {
        this.applyStylesToKeyframe();
        this.duration = time;
        this._loadKeyframe();
    };
    /**
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    TimelineBuilder.prototype._updateStyle = function (prop, value) {
        this._localTimelineStyles[prop] = value;
        this._globalTimelineStyles[prop] = value;
        this._styleSummary[prop] = { time: this.currentTime, value: value };
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.allowOnlyTimelineStyles = function () { return this._currentEmptyStepKeyframe !== this._currentKeyframe; };
    /**
     * @param {?} easing
     * @return {?}
     */
    TimelineBuilder.prototype.applyEmptyStep = function (easing) {
        var _this = this;
        if (easing) {
            this._previousKeyframe['easing'] = easing;
        }
        // special case for animate(duration):
        // all missing styles are filled with a `*` value then
        // if any destination styles are filled in later on the same
        // keyframe then they will override the overridden styles
        // We use `_globalTimelineStyles` here because there may be
        // styles in previous keyframes that are not present in this timeline
        Object.keys(this._globalTimelineStyles).forEach(function (prop) {
            _this._backFill[prop] = _this._globalTimelineStyles[prop] || __WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* AUTO_STYLE */];
            _this._currentKeyframe[prop] = __WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* AUTO_STYLE */];
        });
        this._currentEmptyStepKeyframe = this._currentKeyframe;
    };
    /**
     * @param {?} input
     * @param {?} easing
     * @param {?} errors
     * @param {?=} options
     * @return {?}
     */
    TimelineBuilder.prototype.setStyles = function (input, easing, errors, options) {
        var _this = this;
        if (easing) {
            this._previousKeyframe['easing'] = easing;
        }
        var /** @type {?} */ params = (options && options.params) || {};
        var /** @type {?} */ styles = flattenStyles(input, this._globalTimelineStyles);
        Object.keys(styles).forEach(function (prop) {
            var /** @type {?} */ val = interpolateParams(styles[prop], params, errors);
            _this._pendingStyles[prop] = val;
            if (!_this._localTimelineStyles.hasOwnProperty(prop)) {
                _this._backFill[prop] = _this._globalTimelineStyles.hasOwnProperty(prop) ?
                    _this._globalTimelineStyles[prop] :
                    __WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* AUTO_STYLE */];
            }
            _this._updateStyle(prop, val);
        });
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.applyStylesToKeyframe = function () {
        var _this = this;
        var /** @type {?} */ styles = this._pendingStyles;
        var /** @type {?} */ props = Object.keys(styles);
        if (props.length == 0)
            return;
        this._pendingStyles = {};
        props.forEach(function (prop) {
            var /** @type {?} */ val = styles[prop];
            _this._currentKeyframe[prop] = val;
        });
        Object.keys(this._localTimelineStyles).forEach(function (prop) {
            if (!_this._currentKeyframe.hasOwnProperty(prop)) {
                _this._currentKeyframe[prop] = _this._localTimelineStyles[prop];
            }
        });
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.snapshotCurrentStyles = function () {
        var _this = this;
        Object.keys(this._localTimelineStyles).forEach(function (prop) {
            var /** @type {?} */ val = _this._localTimelineStyles[prop];
            _this._pendingStyles[prop] = val;
            _this._updateStyle(prop, val);
        });
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.getFinalKeyframe = function () { return this._keyframes.get(this.duration); };
    Object.defineProperty(TimelineBuilder.prototype, "properties", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ properties = [];
            for (var /** @type {?} */ prop in this._currentKeyframe) {
                properties.push(prop);
            }
            return properties;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} timeline
     * @return {?}
     */
    TimelineBuilder.prototype.mergeTimelineCollectedStyles = function (timeline) {
        var _this = this;
        Object.keys(timeline._styleSummary).forEach(function (prop) {
            var /** @type {?} */ details0 = _this._styleSummary[prop];
            var /** @type {?} */ details1 = timeline._styleSummary[prop];
            if (!details0 || details1.time > details0.time) {
                _this._updateStyle(prop, details1.value);
            }
        });
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.buildKeyframes = function () {
        var _this = this;
        this.applyStylesToKeyframe();
        var /** @type {?} */ preStyleProps = new Set();
        var /** @type {?} */ postStyleProps = new Set();
        var /** @type {?} */ isEmpty = this._keyframes.size === 1 && this.duration === 0;
        var /** @type {?} */ finalKeyframes = [];
        this._keyframes.forEach(function (keyframe, time) {
            var /** @type {?} */ finalKeyframe = copyStyles(keyframe, true);
            Object.keys(finalKeyframe).forEach(function (prop) {
                var /** @type {?} */ value = finalKeyframe[prop];
                if (value == __WEBPACK_IMPORTED_MODULE_1__angular_animations__["l" /* ɵPRE_STYLE */]) {
                    preStyleProps.add(prop);
                }
                else if (value == __WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* AUTO_STYLE */]) {
                    postStyleProps.add(prop);
                }
            });
            if (!isEmpty) {
                finalKeyframe['offset'] = time / _this.duration;
            }
            finalKeyframes.push(finalKeyframe);
        });
        var /** @type {?} */ preProps = preStyleProps.size ? iteratorToArray(preStyleProps.values()) : [];
        var /** @type {?} */ postProps = postStyleProps.size ? iteratorToArray(postStyleProps.values()) : [];
        // special case for a 0-second animation (which is designed just to place styles onscreen)
        if (isEmpty) {
            var /** @type {?} */ kf0 = finalKeyframes[0];
            var /** @type {?} */ kf1 = copyObj(kf0);
            kf0['offset'] = 0;
            kf1['offset'] = 1;
            finalKeyframes = [kf0, kf1];
        }
        return createTimelineInstruction(this.element, finalKeyframes, preProps, postProps, this.duration, this.startTime, this.easing, false);
    };
    return TimelineBuilder;
}());
var SubTimelineBuilder = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](SubTimelineBuilder, _super);
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} preStyleProps
     * @param {?} postStyleProps
     * @param {?} timings
     * @param {?=} _stretchStartingKeyframe
     */
    function SubTimelineBuilder(element, keyframes, preStyleProps, postStyleProps, timings, _stretchStartingKeyframe) {
        if (_stretchStartingKeyframe === void 0) { _stretchStartingKeyframe = false; }
        var _this = _super.call(this, element, timings.delay) || this;
        _this.element = element;
        _this.keyframes = keyframes;
        _this.preStyleProps = preStyleProps;
        _this.postStyleProps = postStyleProps;
        _this._stretchStartingKeyframe = _stretchStartingKeyframe;
        _this.timings = { duration: timings.duration, delay: timings.delay, easing: timings.easing };
        return _this;
    }
    /**
     * @return {?}
     */
    SubTimelineBuilder.prototype.containsAnimation = function () { return this.keyframes.length > 1; };
    /**
     * @return {?}
     */
    SubTimelineBuilder.prototype.buildKeyframes = function () {
        var /** @type {?} */ keyframes = this.keyframes;
        var _a = this.timings, delay = _a.delay, duration = _a.duration, easing = _a.easing;
        if (this._stretchStartingKeyframe && delay) {
            var /** @type {?} */ newKeyframes = [];
            var /** @type {?} */ totalTime = duration + delay;
            var /** @type {?} */ startingGap = delay / totalTime;
            // the original starting keyframe now starts once the delay is done
            var /** @type {?} */ newFirstKeyframe = copyStyles(keyframes[0], false);
            newFirstKeyframe['offset'] = 0;
            newKeyframes.push(newFirstKeyframe);
            var /** @type {?} */ oldFirstKeyframe = copyStyles(keyframes[0], false);
            oldFirstKeyframe['offset'] = roundOffset(startingGap);
            newKeyframes.push(oldFirstKeyframe);
            /*
              When the keyframe is stretched then it means that the delay before the animation
              starts is gone. Instead the first keyframe is placed at the start of the animation
              and it is then copied to where it starts when the original delay is over. This basically
              means nothing animates during that delay, but the styles are still renderered. For this
              to work the original offset values that exist in the original keyframes must be "warped"
              so that they can take the new keyframe + delay into account.
      
              delay=1000, duration=1000, keyframes = 0 .5 1
      
              turns into
      
              delay=0, duration=2000, keyframes = 0 .33 .66 1
             */
            // offsets between 1 ... n -1 are all warped by the keyframe stretch
            var /** @type {?} */ limit = keyframes.length - 1;
            for (var /** @type {?} */ i = 1; i <= limit; i++) {
                var /** @type {?} */ kf = copyStyles(keyframes[i], false);
                var /** @type {?} */ oldOffset = (kf['offset']);
                var /** @type {?} */ timeAtKeyframe = delay + oldOffset * duration;
                kf['offset'] = roundOffset(timeAtKeyframe / totalTime);
                newKeyframes.push(kf);
            }
            // the new starting keyframe should be added at the start
            duration = totalTime;
            delay = 0;
            easing = '';
            keyframes = newKeyframes;
        }
        return createTimelineInstruction(this.element, keyframes, this.preStyleProps, this.postStyleProps, duration, delay, easing, true);
    };
    return SubTimelineBuilder;
}(TimelineBuilder));
/**
 * @param {?} offset
 * @param {?=} decimalPoints
 * @return {?}
 */
function roundOffset(offset, decimalPoints) {
    if (decimalPoints === void 0) { decimalPoints = 3; }
    var /** @type {?} */ mult = Math.pow(10, decimalPoints - 1);
    return Math.round(offset * mult) / mult;
}
/**
 * @param {?} input
 * @param {?} allStyles
 * @return {?}
 */
function flattenStyles(input, allStyles) {
    var /** @type {?} */ styles = {};
    var /** @type {?} */ allProperties;
    input.forEach(function (token) {
        if (token === '*') {
            allProperties = allProperties || Object.keys(allStyles);
            allProperties.forEach(function (prop) { styles[prop] = __WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* AUTO_STYLE */]; });
        }
        else {
            copyStyles(/** @type {?} */ (token), false, styles);
        }
    });
    return styles;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Animation = (function () {
    /**
     * @param {?} _driver
     * @param {?} input
     */
    function Animation(_driver, input) {
        this._driver = _driver;
        var errors = [];
        var ast = buildAnimationAst(input, errors);
        if (errors.length) {
            var errorMessage = "animation validation failed:\n" + errors.join("\n");
            throw new Error(errorMessage);
        }
        this._animationAst = ast;
    }
    /**
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} destinationStyles
     * @param {?} options
     * @param {?=} subInstructions
     * @return {?}
     */
    Animation.prototype.buildTimelines = function (element, startingStyles, destinationStyles, options, subInstructions) {
        var /** @type {?} */ start = Array.isArray(startingStyles) ? normalizeStyles(startingStyles) : (startingStyles);
        var /** @type {?} */ dest = Array.isArray(destinationStyles) ? normalizeStyles(destinationStyles) : (destinationStyles);
        var /** @type {?} */ errors = [];
        subInstructions = subInstructions || new ElementInstructionMap();
        var /** @type {?} */ result = buildAnimationTimelines(this._driver, element, this._animationAst, start, dest, options, subInstructions, errors);
        if (errors.length) {
            var /** @type {?} */ errorMessage = "animation building failed:\n" + errors.join("\n");
            throw new Error(errorMessage);
        }
        return result;
    };
    return Animation;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @experimental Animation support is experimental.
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */ var AnimationStyleNormalizer = (function () {
    function AnimationStyleNormalizer() {
    }
    return AnimationStyleNormalizer;
}());
/**
 * @experimental Animation support is experimental.
 */
var NoopAnimationStyleNormalizer = (function () {
    function NoopAnimationStyleNormalizer() {
    }
    NoopAnimationStyleNormalizer.prototype.normalizePropertyName = function (propertyName, errors) { return propertyName; };
    NoopAnimationStyleNormalizer.prototype.normalizeStyleValue = function (userProvidedProperty, normalizedProperty, value, errors) {
        return value;
    };
    return NoopAnimationStyleNormalizer;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var WebAnimationsStyleNormalizer = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](WebAnimationsStyleNormalizer, _super);
    function WebAnimationsStyleNormalizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} propertyName
     * @param {?} errors
     * @return {?}
     */
    WebAnimationsStyleNormalizer.prototype.normalizePropertyName = function (propertyName, errors) {
        return dashCaseToCamelCase(propertyName);
    };
    /**
     * @param {?} userProvidedProperty
     * @param {?} normalizedProperty
     * @param {?} value
     * @param {?} errors
     * @return {?}
     */
    WebAnimationsStyleNormalizer.prototype.normalizeStyleValue = function (userProvidedProperty, normalizedProperty, value, errors) {
        var /** @type {?} */ unit = '';
        var /** @type {?} */ strVal = value.toString().trim();
        if (DIMENSIONAL_PROP_MAP[normalizedProperty] && value !== 0 && value !== '0') {
            if (typeof value === 'number') {
                unit = 'px';
            }
            else {
                var /** @type {?} */ valAndSuffixMatch = value.match(/^[+-]?[\d\.]+([a-z]*)$/);
                if (valAndSuffixMatch && valAndSuffixMatch[1].length == 0) {
                    errors.push("Please provide a CSS unit value for " + userProvidedProperty + ":" + value);
                }
            }
        }
        return strVal + unit;
    };
    return WebAnimationsStyleNormalizer;
}(AnimationStyleNormalizer));
var DIMENSIONAL_PROP_MAP = makeBooleanMap('width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective'
    .split(','));
/**
 * @param {?} keys
 * @return {?}
 */
function makeBooleanMap(keys) {
    var /** @type {?} */ map = {};
    keys.forEach(function (key) { return map[key] = true; });
    return map;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} element
 * @param {?} triggerName
 * @param {?} fromState
 * @param {?} toState
 * @param {?} isRemovalTransition
 * @param {?} fromStyles
 * @param {?} toStyles
 * @param {?} timelines
 * @param {?} queriedElements
 * @param {?} preStyleProps
 * @param {?} postStyleProps
 * @param {?=} errors
 * @return {?}
 */
function createTransitionInstruction(element, triggerName, fromState, toState, isRemovalTransition, fromStyles, toStyles, timelines, queriedElements, preStyleProps, postStyleProps, errors) {
    return {
        type: 0 /* TransitionAnimation */,
        element: element,
        triggerName: triggerName,
        isRemovalTransition: isRemovalTransition,
        fromState: fromState,
        fromStyles: fromStyles,
        toState: toState,
        toStyles: toStyles,
        timelines: timelines,
        queriedElements: queriedElements,
        preStyleProps: preStyleProps,
        postStyleProps: postStyleProps,
        errors: errors
    };
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var EMPTY_OBJECT = {};
var AnimationTransitionFactory = (function () {
    /**
     * @param {?} _triggerName
     * @param {?} ast
     * @param {?} _stateStyles
     */
    function AnimationTransitionFactory(_triggerName, ast, _stateStyles) {
        this._triggerName = _triggerName;
        this.ast = ast;
        this._stateStyles = _stateStyles;
    }
    /**
     * @param {?} currentState
     * @param {?} nextState
     * @return {?}
     */
    AnimationTransitionFactory.prototype.match = function (currentState, nextState) {
        return oneOrMoreTransitionsMatch(this.ast.matchers, currentState, nextState);
    };
    /**
     * @param {?} stateName
     * @param {?} params
     * @param {?} errors
     * @return {?}
     */
    AnimationTransitionFactory.prototype.buildStyles = function (stateName, params, errors) {
        var /** @type {?} */ backupStateStyler = this._stateStyles['*'];
        var /** @type {?} */ stateStyler = this._stateStyles[stateName];
        var /** @type {?} */ backupStyles = backupStateStyler ? backupStateStyler.buildStyles(params, errors) : {};
        return stateStyler ? stateStyler.buildStyles(params, errors) : backupStyles;
    };
    /**
     * @param {?} driver
     * @param {?} element
     * @param {?} currentState
     * @param {?} nextState
     * @param {?=} currentOptions
     * @param {?=} nextOptions
     * @param {?=} subInstructions
     * @return {?}
     */
    AnimationTransitionFactory.prototype.build = function (driver, element, currentState, nextState, currentOptions, nextOptions, subInstructions) {
        var /** @type {?} */ errors = [];
        var /** @type {?} */ transitionAnimationParams = this.ast.options && this.ast.options.params || EMPTY_OBJECT;
        var /** @type {?} */ currentAnimationParams = currentOptions && currentOptions.params || EMPTY_OBJECT;
        var /** @type {?} */ currentStateStyles = this.buildStyles(currentState, currentAnimationParams, errors);
        var /** @type {?} */ nextAnimationParams = nextOptions && nextOptions.params || EMPTY_OBJECT;
        var /** @type {?} */ nextStateStyles = this.buildStyles(nextState, nextAnimationParams, errors);
        var /** @type {?} */ queriedElements = new Set();
        var /** @type {?} */ preStyleMap = new Map();
        var /** @type {?} */ postStyleMap = new Map();
        var /** @type {?} */ isRemoval = nextState === 'void';
        var /** @type {?} */ animationOptions = { params: Object.assign({}, transitionAnimationParams, nextAnimationParams) };
        var /** @type {?} */ timelines = buildAnimationTimelines(driver, element, this.ast.animation, currentStateStyles, nextStateStyles, animationOptions, subInstructions, errors);
        if (errors.length) {
            return createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, [], [], preStyleMap, postStyleMap, errors);
        }
        timelines.forEach(function (tl) {
            var /** @type {?} */ elm = tl.element;
            var /** @type {?} */ preProps = getOrSetAsInMap(preStyleMap, elm, {});
            tl.preStyleProps.forEach(function (prop) { return preProps[prop] = true; });
            var /** @type {?} */ postProps = getOrSetAsInMap(postStyleMap, elm, {});
            tl.postStyleProps.forEach(function (prop) { return postProps[prop] = true; });
            if (elm !== element) {
                queriedElements.add(elm);
            }
        });
        var /** @type {?} */ queriedElementsList = iteratorToArray(queriedElements.values());
        return createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, timelines, queriedElementsList, preStyleMap, postStyleMap);
    };
    return AnimationTransitionFactory;
}());
/**
 * @param {?} matchFns
 * @param {?} currentState
 * @param {?} nextState
 * @return {?}
 */
function oneOrMoreTransitionsMatch(matchFns, currentState, nextState) {
    return matchFns.some(function (fn) { return fn(currentState, nextState); });
}
var AnimationStateStyles = (function () {
    /**
     * @param {?} styles
     * @param {?} defaultParams
     */
    function AnimationStateStyles(styles, defaultParams) {
        this.styles = styles;
        this.defaultParams = defaultParams;
    }
    /**
     * @param {?} params
     * @param {?} errors
     * @return {?}
     */
    AnimationStateStyles.prototype.buildStyles = function (params, errors) {
        var /** @type {?} */ finalStyles = {};
        var /** @type {?} */ combinedParams = copyObj(this.defaultParams);
        Object.keys(params).forEach(function (key) {
            var /** @type {?} */ value = params[key];
            if (value != null) {
                combinedParams[key] = value;
            }
        });
        this.styles.styles.forEach(function (value) {
            if (typeof value !== 'string') {
                var /** @type {?} */ styleObj_1 = (value);
                Object.keys(styleObj_1).forEach(function (prop) {
                    var /** @type {?} */ val = styleObj_1[prop];
                    if (val.length > 1) {
                        val = interpolateParams(val, combinedParams, errors);
                    }
                    finalStyles[prop] = val;
                });
            }
        });
        return finalStyles;
    };
    return AnimationStateStyles;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@experimental Animation support is experimental.
 * @param {?} name
 * @param {?} ast
 * @return {?}
 */
function buildTrigger(name, ast) {
    return new AnimationTrigger(name, ast);
}
/**
 * \@experimental Animation support is experimental.
 */
var AnimationTrigger = (function () {
    /**
     * @param {?} name
     * @param {?} ast
     */
    function AnimationTrigger(name, ast) {
        var _this = this;
        this.name = name;
        this.ast = ast;
        this.transitionFactories = [];
        this.states = {};
        ast.states.forEach(function (ast) {
            var defaultParams = (ast.options && ast.options.params) || {};
            _this.states[ast.name] = new AnimationStateStyles(ast.style, defaultParams);
        });
        balanceProperties(this.states, 'true', '1');
        balanceProperties(this.states, 'false', '0');
        ast.transitions.forEach(function (ast) {
            _this.transitionFactories.push(new AnimationTransitionFactory(name, ast, _this.states));
        });
        this.fallbackTransition = createFallbackTransition(name, this.states);
    }
    Object.defineProperty(AnimationTrigger.prototype, "containsQueries", {
        /**
         * @return {?}
         */
        get: function () { return this.ast.queryCount > 0; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} currentState
     * @param {?} nextState
     * @return {?}
     */
    AnimationTrigger.prototype.matchTransition = function (currentState, nextState) {
        var /** @type {?} */ entry = this.transitionFactories.find(function (f) { return f.match(currentState, nextState); });
        return entry || null;
    };
    /**
     * @param {?} currentState
     * @param {?} params
     * @param {?} errors
     * @return {?}
     */
    AnimationTrigger.prototype.matchStyles = function (currentState, params, errors) {
        return this.fallbackTransition.buildStyles(currentState, params, errors);
    };
    return AnimationTrigger;
}());
/**
 * @param {?} triggerName
 * @param {?} states
 * @return {?}
 */
function createFallbackTransition(triggerName, states) {
    var /** @type {?} */ matchers = [function (fromState, toState) { return true; }];
    var /** @type {?} */ animation = new SequenceAst([]);
    var /** @type {?} */ transition = new TransitionAst(matchers, animation);
    return new AnimationTransitionFactory(triggerName, transition, states);
}
/**
 * @param {?} obj
 * @param {?} key1
 * @param {?} key2
 * @return {?}
 */
function balanceProperties(obj, key1, key2) {
    if (obj.hasOwnProperty(key1)) {
        if (!obj.hasOwnProperty(key2)) {
            obj[key2] = obj[key1];
        }
    }
    else if (obj.hasOwnProperty(key2)) {
        obj[key1] = obj[key2];
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var EMPTY_INSTRUCTION_MAP = new ElementInstructionMap();
var TimelineAnimationEngine = (function () {
    /**
     * @param {?} _driver
     * @param {?} _normalizer
     */
    function TimelineAnimationEngine(_driver, _normalizer) {
        this._driver = _driver;
        this._normalizer = _normalizer;
        this._animations = {};
        this._playersById = {};
        this.players = [];
    }
    /**
     * @param {?} id
     * @param {?} metadata
     * @return {?}
     */
    TimelineAnimationEngine.prototype.register = function (id, metadata) {
        var /** @type {?} */ errors = [];
        var /** @type {?} */ ast = buildAnimationAst(metadata, errors);
        if (errors.length) {
            throw new Error("Unable to build the animation due to the following errors: " + errors.join("\n"));
        }
        else {
            this._animations[id] = ast;
        }
    };
    /**
     * @param {?} i
     * @param {?} preStyles
     * @param {?=} postStyles
     * @return {?}
     */
    TimelineAnimationEngine.prototype._buildPlayer = function (i, preStyles, postStyles) {
        var /** @type {?} */ element = i.element;
        var /** @type {?} */ keyframes = normalizeKeyframes(this._driver, this._normalizer, element, i.keyframes, preStyles, postStyles);
        return this._driver.animate(element, keyframes, i.duration, i.delay, i.easing, []);
    };
    /**
     * @param {?} id
     * @param {?} element
     * @param {?=} options
     * @return {?}
     */
    TimelineAnimationEngine.prototype.create = function (id, element, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var /** @type {?} */ errors = [];
        var /** @type {?} */ ast = this._animations[id];
        var /** @type {?} */ instructions;
        var /** @type {?} */ autoStylesMap = new Map();
        if (ast) {
            instructions = buildAnimationTimelines(this._driver, element, ast, {}, {}, options, EMPTY_INSTRUCTION_MAP, errors);
            instructions.forEach(function (inst) {
                var /** @type {?} */ styles = getOrSetAsInMap(autoStylesMap, inst.element, {});
                inst.postStyleProps.forEach(function (prop) { return styles[prop] = null; });
            });
        }
        else {
            errors.push('The requested animation doesn\'t exist or has already been destroyed');
            instructions = [];
        }
        if (errors.length) {
            throw new Error("Unable to create the animation due to the following errors: " + errors.join("\n"));
        }
        autoStylesMap.forEach(function (styles, element) {
            Object.keys(styles).forEach(function (prop) { styles[prop] = _this._driver.computeStyle(element, prop, __WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* AUTO_STYLE */]); });
        });
        var /** @type {?} */ players = instructions.map(function (i) {
            var /** @type {?} */ styles = autoStylesMap.get(i.element);
            return _this._buildPlayer(i, {}, styles);
        });
        var /** @type {?} */ player = optimizeGroupPlayer(players);
        this._playersById[id] = player;
        player.onDestroy(function () { return _this.destroy(id); });
        this.players.push(player);
        return player;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    TimelineAnimationEngine.prototype.destroy = function (id) {
        var /** @type {?} */ player = this._getPlayer(id);
        player.destroy();
        delete this._playersById[id];
        var /** @type {?} */ index = this.players.indexOf(player);
        if (index >= 0) {
            this.players.splice(index, 1);
        }
    };
    /**
     * @param {?} id
     * @return {?}
     */
    TimelineAnimationEngine.prototype._getPlayer = function (id) {
        var /** @type {?} */ player = this._playersById[id];
        if (!player) {
            throw new Error("Unable to find the timeline player referenced by " + id);
        }
        return player;
    };
    /**
     * @param {?} id
     * @param {?} element
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    TimelineAnimationEngine.prototype.listen = function (id, element, eventName, callback) {
        // triggerName, fromState, toState are all ignored for timeline animations
        var /** @type {?} */ baseEvent = makeAnimationEvent(element, '', '', '');
        listenOnPlayer(this._getPlayer(id), eventName, baseEvent, callback);
        return function () { };
    };
    /**
     * @param {?} id
     * @param {?} element
     * @param {?} command
     * @param {?} args
     * @return {?}
     */
    TimelineAnimationEngine.prototype.command = function (id, element, command, args) {
        if (command == 'register') {
            this.register(id, /** @type {?} */ (args[0]));
            return;
        }
        if (command == 'create') {
            var /** @type {?} */ options = ((args[0] || {}));
            this.create(id, element, options);
            return;
        }
        var /** @type {?} */ player = this._getPlayer(id);
        switch (command) {
            case 'play':
                player.play();
                break;
            case 'pause':
                player.pause();
                break;
            case 'reset':
                player.reset();
                break;
            case 'restart':
                player.restart();
                break;
            case 'finish':
                player.finish();
                break;
            case 'init':
                player.init();
                break;
            case 'setPosition':
                player.setPosition(parseFloat(/** @type {?} */ (args[0])));
                break;
            case 'destroy':
                this.destroy(id);
                break;
        }
    };
    return TimelineAnimationEngine;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var QUEUED_CLASSNAME = 'ng-animate-queued';
var QUEUED_SELECTOR = '.ng-animate-queued';
var DISABLED_CLASSNAME = 'ng-animate-disabled';
var DISABLED_SELECTOR = '.ng-animate-disabled';
var EMPTY_PLAYER_ARRAY = [];
var NULL_REMOVAL_STATE = {
    namespaceId: '',
    setForRemoval: null,
    hasAnimation: false,
    removedBeforeQueried: false
};
var NULL_REMOVED_QUERIED_STATE = {
    namespaceId: '',
    setForRemoval: null,
    hasAnimation: false,
    removedBeforeQueried: true
};
var REMOVAL_FLAG = '__ng_removed';
var StateValue = (function () {
    /**
     * @param {?} input
     */
    function StateValue(input) {
        var isObj = input && input.hasOwnProperty('value');
        var value = isObj ? input['value'] : input;
        this.value = normalizeTriggerValue(value);
        if (isObj) {
            var options = copyObj(input);
            delete options['value'];
            this.options = options;
        }
        else {
            this.options = {};
        }
        if (!this.options.params) {
            this.options.params = {};
        }
    }
    Object.defineProperty(StateValue.prototype, "params", {
        /**
         * @return {?}
         */
        get: function () { return (this.options.params); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} options
     * @return {?}
     */
    StateValue.prototype.absorbOptions = function (options) {
        var /** @type {?} */ newParams = options.params;
        if (newParams) {
            var /** @type {?} */ oldParams_2 = ((this.options.params));
            Object.keys(newParams).forEach(function (prop) {
                if (oldParams_2[prop] == null) {
                    oldParams_2[prop] = newParams[prop];
                }
            });
        }
    };
    return StateValue;
}());
var VOID_VALUE = 'void';
var DEFAULT_STATE_VALUE = new StateValue(VOID_VALUE);
var DELETED_STATE_VALUE = new StateValue('DELETED');
var AnimationTransitionNamespace = (function () {
    /**
     * @param {?} id
     * @param {?} hostElement
     * @param {?} _engine
     */
    function AnimationTransitionNamespace(id, hostElement, _engine) {
        this.id = id;
        this.hostElement = hostElement;
        this._engine = _engine;
        this.players = [];
        this._triggers = {};
        this._queue = [];
        this._elementListeners = new Map();
        this._hostClassName = 'ng-tns-' + id;
        addClass(hostElement, this._hostClassName);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} phase
     * @param {?} callback
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.listen = function (element, name, phase, callback) {
        var _this = this;
        if (!this._triggers.hasOwnProperty(name)) {
            throw new Error("Unable to listen on the animation trigger event \"" + phase + "\" because the animation trigger \"" + name + "\" doesn't exist!");
        }
        if (phase == null || phase.length == 0) {
            throw new Error("Unable to listen on the animation trigger \"" + name + "\" because the provided event is undefined!");
        }
        if (!isTriggerEventValid(phase)) {
            throw new Error("The provided animation trigger event \"" + phase + "\" for the animation trigger \"" + name + "\" is not supported!");
        }
        var /** @type {?} */ listeners = getOrSetAsInMap(this._elementListeners, element, []);
        var /** @type {?} */ data = { name: name, phase: phase, callback: callback };
        listeners.push(data);
        var /** @type {?} */ triggersWithStates = getOrSetAsInMap(this._engine.statesByElement, element, {});
        if (!triggersWithStates.hasOwnProperty(name)) {
            addClass(element, NG_TRIGGER_CLASSNAME);
            addClass(element, NG_TRIGGER_CLASSNAME + '-' + name);
            triggersWithStates[name] = null;
        }
        return function () {
            // the event listener is removed AFTER the flush has occurred such
            // that leave animations callbacks can fire (otherwise if the node
            // is removed in between then the listeners would be deregistered)
            _this._engine.afterFlush(function () {
                var /** @type {?} */ index = listeners.indexOf(data);
                if (index >= 0) {
                    listeners.splice(index, 1);
                }
                if (!_this._triggers[name]) {
                    delete triggersWithStates[name];
                }
            });
        };
    };
    /**
     * @param {?} name
     * @param {?} ast
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.register = function (name, ast) {
        if (this._triggers[name]) {
            // throw
            return false;
        }
        else {
            this._triggers[name] = ast;
            return true;
        }
    };
    /**
     * @param {?} name
     * @return {?}
     */
    AnimationTransitionNamespace.prototype._getTrigger = function (name) {
        var /** @type {?} */ trigger = this._triggers[name];
        if (!trigger) {
            throw new Error("The provided animation trigger \"" + name + "\" has not been registered!");
        }
        return trigger;
    };
    /**
     * @param {?} element
     * @param {?} triggerName
     * @param {?} value
     * @param {?=} defaultToFallback
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.trigger = function (element, triggerName, value, defaultToFallback) {
        var _this = this;
        if (defaultToFallback === void 0) { defaultToFallback = true; }
        var /** @type {?} */ trigger = this._getTrigger(triggerName);
        var /** @type {?} */ player = new TransitionAnimationPlayer(this.id, triggerName, element);
        var /** @type {?} */ triggersWithStates = this._engine.statesByElement.get(element);
        if (!triggersWithStates) {
            addClass(element, NG_TRIGGER_CLASSNAME);
            addClass(element, NG_TRIGGER_CLASSNAME + '-' + triggerName);
            this._engine.statesByElement.set(element, triggersWithStates = {});
        }
        var /** @type {?} */ fromState = triggersWithStates[triggerName];
        var /** @type {?} */ toState = new StateValue(value);
        var /** @type {?} */ isObj = value && value.hasOwnProperty('value');
        if (!isObj && fromState) {
            toState.absorbOptions(fromState.options);
        }
        triggersWithStates[triggerName] = toState;
        if (!fromState) {
            fromState = DEFAULT_STATE_VALUE;
        }
        else if (fromState === DELETED_STATE_VALUE) {
            return player;
        }
        var /** @type {?} */ isRemoval = toState.value === VOID_VALUE;
        // normally this isn't reached by here, however, if an object expression
        // is passed in then it may be a new object each time. Comparing the value
        // is important since that will stay the same despite there being a new object.
        // The removal arc here is special cased because the same element is triggered
        // twice in the event that it contains animations on the outer/inner portions
        // of the host container
        if (!isRemoval && fromState.value === toState.value) {
            // this means that despite the value not changing, some inner params
            // have changed which means that the animation final styles need to be applied
            if (!objEquals(fromState.params, toState.params)) {
                var /** @type {?} */ errors = [];
                var /** @type {?} */ fromStyles_1 = trigger.matchStyles(fromState.value, fromState.params, errors);
                var /** @type {?} */ toStyles_1 = trigger.matchStyles(toState.value, toState.params, errors);
                if (errors.length) {
                    this._engine.reportError(errors);
                }
                else {
                    this._engine.afterFlush(function () {
                        eraseStyles(element, fromStyles_1);
                        setStyles(element, toStyles_1);
                    });
                }
            }
            return;
        }
        var /** @type {?} */ playersOnElement = getOrSetAsInMap(this._engine.playersByElement, element, []);
        playersOnElement.forEach(function (player) {
            // only remove the player if it is queued on the EXACT same trigger/namespace
            // we only also deal with queued players here because if the animation has
            // started then we want to keep the player alive until the flush happens
            // (which is where the previousPlayers are passed into the new palyer)
            if (player.namespaceId == _this.id && player.triggerName == triggerName && player.queued) {
                player.destroy();
            }
        });
        var /** @type {?} */ transition = trigger.matchTransition(fromState.value, toState.value);
        var /** @type {?} */ isFallbackTransition = false;
        if (!transition) {
            if (!defaultToFallback)
                return;
            transition = trigger.fallbackTransition;
            isFallbackTransition = true;
        }
        this._engine.totalQueuedPlayers++;
        this._queue.push({ element: element, triggerName: triggerName, transition: transition, fromState: fromState, toState: toState, player: player, isFallbackTransition: isFallbackTransition });
        if (!isFallbackTransition) {
            addClass(element, QUEUED_CLASSNAME);
            player.onStart(function () { removeClass(element, QUEUED_CLASSNAME); });
        }
        player.onDone(function () {
            var /** @type {?} */ index = _this.players.indexOf(player);
            if (index >= 0) {
                _this.players.splice(index, 1);
            }
            var /** @type {?} */ players = _this._engine.playersByElement.get(element);
            if (players) {
                var /** @type {?} */ index_1 = players.indexOf(player);
                if (index_1 >= 0) {
                    players.splice(index_1, 1);
                }
            }
        });
        this.players.push(player);
        playersOnElement.push(player);
        return player;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.deregister = function (name) {
        var _this = this;
        delete this._triggers[name];
        this._engine.statesByElement.forEach(function (stateMap, element) { delete stateMap[name]; });
        this._elementListeners.forEach(function (listeners, element) {
            _this._elementListeners.set(element, listeners.filter(function (entry) { return entry.name != name; }));
        });
    };
    /**
     * @param {?} element
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.clearElementCache = function (element) {
        this._engine.statesByElement.delete(element);
        this._elementListeners.delete(element);
        var /** @type {?} */ elementPlayers = this._engine.playersByElement.get(element);
        if (elementPlayers) {
            elementPlayers.forEach(function (player) { return player.destroy(); });
            this._engine.playersByElement.delete(element);
        }
    };
    /**
     * @param {?} rootElement
     * @param {?} context
     * @param {?=} animate
     * @return {?}
     */
    AnimationTransitionNamespace.prototype._destroyInnerNodes = function (rootElement, context, animate) {
        var _this = this;
        if (animate === void 0) { animate = false; }
        this._engine.driver.query(rootElement, NG_TRIGGER_SELECTOR, true).forEach(function (elm) {
            if (animate && containsClass(elm, _this._hostClassName)) {
                var /** @type {?} */ innerNs = _this._engine.namespacesByHostElement.get(elm);
                // special case for a host element with animations on the same element
                if (innerNs) {
                    innerNs.removeNode(elm, context, true);
                }
                _this.removeNode(elm, context, true);
            }
            else {
                _this.clearElementCache(elm);
            }
        });
    };
    /**
     * @param {?} element
     * @param {?} context
     * @param {?=} doNotRecurse
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.removeNode = function (element, context, doNotRecurse) {
        var _this = this;
        var /** @type {?} */ engine = this._engine;
        if (!doNotRecurse && element.childElementCount) {
            this._destroyInnerNodes(element, context, true);
        }
        var /** @type {?} */ triggerStates = engine.statesByElement.get(element);
        if (triggerStates) {
            var /** @type {?} */ players_1 = [];
            Object.keys(triggerStates).forEach(function (triggerName) {
                // this check is here in the event that an element is removed
                // twice (both on the host level and the component level)
                if (_this._triggers[triggerName]) {
                    var /** @type {?} */ player = _this.trigger(element, triggerName, VOID_VALUE, false);
                    if (player) {
                        players_1.push(player);
                    }
                }
            });
            if (players_1.length) {
                engine.markElementAsRemoved(this.id, element, true, context);
                optimizeGroupPlayer(players_1).onDone(function () { return engine.processLeaveNode(element); });
                return;
            }
        }
        // find the player that is animating and make sure that the
        // removal is delayed until that player has completed
        var /** @type {?} */ containsPotentialParentTransition = false;
        if (engine.totalAnimations) {
            var /** @type {?} */ currentPlayers = engine.players.length ? engine.playersByQueriedElement.get(element) : [];
            // when this `if statement` does not continue forward it means that
            // a previous animation query has selected the current element and
            // is animating it. In this situation want to continue fowards and
            // allow the element to be queued up for animation later.
            if (currentPlayers && currentPlayers.length) {
                containsPotentialParentTransition = true;
            }
            else {
                var /** @type {?} */ parent = element;
                while (parent = parent.parentNode) {
                    var /** @type {?} */ triggers = engine.statesByElement.get(parent);
                    if (triggers) {
                        containsPotentialParentTransition = true;
                        break;
                    }
                }
            }
        }
        // at this stage we know that the element will either get removed
        // during flush or will be picked up by a parent query. Either way
        // we need to fire the listeners for this element when it DOES get
        // removed (once the query parent animation is done or after flush)
        var /** @type {?} */ listeners = this._elementListeners.get(element);
        if (listeners) {
            var /** @type {?} */ visitedTriggers_1 = new Set();
            listeners.forEach(function (listener) {
                var /** @type {?} */ triggerName = listener.name;
                if (visitedTriggers_1.has(triggerName))
                    return;
                visitedTriggers_1.add(triggerName);
                var /** @type {?} */ trigger = _this._triggers[triggerName];
                var /** @type {?} */ transition = trigger.fallbackTransition;
                var /** @type {?} */ elementStates = ((engine.statesByElement.get(element)));
                var /** @type {?} */ fromState = elementStates[triggerName] || DEFAULT_STATE_VALUE;
                var /** @type {?} */ toState = new StateValue(VOID_VALUE);
                var /** @type {?} */ player = new TransitionAnimationPlayer(_this.id, triggerName, element);
                _this._engine.totalQueuedPlayers++;
                _this._queue.push({
                    element: element,
                    triggerName: triggerName,
                    transition: transition,
                    fromState: fromState,
                    toState: toState,
                    player: player,
                    isFallbackTransition: true
                });
            });
        }
        // whether or not a parent has an animation we need to delay the deferral of the leave
        // operation until we have more information (which we do after flush() has been called)
        if (containsPotentialParentTransition) {
            engine.markElementAsRemoved(this.id, element, false, context);
        }
        else {
            // we do this after the flush has occurred such
            // that the callbacks can be fired
            engine.afterFlush(function () { return _this.clearElementCache(element); });
            engine.destroyInnerAnimations(element);
            engine._onRemovalComplete(element, context);
        }
    };
    /**
     * @param {?} element
     * @param {?} parent
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.insertNode = function (element, parent) { addClass(element, this._hostClassName); };
    /**
     * @param {?} microtaskId
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.drainQueuedTransitions = function (microtaskId) {
        var _this = this;
        var /** @type {?} */ instructions = [];
        this._queue.forEach(function (entry) {
            var /** @type {?} */ player = entry.player;
            if (player.destroyed)
                return;
            var /** @type {?} */ element = entry.element;
            var /** @type {?} */ listeners = _this._elementListeners.get(element);
            if (listeners) {
                listeners.forEach(function (listener) {
                    if (listener.name == entry.triggerName) {
                        var /** @type {?} */ baseEvent = makeAnimationEvent(element, entry.triggerName, entry.fromState.value, entry.toState.value);
                        ((baseEvent))['_data'] = microtaskId;
                        listenOnPlayer(entry.player, listener.phase, baseEvent, listener.callback);
                    }
                });
            }
            if (player.markedForDestroy) {
                _this._engine.afterFlush(function () {
                    // now we can destroy the element properly since the event listeners have
                    // been bound to the player
                    player.destroy();
                });
            }
            else {
                instructions.push(entry);
            }
        });
        this._queue = [];
        return instructions.sort(function (a, b) {
            // if depCount == 0 them move to front
            // otherwise if a contains b then move back
            var /** @type {?} */ d0 = a.transition.ast.depCount;
            var /** @type {?} */ d1 = b.transition.ast.depCount;
            if (d0 == 0 || d1 == 0) {
                return d0 - d1;
            }
            return _this._engine.driver.containsElement(a.element, b.element) ? 1 : -1;
        });
    };
    /**
     * @param {?} context
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.destroy = function (context) {
        this.players.forEach(function (p) { return p.destroy(); });
        this._destroyInnerNodes(this.hostElement, context);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.elementContainsData = function (element) {
        var /** @type {?} */ containsData = false;
        if (this._elementListeners.has(element))
            containsData = true;
        containsData =
            (this._queue.find(function (entry) { return entry.element === element; }) ? true : false) || containsData;
        return containsData;
    };
    return AnimationTransitionNamespace;
}());
var TransitionAnimationEngine = (function () {
    /**
     * @param {?} driver
     * @param {?} _normalizer
     */
    function TransitionAnimationEngine(driver, _normalizer) {
        this.driver = driver;
        this._normalizer = _normalizer;
        this.players = [];
        this.newHostElements = new Map();
        this.playersByElement = new Map();
        this.playersByQueriedElement = new Map();
        this.statesByElement = new Map();
        this.disabledNodes = new Set();
        this.totalAnimations = 0;
        this.totalQueuedPlayers = 0;
        this._namespaceLookup = {};
        this._namespaceList = [];
        this._flushFns = [];
        this._whenQuietFns = [];
        this.namespacesByHostElement = new Map();
        this.collectedEnterElements = [];
        this.collectedLeaveElements = [];
        this.onRemovalComplete = function (element, context) { };
    }
    /**
     * @param {?} element
     * @param {?} context
     * @return {?}
     */
    TransitionAnimationEngine.prototype._onRemovalComplete = function (element, context) { this.onRemovalComplete(element, context); };
    Object.defineProperty(TransitionAnimationEngine.prototype, "queuedPlayers", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ players = [];
            this._namespaceList.forEach(function (ns) {
                ns.players.forEach(function (player) {
                    if (player.queued) {
                        players.push(player);
                    }
                });
            });
            return players;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} namespaceId
     * @param {?} hostElement
     * @return {?}
     */
    TransitionAnimationEngine.prototype.createNamespace = function (namespaceId, hostElement) {
        var /** @type {?} */ ns = new AnimationTransitionNamespace(namespaceId, hostElement, this);
        if (hostElement.parentNode) {
            this._balanceNamespaceList(ns, hostElement);
        }
        else {
            // defer this later until flush during when the host element has
            // been inserted so that we know exactly where to place it in
            // the namespace list
            this.newHostElements.set(hostElement, ns);
            // given that this host element is apart of the animation code, it
            // may or may not be inserted by a parent node that is an of an
            // animation renderer type. If this happens then we can still have
            // access to this item when we query for :enter nodes. If the parent
            // is a renderer then the set data-structure will normalize the entry
            this.collectEnterElement(hostElement);
        }
        return this._namespaceLookup[namespaceId] = ns;
    };
    /**
     * @param {?} ns
     * @param {?} hostElement
     * @return {?}
     */
    TransitionAnimationEngine.prototype._balanceNamespaceList = function (ns, hostElement) {
        var /** @type {?} */ limit = this._namespaceList.length - 1;
        if (limit >= 0) {
            var /** @type {?} */ found = false;
            for (var /** @type {?} */ i = limit; i >= 0; i--) {
                var /** @type {?} */ nextNamespace = this._namespaceList[i];
                if (this.driver.containsElement(nextNamespace.hostElement, hostElement)) {
                    this._namespaceList.splice(i + 1, 0, ns);
                    found = true;
                    break;
                }
            }
            if (!found) {
                this._namespaceList.splice(0, 0, ns);
            }
        }
        else {
            this._namespaceList.push(ns);
        }
        this.namespacesByHostElement.set(hostElement, ns);
        return ns;
    };
    /**
     * @param {?} namespaceId
     * @param {?} hostElement
     * @return {?}
     */
    TransitionAnimationEngine.prototype.register = function (namespaceId, hostElement) {
        var /** @type {?} */ ns = this._namespaceLookup[namespaceId];
        if (!ns) {
            ns = this.createNamespace(namespaceId, hostElement);
        }
        return ns;
    };
    /**
     * @param {?} namespaceId
     * @param {?} name
     * @param {?} trigger
     * @return {?}
     */
    TransitionAnimationEngine.prototype.registerTrigger = function (namespaceId, name, trigger) {
        var /** @type {?} */ ns = this._namespaceLookup[namespaceId];
        if (ns && ns.register(name, trigger)) {
            this.totalAnimations++;
        }
    };
    /**
     * @param {?} namespaceId
     * @param {?} context
     * @return {?}
     */
    TransitionAnimationEngine.prototype.destroy = function (namespaceId, context) {
        var _this = this;
        if (!namespaceId)
            return;
        var /** @type {?} */ ns = this._fetchNamespace(namespaceId);
        this.afterFlush(function () {
            _this.namespacesByHostElement.delete(ns.hostElement);
            delete _this._namespaceLookup[namespaceId];
            var /** @type {?} */ index = _this._namespaceList.indexOf(ns);
            if (index >= 0) {
                _this._namespaceList.splice(index, 1);
            }
        });
        this.afterFlushAnimationsDone(function () { return ns.destroy(context); });
    };
    /**
     * @param {?} id
     * @return {?}
     */
    TransitionAnimationEngine.prototype._fetchNamespace = function (id) { return this._namespaceLookup[id]; };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    TransitionAnimationEngine.prototype.trigger = function (namespaceId, element, name, value) {
        if (isElementNode(element)) {
            this._fetchNamespace(namespaceId).trigger(element, name, value);
            return true;
        }
        return false;
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} parent
     * @param {?} insertBefore
     * @return {?}
     */
    TransitionAnimationEngine.prototype.insertNode = function (namespaceId, element, parent, insertBefore) {
        if (!isElementNode(element))
            return;
        // special case for when an element is removed and reinserted (move operation)
        // when this occurs we do not want to use the element for deletion later
        var /** @type {?} */ details = (element[REMOVAL_FLAG]);
        if (details && details.setForRemoval) {
            details.setForRemoval = false;
        }
        // in the event that the namespaceId is blank then the caller
        // code does not contain any animation code in it, but it is
        // just being called so that the node is marked as being inserted
        if (namespaceId) {
            this._fetchNamespace(namespaceId).insertNode(element, parent);
        }
        // only *directives and host elements are inserted before
        if (insertBefore) {
            this.collectEnterElement(element);
        }
    };
    /**
     * @param {?} element
     * @return {?}
     */
    TransitionAnimationEngine.prototype.collectEnterElement = function (element) { this.collectedEnterElements.push(element); };
    /**
     * @param {?} element
     * @param {?} value
     * @return {?}
     */
    TransitionAnimationEngine.prototype.markElementAsDisabled = function (element, value) {
        if (value) {
            if (!this.disabledNodes.has(element)) {
                this.disabledNodes.add(element);
                addClass(element, DISABLED_CLASSNAME);
            }
        }
        else if (this.disabledNodes.has(element)) {
            this.disabledNodes.delete(element);
            removeClass(element, DISABLED_CLASSNAME);
        }
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} context
     * @param {?=} doNotRecurse
     * @return {?}
     */
    TransitionAnimationEngine.prototype.removeNode = function (namespaceId, element, context, doNotRecurse) {
        if (!isElementNode(element)) {
            this._onRemovalComplete(element, context);
            return;
        }
        var /** @type {?} */ ns = namespaceId ? this._fetchNamespace(namespaceId) : null;
        if (ns) {
            ns.removeNode(element, context, doNotRecurse);
        }
        else {
            this.markElementAsRemoved(namespaceId, element, false, context);
        }
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?=} hasAnimation
     * @param {?=} context
     * @return {?}
     */
    TransitionAnimationEngine.prototype.markElementAsRemoved = function (namespaceId, element, hasAnimation, context) {
        this.collectedLeaveElements.push(element);
        element[REMOVAL_FLAG] = {
            namespaceId: namespaceId,
            setForRemoval: context, hasAnimation: hasAnimation,
            removedBeforeQueried: false
        };
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} name
     * @param {?} phase
     * @param {?} callback
     * @return {?}
     */
    TransitionAnimationEngine.prototype.listen = function (namespaceId, element, name, phase, callback) {
        if (isElementNode(element)) {
            return this._fetchNamespace(namespaceId).listen(element, name, phase, callback);
        }
        return function () { };
    };
    /**
     * @param {?} entry
     * @param {?} subTimelines
     * @return {?}
     */
    TransitionAnimationEngine.prototype._buildInstruction = function (entry, subTimelines) {
        return entry.transition.build(this.driver, entry.element, entry.fromState.value, entry.toState.value, entry.fromState.options, entry.toState.options, subTimelines);
    };
    /**
     * @param {?} containerElement
     * @return {?}
     */
    TransitionAnimationEngine.prototype.destroyInnerAnimations = function (containerElement) {
        var _this = this;
        var /** @type {?} */ elements = this.driver.query(containerElement, NG_TRIGGER_SELECTOR, true);
        elements.forEach(function (element) {
            var /** @type {?} */ players = _this.playersByElement.get(element);
            if (players) {
                players.forEach(function (player) {
                    // special case for when an element is set for destruction, but hasn't started.
                    // in this situation we want to delay the destruction until the flush occurs
                    // so that any event listeners attached to the player are triggered.
                    if (player.queued) {
                        player.markedForDestroy = true;
                    }
                    else {
                        player.destroy();
                    }
                });
            }
            var /** @type {?} */ stateMap = _this.statesByElement.get(element);
            if (stateMap) {
                Object.keys(stateMap).forEach(function (triggerName) { return stateMap[triggerName] = DELETED_STATE_VALUE; });
            }
        });
        if (this.playersByQueriedElement.size == 0)
            return;
        elements = this.driver.query(containerElement, NG_ANIMATING_SELECTOR, true);
        if (elements.length) {
            elements.forEach(function (element) {
                var /** @type {?} */ players = _this.playersByQueriedElement.get(element);
                if (players) {
                    players.forEach(function (player) { return player.finish(); });
                }
            });
        }
    };
    /**
     * @return {?}
     */
    TransitionAnimationEngine.prototype.whenRenderingDone = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.players.length) {
                return optimizeGroupPlayer(_this.players).onDone(function () { return resolve(); });
            }
            else {
                resolve();
            }
        });
    };
    /**
     * @param {?} element
     * @return {?}
     */
    TransitionAnimationEngine.prototype.processLeaveNode = function (element) {
        var _this = this;
        var /** @type {?} */ details = (element[REMOVAL_FLAG]);
        if (details && details.setForRemoval) {
            // this will prevent it from removing it twice
            element[REMOVAL_FLAG] = NULL_REMOVAL_STATE;
            if (details.namespaceId) {
                this.destroyInnerAnimations(element);
                var /** @type {?} */ ns = this._fetchNamespace(details.namespaceId);
                if (ns) {
                    ns.clearElementCache(element);
                }
            }
            this._onRemovalComplete(element, details.setForRemoval);
        }
        if (this.driver.matchesElement(element, DISABLED_SELECTOR)) {
            this.markElementAsDisabled(element, false);
        }
        this.driver.query(element, DISABLED_SELECTOR, true).forEach(function (node) {
            _this.markElementAsDisabled(element, false);
        });
    };
    /**
     * @param {?=} microtaskId
     * @return {?}
     */
    TransitionAnimationEngine.prototype.flush = function (microtaskId) {
        var _this = this;
        if (microtaskId === void 0) { microtaskId = -1; }
        var /** @type {?} */ players = [];
        if (this.newHostElements.size) {
            this.newHostElements.forEach(function (ns, element) { return _this._balanceNamespaceList(ns, element); });
            this.newHostElements.clear();
        }
        if (this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
            var /** @type {?} */ cleanupFns = [];
            try {
                players = this._flushAnimations(cleanupFns, microtaskId);
            }
            finally {
                for (var /** @type {?} */ i = 0; i < cleanupFns.length; i++) {
                    cleanupFns[i]();
                }
            }
        }
        else {
            for (var /** @type {?} */ i = 0; i < this.collectedLeaveElements.length; i++) {
                var /** @type {?} */ element = this.collectedLeaveElements[i];
                this.processLeaveNode(element);
            }
        }
        this.totalQueuedPlayers = 0;
        this.collectedEnterElements.length = 0;
        this.collectedLeaveElements.length = 0;
        this._flushFns.forEach(function (fn) { return fn(); });
        this._flushFns = [];
        if (this._whenQuietFns.length) {
            // we move these over to a variable so that
            // if any new callbacks are registered in another
            // flush they do not populate the existing set
            var /** @type {?} */ quietFns_1 = this._whenQuietFns;
            this._whenQuietFns = [];
            if (players.length) {
                optimizeGroupPlayer(players).onDone(function () { quietFns_1.forEach(function (fn) { return fn(); }); });
            }
            else {
                quietFns_1.forEach(function (fn) { return fn(); });
            }
        }
    };
    /**
     * @param {?} errors
     * @return {?}
     */
    TransitionAnimationEngine.prototype.reportError = function (errors) {
        throw new Error("Unable to process animations due to the following failed trigger transitions\n " + errors.join("\n"));
    };
    /**
     * @param {?} cleanupFns
     * @param {?} microtaskId
     * @return {?}
     */
    TransitionAnimationEngine.prototype._flushAnimations = function (cleanupFns, microtaskId) {
        var _this = this;
        var /** @type {?} */ subTimelines = new ElementInstructionMap();
        var /** @type {?} */ skippedPlayers = [];
        var /** @type {?} */ skippedPlayersMap = new Map();
        var /** @type {?} */ queuedInstructions = [];
        var /** @type {?} */ queriedElements = new Map();
        var /** @type {?} */ allPreStyleElements = new Map();
        var /** @type {?} */ allPostStyleElements = new Map();
        var /** @type {?} */ disabledElementsSet = new Set();
        this.disabledNodes.forEach(function (node) {
            disabledElementsSet.add(node);
            var /** @type {?} */ nodesThatAreDisabled = _this.driver.query(node, QUEUED_SELECTOR, true);
            for (var /** @type {?} */ i = 0; i < nodesThatAreDisabled.length; i++) {
                disabledElementsSet.add(nodesThatAreDisabled[i]);
            }
        });
        var /** @type {?} */ bodyNode = getBodyNode();
        var /** @type {?} */ allEnterNodes = this.collectedEnterElements.length ?
            this.collectedEnterElements.filter(createIsRootFilterFn(this.collectedEnterElements)) :
            [];
        // this must occur before the instructions are built below such that
        // the :enter queries match the elements (since the timeline queries
        // are fired during instruction building).
        for (var /** @type {?} */ i = 0; i < allEnterNodes.length; i++) {
            addClass(allEnterNodes[i], ENTER_CLASSNAME);
        }
        var /** @type {?} */ allLeaveNodes = [];
        var /** @type {?} */ leaveNodesWithoutAnimations = [];
        for (var /** @type {?} */ i = 0; i < this.collectedLeaveElements.length; i++) {
            var /** @type {?} */ element = this.collectedLeaveElements[i];
            var /** @type {?} */ details = (element[REMOVAL_FLAG]);
            if (details && details.setForRemoval) {
                addClass(element, LEAVE_CLASSNAME);
                allLeaveNodes.push(element);
                if (!details.hasAnimation) {
                    leaveNodesWithoutAnimations.push(element);
                }
            }
        }
        cleanupFns.push(function () {
            allEnterNodes.forEach(function (element) { return removeClass(element, ENTER_CLASSNAME); });
            allLeaveNodes.forEach(function (element) {
                removeClass(element, LEAVE_CLASSNAME);
                _this.processLeaveNode(element);
            });
        });
        var /** @type {?} */ allPlayers = [];
        var /** @type {?} */ erroneousTransitions = [];
        for (var /** @type {?} */ i = this._namespaceList.length - 1; i >= 0; i--) {
            var /** @type {?} */ ns = this._namespaceList[i];
            ns.drainQueuedTransitions(microtaskId).forEach(function (entry) {
                var /** @type {?} */ player = entry.player;
                allPlayers.push(player);
                var /** @type {?} */ element = entry.element;
                if (!bodyNode || !_this.driver.containsElement(bodyNode, element)) {
                    player.destroy();
                    return;
                }
                var /** @type {?} */ instruction = ((_this._buildInstruction(entry, subTimelines)));
                if (instruction.errors && instruction.errors.length) {
                    erroneousTransitions.push(instruction);
                    return;
                }
                // if a unmatched transition is queued to go then it SHOULD NOT render
                // an animation and cancel the previously running animations.
                if (entry.isFallbackTransition) {
                    player.onStart(function () { return eraseStyles(element, instruction.fromStyles); });
                    player.onDestroy(function () { return setStyles(element, instruction.toStyles); });
                    skippedPlayers.push(player);
                    return;
                }
                // this means that if a parent animation uses this animation as a sub trigger
                // then it will instruct the timeline builder to not add a player delay, but
                // instead stretch the first keyframe gap up until the animation starts. The
                // reason this is important is to prevent extra initialization styles from being
                // required by the user in the animation.
                instruction.timelines.forEach(function (tl) { return tl.stretchStartingKeyframe = true; });
                subTimelines.append(element, instruction.timelines);
                var /** @type {?} */ tuple = { instruction: instruction, player: player, element: element };
                queuedInstructions.push(tuple);
                instruction.queriedElements.forEach(function (element) { return getOrSetAsInMap(queriedElements, element, []).push(player); });
                instruction.preStyleProps.forEach(function (stringMap, element) {
                    var /** @type {?} */ props = Object.keys(stringMap);
                    if (props.length) {
                        var /** @type {?} */ setVal_1 = ((allPreStyleElements.get(element)));
                        if (!setVal_1) {
                            allPreStyleElements.set(element, setVal_1 = new Set());
                        }
                        props.forEach(function (prop) { return setVal_1.add(prop); });
                    }
                });
                instruction.postStyleProps.forEach(function (stringMap, element) {
                    var /** @type {?} */ props = Object.keys(stringMap);
                    var /** @type {?} */ setVal = ((allPostStyleElements.get(element)));
                    if (!setVal) {
                        allPostStyleElements.set(element, setVal = new Set());
                    }
                    props.forEach(function (prop) { return setVal.add(prop); });
                });
            });
        }
        if (erroneousTransitions.length) {
            var /** @type {?} */ errors_1 = [];
            erroneousTransitions.forEach(function (instruction) {
                errors_1.push("@" + instruction.triggerName + " has failed due to:\n"); /** @type {?} */
                ((instruction.errors)).forEach(function (error) { return errors_1.push("- " + error + "\n"); });
            });
            allPlayers.forEach(function (player) { return player.destroy(); });
            this.reportError(errors_1);
        }
        // these can only be detected here since we have a map of all the elements
        // that have animations attached to them...
        var /** @type {?} */ enterNodesWithoutAnimations = [];
        for (var /** @type {?} */ i = 0; i < allEnterNodes.length; i++) {
            var /** @type {?} */ element = allEnterNodes[i];
            if (!subTimelines.has(element)) {
                enterNodesWithoutAnimations.push(element);
            }
        }
        var /** @type {?} */ allPreviousPlayersMap = new Map();
        var /** @type {?} */ sortedParentElements = [];
        queuedInstructions.forEach(function (entry) {
            var /** @type {?} */ element = entry.element;
            if (subTimelines.has(element)) {
                sortedParentElements.unshift(element);
                _this._beforeAnimationBuild(entry.player.namespaceId, entry.instruction, allPreviousPlayersMap);
            }
        });
        skippedPlayers.forEach(function (player) {
            var /** @type {?} */ element = player.element;
            var /** @type {?} */ previousPlayers = _this._getPreviousPlayers(element, false, player.namespaceId, player.triggerName, null);
            previousPlayers.forEach(function (prevPlayer) {
                getOrSetAsInMap(allPreviousPlayersMap, element, []).push(prevPlayer);
                prevPlayer.destroy();
            });
        });
        // this is a special case for nodes that will be removed (either by)
        // having their own leave animations or by being queried in a container
        // that will be removed once a parent animation is complete. The idea
        // here is that * styles must be identical to ! styles because of
        // backwards compatibility (* is also filled in by default in many places).
        // Otherwise * styles will return an empty value or auto since the element
        // that is being getComputedStyle'd will not be visible (since * = destination)
        var /** @type {?} */ replaceNodes = allLeaveNodes.filter(function (node) {
            return replacePostStylesAsPre(node, allPreStyleElements, allPostStyleElements);
        });
        // POST STAGE: fill the * styles
        var _a = cloakAndComputeStyles(this.driver, leaveNodesWithoutAnimations, allPostStyleElements, __WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* AUTO_STYLE */]), postStylesMap = _a[0], allLeaveQueriedNodes = _a[1];
        allLeaveQueriedNodes.forEach(function (node) {
            if (replacePostStylesAsPre(node, allPreStyleElements, allPostStyleElements)) {
                replaceNodes.push(node);
            }
        });
        // PRE STAGE: fill the ! styles
        var preStylesMap = (allPreStyleElements.size ?
            cloakAndComputeStyles(this.driver, enterNodesWithoutAnimations, allPreStyleElements, __WEBPACK_IMPORTED_MODULE_1__angular_animations__["l" /* ɵPRE_STYLE */]) :
            [new Map()])[0];
        replaceNodes.forEach(function (node) {
            var /** @type {?} */ post = postStylesMap.get(node);
            var /** @type {?} */ pre = preStylesMap.get(node);
            postStylesMap.set(node, /** @type {?} */ (Object.assign({}, post, pre)));
        });
        var /** @type {?} */ rootPlayers = [];
        var /** @type {?} */ subPlayers = [];
        queuedInstructions.forEach(function (entry) {
            var element = entry.element, player = entry.player, instruction = entry.instruction;
            // this means that it was never consumed by a parent animation which
            // means that it is independent and therefore should be set for animation
            if (subTimelines.has(element)) {
                if (disabledElementsSet.has(element)) {
                    skippedPlayers.push(player);
                    return;
                }
                var /** @type {?} */ innerPlayer = _this._buildAnimation(player.namespaceId, instruction, allPreviousPlayersMap, skippedPlayersMap, preStylesMap, postStylesMap);
                player.setRealPlayer(innerPlayer);
                var /** @type {?} */ parentHasPriority = null;
                for (var /** @type {?} */ i = 0; i < sortedParentElements.length; i++) {
                    var /** @type {?} */ parent = sortedParentElements[i];
                    if (parent === element)
                        break;
                    if (_this.driver.containsElement(parent, element)) {
                        parentHasPriority = parent;
                        break;
                    }
                }
                if (parentHasPriority) {
                    var /** @type {?} */ parentPlayers = _this.playersByElement.get(parentHasPriority);
                    if (parentPlayers && parentPlayers.length) {
                        player.parentPlayer = optimizeGroupPlayer(parentPlayers);
                    }
                    skippedPlayers.push(player);
                }
                else {
                    rootPlayers.push(player);
                }
            }
            else {
                eraseStyles(element, instruction.fromStyles);
                player.onDestroy(function () { return setStyles(element, instruction.toStyles); });
                // there still might be a ancestor player animating this
                // element therefore we will still add it as a sub player
                // even if its animation may be disabled
                subPlayers.push(player);
                if (disabledElementsSet.has(element)) {
                    skippedPlayers.push(player);
                }
            }
        });
        // find all of the sub players' corresponding inner animation player
        subPlayers.forEach(function (player) {
            // even if any players are not found for a sub animation then it
            // will still complete itself after the next tick since it's Noop
            var /** @type {?} */ playersForElement = skippedPlayersMap.get(player.element);
            if (playersForElement && playersForElement.length) {
                var /** @type {?} */ innerPlayer = optimizeGroupPlayer(playersForElement);
                player.setRealPlayer(innerPlayer);
            }
        });
        // the reason why we don't actually play the animation is
        // because all that a skipped player is designed to do is to
        // fire the start/done transition callback events
        skippedPlayers.forEach(function (player) {
            if (player.parentPlayer) {
                player.parentPlayer.onDestroy(function () { return player.destroy(); });
            }
            else {
                player.destroy();
            }
        });
        // run through all of the queued removals and see if they
        // were picked up by a query. If not then perform the removal
        // operation right away unless a parent animation is ongoing.
        for (var /** @type {?} */ i = 0; i < allLeaveNodes.length; i++) {
            var /** @type {?} */ element = allLeaveNodes[i];
            var /** @type {?} */ details = (element[REMOVAL_FLAG]);
            removeClass(element, LEAVE_CLASSNAME);
            // this means the element has a removal animation that is being
            // taken care of and therefore the inner elements will hang around
            // until that animation is over (or the parent queried animation)
            if (details && details.hasAnimation)
                continue;
            var /** @type {?} */ players = [];
            // if this element is queried or if it contains queried children
            // then we want for the element not to be removed from the page
            // until the queried animations have finished
            if (queriedElements.size) {
                var /** @type {?} */ queriedPlayerResults = queriedElements.get(element);
                if (queriedPlayerResults && queriedPlayerResults.length) {
                    players.push.apply(players, queriedPlayerResults);
                }
                var /** @type {?} */ queriedInnerElements = this.driver.query(element, NG_ANIMATING_SELECTOR, true);
                for (var /** @type {?} */ j = 0; j < queriedInnerElements.length; j++) {
                    var /** @type {?} */ queriedPlayers = queriedElements.get(queriedInnerElements[j]);
                    if (queriedPlayers && queriedPlayers.length) {
                        players.push.apply(players, queriedPlayers);
                    }
                }
            }
            var /** @type {?} */ activePlayers = players.filter(function (p) { return !p.destroyed; });
            if (activePlayers.length) {
                removeNodesAfterAnimationDone(this, element, activePlayers);
            }
            else {
                this.processLeaveNode(element);
            }
        }
        // this is required so the cleanup method doesn't remove them
        allLeaveNodes.length = 0;
        rootPlayers.forEach(function (player) {
            _this.players.push(player);
            player.onDone(function () {
                player.destroy();
                var /** @type {?} */ index = _this.players.indexOf(player);
                _this.players.splice(index, 1);
            });
            player.play();
        });
        return rootPlayers;
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @return {?}
     */
    TransitionAnimationEngine.prototype.elementContainsData = function (namespaceId, element) {
        var /** @type {?} */ containsData = false;
        var /** @type {?} */ details = (element[REMOVAL_FLAG]);
        if (details && details.setForRemoval)
            containsData = true;
        if (this.playersByElement.has(element))
            containsData = true;
        if (this.playersByQueriedElement.has(element))
            containsData = true;
        if (this.statesByElement.has(element))
            containsData = true;
        return this._fetchNamespace(namespaceId).elementContainsData(element) || containsData;
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    TransitionAnimationEngine.prototype.afterFlush = function (callback) { this._flushFns.push(callback); };
    /**
     * @param {?} callback
     * @return {?}
     */
    TransitionAnimationEngine.prototype.afterFlushAnimationsDone = function (callback) { this._whenQuietFns.push(callback); };
    /**
     * @param {?} element
     * @param {?} isQueriedElement
     * @param {?=} namespaceId
     * @param {?=} triggerName
     * @param {?=} toStateValue
     * @return {?}
     */
    TransitionAnimationEngine.prototype._getPreviousPlayers = function (element, isQueriedElement, namespaceId, triggerName, toStateValue) {
        var /** @type {?} */ players = [];
        if (isQueriedElement) {
            var /** @type {?} */ queriedElementPlayers = this.playersByQueriedElement.get(element);
            if (queriedElementPlayers) {
                players = queriedElementPlayers;
            }
        }
        else {
            var /** @type {?} */ elementPlayers = this.playersByElement.get(element);
            if (elementPlayers) {
                var /** @type {?} */ isRemovalAnimation_1 = !toStateValue || toStateValue == VOID_VALUE;
                elementPlayers.forEach(function (player) {
                    if (player.queued)
                        return;
                    if (!isRemovalAnimation_1 && player.triggerName != triggerName)
                        return;
                    players.push(player);
                });
            }
        }
        if (namespaceId || triggerName) {
            players = players.filter(function (player) {
                if (namespaceId && namespaceId != player.namespaceId)
                    return false;
                if (triggerName && triggerName != player.triggerName)
                    return false;
                return true;
            });
        }
        return players;
    };
    /**
     * @param {?} namespaceId
     * @param {?} instruction
     * @param {?} allPreviousPlayersMap
     * @return {?}
     */
    TransitionAnimationEngine.prototype._beforeAnimationBuild = function (namespaceId, instruction, allPreviousPlayersMap) {
        var _this = this;
        var /** @type {?} */ triggerName = instruction.triggerName;
        var /** @type {?} */ rootElement = instruction.element;
        // when a removal animation occurs, ALL previous players are collected
        // and destroyed (even if they are outside of the current namespace)
        var /** @type {?} */ targetNameSpaceId = instruction.isRemovalTransition ? undefined : namespaceId;
        var /** @type {?} */ targetTriggerName = instruction.isRemovalTransition ? undefined : triggerName;
        instruction.timelines.map(function (timelineInstruction) {
            var /** @type {?} */ element = timelineInstruction.element;
            var /** @type {?} */ isQueriedElement = element !== rootElement;
            var /** @type {?} */ players = getOrSetAsInMap(allPreviousPlayersMap, element, []);
            var /** @type {?} */ previousPlayers = _this._getPreviousPlayers(element, isQueriedElement, targetNameSpaceId, targetTriggerName, instruction.toState);
            previousPlayers.forEach(function (player) {
                var /** @type {?} */ realPlayer = (player.getRealPlayer());
                if (realPlayer.beforeDestroy) {
                    realPlayer.beforeDestroy();
                }
                player.destroy();
                players.push(player);
            });
        });
        // this needs to be done so that the PRE/POST styles can be
        // computed properly without interfering with the previous animation
        eraseStyles(rootElement, instruction.fromStyles);
    };
    /**
     * @param {?} namespaceId
     * @param {?} instruction
     * @param {?} allPreviousPlayersMap
     * @param {?} skippedPlayersMap
     * @param {?} preStylesMap
     * @param {?} postStylesMap
     * @return {?}
     */
    TransitionAnimationEngine.prototype._buildAnimation = function (namespaceId, instruction, allPreviousPlayersMap, skippedPlayersMap, preStylesMap, postStylesMap) {
        var _this = this;
        var /** @type {?} */ triggerName = instruction.triggerName;
        var /** @type {?} */ rootElement = instruction.element;
        // we first run this so that the previous animation player
        // data can be passed into the successive animation players
        var /** @type {?} */ allQueriedPlayers = [];
        var /** @type {?} */ allConsumedElements = new Set();
        var /** @type {?} */ allSubElements = new Set();
        var /** @type {?} */ allNewPlayers = instruction.timelines.map(function (timelineInstruction) {
            var /** @type {?} */ element = timelineInstruction.element;
            allConsumedElements.add(element);
            // FIXME (matsko): make sure to-be-removed animations are removed properly
            var /** @type {?} */ details = element[REMOVAL_FLAG];
            if (details && details.removedBeforeQueried)
                return new __WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* NoopAnimationPlayer */]();
            var /** @type {?} */ isQueriedElement = element !== rootElement;
            var /** @type {?} */ previousPlayers = flattenGroupPlayers((allPreviousPlayersMap.get(element) || EMPTY_PLAYER_ARRAY)
                .map(function (p) { return p.getRealPlayer(); }))
                .filter(function (p) {
                // the `element` is not apart of the AnimationPlayer definition, but
                // Mock/WebAnimations
                // use the element within their implementation. This will be added in Angular5 to
                // AnimationPlayer
                var /** @type {?} */ pp = (p);
                return pp.element ? pp.element === element : false;
            });
            var /** @type {?} */ preStyles = preStylesMap.get(element);
            var /** @type {?} */ postStyles = postStylesMap.get(element);
            var /** @type {?} */ keyframes = normalizeKeyframes(_this.driver, _this._normalizer, element, timelineInstruction.keyframes, preStyles, postStyles);
            var /** @type {?} */ player = _this._buildPlayer(timelineInstruction, keyframes, previousPlayers);
            // this means that this particular player belongs to a sub trigger. It is
            // important that we match this player up with the corresponding (@trigger.listener)
            if (timelineInstruction.subTimeline && skippedPlayersMap) {
                allSubElements.add(element);
            }
            if (isQueriedElement) {
                var /** @type {?} */ wrappedPlayer = new TransitionAnimationPlayer(namespaceId, triggerName, element);
                wrappedPlayer.setRealPlayer(player);
                allQueriedPlayers.push(wrappedPlayer);
            }
            return player;
        });
        allQueriedPlayers.forEach(function (player) {
            getOrSetAsInMap(_this.playersByQueriedElement, player.element, []).push(player);
            player.onDone(function () { return deleteOrUnsetInMap(_this.playersByQueriedElement, player.element, player); });
        });
        allConsumedElements.forEach(function (element) { return addClass(element, NG_ANIMATING_CLASSNAME); });
        var /** @type {?} */ player = optimizeGroupPlayer(allNewPlayers);
        player.onDestroy(function () {
            allConsumedElements.forEach(function (element) { return removeClass(element, NG_ANIMATING_CLASSNAME); });
            setStyles(rootElement, instruction.toStyles);
        });
        // this basically makes all of the callbacks for sub element animations
        // be dependent on the upper players for when they finish
        allSubElements.forEach(function (element) { getOrSetAsInMap(skippedPlayersMap, element, []).push(player); });
        return player;
    };
    /**
     * @param {?} instruction
     * @param {?} keyframes
     * @param {?} previousPlayers
     * @return {?}
     */
    TransitionAnimationEngine.prototype._buildPlayer = function (instruction, keyframes, previousPlayers) {
        if (keyframes.length > 0) {
            return this.driver.animate(instruction.element, keyframes, instruction.duration, instruction.delay, instruction.easing, previousPlayers);
        }
        // special case for when an empty transition|definition is provided
        // ... there is no point in rendering an empty animation
        return new __WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* NoopAnimationPlayer */]();
    };
    return TransitionAnimationEngine;
}());
var TransitionAnimationPlayer = (function () {
    /**
     * @param {?} namespaceId
     * @param {?} triggerName
     * @param {?} element
     */
    function TransitionAnimationPlayer(namespaceId, triggerName, element) {
        this.namespaceId = namespaceId;
        this.triggerName = triggerName;
        this.element = element;
        this._player = new __WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* NoopAnimationPlayer */]();
        this._containsRealPlayer = false;
        this._queuedCallbacks = {};
        this._destroyed = false;
        this.markedForDestroy = false;
    }
    Object.defineProperty(TransitionAnimationPlayer.prototype, "queued", {
        /**
         * @return {?}
         */
        get: function () { return this._containsRealPlayer == false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransitionAnimationPlayer.prototype, "destroyed", {
        /**
         * @return {?}
         */
        get: function () { return this._destroyed; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} player
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.setRealPlayer = function (player) {
        var _this = this;
        if (this._containsRealPlayer)
            return;
        this._player = player;
        Object.keys(this._queuedCallbacks).forEach(function (phase) {
            _this._queuedCallbacks[phase].forEach(function (callback) { return listenOnPlayer(player, phase, undefined, callback); });
        });
        this._queuedCallbacks = {};
        this._containsRealPlayer = true;
    };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.getRealPlayer = function () { return this._player; };
    /**
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    TransitionAnimationPlayer.prototype._queueEvent = function (name, callback) {
        getOrSetAsInMap(this._queuedCallbacks, name, []).push(callback);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.onDone = function (fn) {
        if (this.queued) {
            this._queueEvent('done', fn);
        }
        this._player.onDone(fn);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.onStart = function (fn) {
        if (this.queued) {
            this._queueEvent('start', fn);
        }
        this._player.onStart(fn);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.onDestroy = function (fn) {
        if (this.queued) {
            this._queueEvent('destroy', fn);
        }
        this._player.onDestroy(fn);
    };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.init = function () { this._player.init(); };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.hasStarted = function () { return this.queued ? false : this._player.hasStarted(); };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.play = function () { !this.queued && this._player.play(); };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.pause = function () { !this.queued && this._player.pause(); };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.restart = function () { !this.queued && this._player.restart(); };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.finish = function () { this._player.finish(); };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.destroy = function () {
        this._destroyed = true;
        this._player.destroy();
    };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.reset = function () { !this.queued && this._player.reset(); };
    /**
     * @param {?} p
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.setPosition = function (p) {
        if (!this.queued) {
            this._player.setPosition(p);
        }
    };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.getPosition = function () { return this.queued ? 0 : this._player.getPosition(); };
    Object.defineProperty(TransitionAnimationPlayer.prototype, "totalTime", {
        /**
         * @return {?}
         */
        get: function () { return this._player.totalTime; },
        enumerable: true,
        configurable: true
    });
    return TransitionAnimationPlayer;
}());
/**
 * @param {?} map
 * @param {?} key
 * @param {?} value
 * @return {?}
 */
function deleteOrUnsetInMap(map, key, value) {
    var /** @type {?} */ currentValues;
    if (map instanceof Map) {
        currentValues = map.get(key);
        if (currentValues) {
            if (currentValues.length) {
                var /** @type {?} */ index = currentValues.indexOf(value);
                currentValues.splice(index, 1);
            }
            if (currentValues.length == 0) {
                map.delete(key);
            }
        }
    }
    else {
        currentValues = map[key];
        if (currentValues) {
            if (currentValues.length) {
                var /** @type {?} */ index = currentValues.indexOf(value);
                currentValues.splice(index, 1);
            }
            if (currentValues.length == 0) {
                delete map[key];
            }
        }
    }
    return currentValues;
}
/**
 * @param {?} value
 * @return {?}
 */
function normalizeTriggerValue(value) {
    switch (typeof value) {
        case 'boolean':
            return value ? '1' : '0';
        default:
            return value != null ? value.toString() : null;
    }
}
/**
 * @param {?} node
 * @return {?}
 */
function isElementNode(node) {
    return node && node['nodeType'] === 1;
}
/**
 * @param {?} eventName
 * @return {?}
 */
function isTriggerEventValid(eventName) {
    return eventName == 'start' || eventName == 'done';
}
/**
 * @param {?} element
 * @param {?=} value
 * @return {?}
 */
function cloakElement(element, value) {
    var /** @type {?} */ oldValue = element.style.display;
    element.style.display = value != null ? value : 'none';
    return oldValue;
}
/**
 * @param {?} driver
 * @param {?} elements
 * @param {?} elementPropsMap
 * @param {?} defaultStyle
 * @return {?}
 */
function cloakAndComputeStyles(driver, elements, elementPropsMap, defaultStyle) {
    var /** @type {?} */ cloakVals = elements.map(function (element) { return cloakElement(element); });
    var /** @type {?} */ valuesMap = new Map();
    var /** @type {?} */ failedElements = [];
    elementPropsMap.forEach(function (props, element) {
        var /** @type {?} */ styles = {};
        props.forEach(function (prop) {
            var /** @type {?} */ value = styles[prop] = driver.computeStyle(element, prop, defaultStyle);
            // there is no easy way to detect this because a sub element could be removed
            // by a parent animation element being detached.
            if (!value || value.length == 0) {
                element[REMOVAL_FLAG] = NULL_REMOVED_QUERIED_STATE;
                failedElements.push(element);
            }
        });
        valuesMap.set(element, styles);
    });
    elements.forEach(function (element, i) { return cloakElement(element, cloakVals[i]); });
    return [valuesMap, failedElements];
}
/**
 * @param {?} nodes
 * @return {?}
 */
function createIsRootFilterFn(nodes) {
    var /** @type {?} */ nodeSet = new Set(nodes);
    var /** @type {?} */ knownRootContainer = new Set();
    var /** @type {?} */ isRoot;
    isRoot = function (node) {
        if (!node)
            return true;
        if (nodeSet.has(node.parentNode))
            return false;
        if (knownRootContainer.has(node.parentNode))
            return true;
        if (isRoot(node.parentNode)) {
            knownRootContainer.add(node);
            return true;
        }
        return false;
    };
    return isRoot;
}
var CLASSES_CACHE_KEY = '$$classes';
/**
 * @param {?} element
 * @param {?} className
 * @return {?}
 */
function containsClass(element, className) {
    if (element.classList) {
        return element.classList.contains(className);
    }
    else {
        var /** @type {?} */ classes = element[CLASSES_CACHE_KEY];
        return classes && classes[className];
    }
}
/**
 * @param {?} element
 * @param {?} className
 * @return {?}
 */
function addClass(element, className) {
    if (element.classList) {
        element.classList.add(className);
    }
    else {
        var /** @type {?} */ classes = element[CLASSES_CACHE_KEY];
        if (!classes) {
            classes = element[CLASSES_CACHE_KEY] = {};
        }
        classes[className] = true;
    }
}
/**
 * @param {?} element
 * @param {?} className
 * @return {?}
 */
function removeClass(element, className) {
    if (element.classList) {
        element.classList.remove(className);
    }
    else {
        var /** @type {?} */ classes = element[CLASSES_CACHE_KEY];
        if (classes) {
            delete classes[className];
        }
    }
}
/**
 * @return {?}
 */
function getBodyNode() {
    if (typeof document != 'undefined') {
        return document.body;
    }
    return null;
}
/**
 * @param {?} engine
 * @param {?} element
 * @param {?} players
 * @return {?}
 */
function removeNodesAfterAnimationDone(engine, element, players) {
    optimizeGroupPlayer(players).onDone(function () { return engine.processLeaveNode(element); });
}
/**
 * @param {?} players
 * @return {?}
 */
function flattenGroupPlayers(players) {
    var /** @type {?} */ finalPlayers = [];
    _flattenGroupPlayersRecur(players, finalPlayers);
    return finalPlayers;
}
/**
 * @param {?} players
 * @param {?} finalPlayers
 * @return {?}
 */
function _flattenGroupPlayersRecur(players, finalPlayers) {
    for (var /** @type {?} */ i = 0; i < players.length; i++) {
        var /** @type {?} */ player = players[i];
        if (player instanceof __WEBPACK_IMPORTED_MODULE_1__angular_animations__["k" /* ɵAnimationGroupPlayer */]) {
            _flattenGroupPlayersRecur(player.players, finalPlayers);
        }
        else {
            finalPlayers.push(/** @type {?} */ (player));
        }
    }
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function objEquals(a, b) {
    var /** @type {?} */ k1 = Object.keys(a);
    var /** @type {?} */ k2 = Object.keys(b);
    if (k1.length != k2.length)
        return false;
    for (var /** @type {?} */ i = 0; i < k1.length; i++) {
        var /** @type {?} */ prop = k1[i];
        if (!b.hasOwnProperty(prop) || a[prop] !== b[prop])
            return false;
    }
    return true;
}
/**
 * @param {?} element
 * @param {?} allPreStyleElements
 * @param {?} allPostStyleElements
 * @return {?}
 */
function replacePostStylesAsPre(element, allPreStyleElements, allPostStyleElements) {
    var /** @type {?} */ postEntry = allPostStyleElements.get(element);
    if (!postEntry)
        return false;
    var /** @type {?} */ preEntry = allPreStyleElements.get(element);
    if (preEntry) {
        postEntry.forEach(function (data) { return ((preEntry)).add(data); });
    }
    else {
        allPreStyleElements.set(element, postEntry);
    }
    allPostStyleElements.delete(element);
    return true;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var AnimationEngine = (function () {
    /**
     * @param {?} driver
     * @param {?} normalizer
     */
    function AnimationEngine(driver, normalizer) {
        var _this = this;
        this._triggerCache = {};
        this.onRemovalComplete = function (element, context) { };
        this._transitionEngine = new TransitionAnimationEngine(driver, normalizer);
        this._timelineEngine = new TimelineAnimationEngine(driver, normalizer);
        this._transitionEngine.onRemovalComplete = function (element, context) { return _this.onRemovalComplete(element, context); };
    }
    /**
     * @param {?} componentId
     * @param {?} namespaceId
     * @param {?} hostElement
     * @param {?} name
     * @param {?} metadata
     * @return {?}
     */
    AnimationEngine.prototype.registerTrigger = function (componentId, namespaceId, hostElement, name, metadata) {
        var /** @type {?} */ cacheKey = componentId + '-' + name;
        var /** @type {?} */ trigger = this._triggerCache[cacheKey];
        if (!trigger) {
            var /** @type {?} */ errors = [];
            var /** @type {?} */ ast = (buildAnimationAst(/** @type {?} */ (metadata), errors));
            if (errors.length) {
                throw new Error("The animation trigger \"" + name + "\" has failed to build due to the following errors:\n - " + errors.join("\n - "));
            }
            trigger = buildTrigger(name, ast);
            this._triggerCache[cacheKey] = trigger;
        }
        this._transitionEngine.registerTrigger(namespaceId, name, trigger);
    };
    /**
     * @param {?} namespaceId
     * @param {?} hostElement
     * @return {?}
     */
    AnimationEngine.prototype.register = function (namespaceId, hostElement) {
        this._transitionEngine.register(namespaceId, hostElement);
    };
    /**
     * @param {?} namespaceId
     * @param {?} context
     * @return {?}
     */
    AnimationEngine.prototype.destroy = function (namespaceId, context) {
        this._transitionEngine.destroy(namespaceId, context);
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} parent
     * @param {?} insertBefore
     * @return {?}
     */
    AnimationEngine.prototype.onInsert = function (namespaceId, element, parent, insertBefore) {
        this._transitionEngine.insertNode(namespaceId, element, parent, insertBefore);
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} context
     * @return {?}
     */
    AnimationEngine.prototype.onRemove = function (namespaceId, element, context) {
        this._transitionEngine.removeNode(namespaceId, element, context);
    };
    /**
     * @param {?} element
     * @param {?} disable
     * @return {?}
     */
    AnimationEngine.prototype.disableAnimations = function (element, disable) {
        this._transitionEngine.markElementAsDisabled(element, disable);
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    AnimationEngine.prototype.process = function (namespaceId, element, property, value) {
        if (property.charAt(0) == '@') {
            var _a = parseTimelineCommand(property), id = _a[0], action = _a[1];
            var /** @type {?} */ args = (value);
            this._timelineEngine.command(id, element, action, args);
        }
        else {
            this._transitionEngine.trigger(namespaceId, element, property, value);
        }
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} eventName
     * @param {?} eventPhase
     * @param {?} callback
     * @return {?}
     */
    AnimationEngine.prototype.listen = function (namespaceId, element, eventName, eventPhase, callback) {
        // @@listen
        if (eventName.charAt(0) == '@') {
            var _a = parseTimelineCommand(eventName), id = _a[0], action = _a[1];
            return this._timelineEngine.listen(id, element, action, callback);
        }
        return this._transitionEngine.listen(namespaceId, element, eventName, eventPhase, callback);
    };
    /**
     * @param {?=} microtaskId
     * @return {?}
     */
    AnimationEngine.prototype.flush = function (microtaskId) {
        if (microtaskId === void 0) { microtaskId = -1; }
        this._transitionEngine.flush(microtaskId);
    };
    Object.defineProperty(AnimationEngine.prototype, "players", {
        /**
         * @return {?}
         */
        get: function () {
            return ((this._transitionEngine.players))
                .concat(/** @type {?} */ (this._timelineEngine.players));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AnimationEngine.prototype.whenRenderingDone = function () { return this._transitionEngine.whenRenderingDone(); };
    return AnimationEngine;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var WebAnimationsPlayer = (function () {
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} options
     * @param {?=} previousPlayers
     */
    function WebAnimationsPlayer(element, keyframes, options, previousPlayers) {
        if (previousPlayers === void 0) { previousPlayers = []; }
        var _this = this;
        this.element = element;
        this.keyframes = keyframes;
        this.options = options;
        this.previousPlayers = previousPlayers;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._onDestroyFns = [];
        this._initialized = false;
        this._finished = false;
        this._started = false;
        this._destroyed = false;
        this.time = 0;
        this.parentPlayer = null;
        this.previousStyles = {};
        this.currentSnapshot = {};
        this._duration = options['duration'];
        this._delay = options['delay'] || 0;
        this.time = this._duration + this._delay;
        if (allowPreviousPlayerStylesMerge(this._duration, this._delay)) {
            previousPlayers.forEach(function (player) {
                var styles = player.currentSnapshot;
                Object.keys(styles).forEach(function (prop) { return _this.previousStyles[prop] = styles[prop]; });
            });
        }
    }
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype._onFinish = function () {
        if (!this._finished) {
            this._finished = true;
            this._onDoneFns.forEach(function (fn) { return fn(); });
            this._onDoneFns = [];
        }
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.init = function () {
        this._buildPlayer();
        this._preparePlayerBeforeStart();
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype._buildPlayer = function () {
        var _this = this;
        if (this._initialized)
            return;
        this._initialized = true;
        var /** @type {?} */ keyframes = this.keyframes.map(function (styles) { return copyStyles(styles, false); });
        var /** @type {?} */ previousStyleProps = Object.keys(this.previousStyles);
        if (previousStyleProps.length) {
            var /** @type {?} */ startingKeyframe_1 = keyframes[0];
            var /** @type {?} */ missingStyleProps_1 = [];
            previousStyleProps.forEach(function (prop) {
                if (!startingKeyframe_1.hasOwnProperty(prop)) {
                    missingStyleProps_1.push(prop);
                }
                startingKeyframe_1[prop] = _this.previousStyles[prop];
            });
            if (missingStyleProps_1.length) {
                var /** @type {?} */ self_1 = this;
                var _loop_1 = function () {
                    var /** @type {?} */ kf = keyframes[i];
                    missingStyleProps_1.forEach(function (prop) {
                        kf[prop] = _computeStyle(self_1.element, prop);
                    });
                };
                // tslint:disable-next-line
                for (var /** @type {?} */ i = 1; i < keyframes.length; i++) {
                    _loop_1();
                }
            }
        }
        this._player = this._triggerWebAnimation(this.element, keyframes, this.options);
        this._finalKeyframe = keyframes.length ? keyframes[keyframes.length - 1] : {};
        this._player.addEventListener('finish', function () { return _this._onFinish(); });
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype._preparePlayerBeforeStart = function () {
        // this is required so that the player doesn't start to animate right away
        if (this._delay) {
            this._resetDomPlayerState();
        }
        else {
            this._player.pause();
        }
    };
    /**
     * \@internal
     * @param {?} element
     * @param {?} keyframes
     * @param {?} options
     * @return {?}
     */
    WebAnimationsPlayer.prototype._triggerWebAnimation = function (element, keyframes, options) {
        // jscompiler doesn't seem to know animate is a native property because it's not fully
        // supported yet across common browsers (we polyfill it for Edge/Safari) [CL #143630929]
        return (element['animate'](keyframes, options));
    };
    Object.defineProperty(WebAnimationsPlayer.prototype, "domPlayer", {
        /**
         * @return {?}
         */
        get: function () { return this._player; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} fn
     * @return {?}
     */
    WebAnimationsPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    WebAnimationsPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    WebAnimationsPlayer.prototype.onDestroy = function (fn) { this._onDestroyFns.push(fn); };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.play = function () {
        this._buildPlayer();
        if (!this.hasStarted()) {
            this._onStartFns.forEach(function (fn) { return fn(); });
            this._onStartFns = [];
            this._started = true;
        }
        this._player.play();
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.pause = function () {
        this.init();
        this._player.pause();
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.finish = function () {
        this.init();
        this._onFinish();
        this._player.finish();
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.reset = function () {
        this._resetDomPlayerState();
        this._destroyed = false;
        this._finished = false;
        this._started = false;
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype._resetDomPlayerState = function () {
        if (this._player) {
            this._player.cancel();
        }
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.restart = function () {
        this.reset();
        this.play();
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.hasStarted = function () { return this._started; };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.destroy = function () {
        if (!this._destroyed) {
            this._destroyed = true;
            this._resetDomPlayerState();
            this._onFinish();
            this._onDestroyFns.forEach(function (fn) { return fn(); });
            this._onDestroyFns = [];
        }
    };
    /**
     * @param {?} p
     * @return {?}
     */
    WebAnimationsPlayer.prototype.setPosition = function (p) { this._player.currentTime = p * this.time; };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.getPosition = function () { return this._player.currentTime / this.time; };
    Object.defineProperty(WebAnimationsPlayer.prototype, "totalTime", {
        /**
         * @return {?}
         */
        get: function () { return this._delay + this._duration; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.beforeDestroy = function () {
        var _this = this;
        var /** @type {?} */ styles = {};
        if (this.hasStarted()) {
            Object.keys(this._finalKeyframe).forEach(function (prop) {
                if (prop != 'offset') {
                    styles[prop] =
                        _this._finished ? _this._finalKeyframe[prop] : _computeStyle(_this.element, prop);
                }
            });
        }
        this.currentSnapshot = styles;
    };
    return WebAnimationsPlayer;
}());
/**
 * @param {?} element
 * @param {?} prop
 * @return {?}
 */
function _computeStyle(element, prop) {
    return ((window.getComputedStyle(element)))[prop];
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var WebAnimationsDriver = (function () {
    function WebAnimationsDriver() {
    }
    /**
     * @param {?} element
     * @param {?} selector
     * @return {?}
     */
    WebAnimationsDriver.prototype.matchesElement = function (element, selector) {
        return matchesElement(element, selector);
    };
    /**
     * @param {?} elm1
     * @param {?} elm2
     * @return {?}
     */
    WebAnimationsDriver.prototype.containsElement = function (elm1, elm2) { return containsElement(elm1, elm2); };
    /**
     * @param {?} element
     * @param {?} selector
     * @param {?} multi
     * @return {?}
     */
    WebAnimationsDriver.prototype.query = function (element, selector, multi) {
        return invokeQuery(element, selector, multi);
    };
    /**
     * @param {?} element
     * @param {?} prop
     * @param {?=} defaultValue
     * @return {?}
     */
    WebAnimationsDriver.prototype.computeStyle = function (element, prop, defaultValue) {
        return (((window.getComputedStyle(element)))[prop]);
    };
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    WebAnimationsDriver.prototype.animate = function (element, keyframes, duration, delay, easing, previousPlayers) {
        if (previousPlayers === void 0) { previousPlayers = []; }
        var /** @type {?} */ fill = delay == 0 ? 'both' : 'forwards';
        var /** @type {?} */ playerOptions = { duration: duration, delay: delay, fill: fill };
        // we check for this to avoid having a null|undefined value be present
        // for the easing (which results in an error for certain browsers #9752)
        if (easing) {
            playerOptions['easing'] = easing;
        }
        var /** @type {?} */ previousWebAnimationPlayers = (previousPlayers.filter(function (player) { return player instanceof WebAnimationsPlayer; }));
        return new WebAnimationsPlayer(element, keyframes, playerOptions, previousWebAnimationPlayers);
    };
    return WebAnimationsDriver;
}());
/**
 * @return {?}
 */
function supportsWebAnimations() {
    return typeof Element !== 'undefined' && typeof ((Element)).prototype['animate'] === 'function';
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all animation APIs of the animation browser package.
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the animation package.
 */
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=browser.es5.js.map


/***/ }),

/***/ 656:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(8);
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'Angular X Showdown Demo!';
        this.text = "## Hello Showdown!\n```js\nlet a = 1;\nlet b = 2;\nlet sum = a+b;\nconsole.log(`sum: ${sum}`);\n```";
        this.options = {
            customizedHeaderId: false,
            backslashEscapesHTMLTags: false,
            disableForced4SpacesIndentedSublists: false,
            encodeEmails: true,
            excludeTrailingPunctuationFromURLs: false,
            ghCodeBlocks: true,
            ghCompatibleHeaderId: false,
            ghMentions: false,
            ghMentionsLink: 'https://github.com/{u}',
            headerLevelStart: 1,
            literalMidWordAsterisks: false,
            literalMidWordUnderscores: false,
            noHeaderId: false,
            omitExtraWLInCodeBlocks: false,
            openLinksInNewWindow: false,
            parseImgDimensions: false,
            prefixHeaderId: false,
            rawHeaderId: false,
            rawPrefixHeaderId: false,
            requireSpaceBeforeHeadingText: false,
            simpleLineBreaks: false,
            simplifiedAutoLink: false,
            smartIndentationFix: false,
            smoothLivePreview: false,
            strikethrough: false,
            tables: false,
            tablesHeaderId: false,
            tasklists: false,
            trimEachLine: 'space'
        };
    }
    AppComponent.prototype.keys = function (obj) {
        return Object.keys(obj);
    };
    AppComponent.prototype.isType = function (value, type) {
        return typeof value === type;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: __webpack_require__(657),
            styles: [__webpack_require__(658)]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ 657:
/***/ (function(module, exports) {

module.exports = "<md-sidenav-container fullscreen>\r\n    <md-sidenav #start>\r\n        <md-nav-list>\r\n            <div *ngFor=\"let key of keys(options)\">\r\n                <md-slide-toggle *ngIf=\"isType(options[key],'boolean')\" class=\"nav-item-center\" md-list-item [(ngModel)]=\"options[key]\">{{key}}\r\n                </md-slide-toggle>\r\n                <input mdInput  type=\"number\" *ngIf=\"isType(options[key],'number')\" class=\"nav-item-center\" md-list-item [(ngModel)]=\"options[key]\"\r\n                       placeholder=\"{{key}}\" />\r\n                <input mdInput type=\"text\" *ngIf=\"isType(options[key],'string')\" class=\"nav-item-center\" md-list-item [(ngModel)]=\"options[key]\"\r\n                       placeholder=\"{{key}}\" />\r\n            </div>\r\n            <hr/>\r\n        </md-nav-list>\r\n        <hr/>\r\n        <button md-button (click)=\"start.close()\">CLOSE</button>\r\n    </md-sidenav>\r\n    <div class=\"page\">\r\n        <md-toolbar color=\"primary\">\r\n            <button md-icon-button (click)=\"start.open()\">\r\n                <md-icon class=\"md-24\">menu</md-icon>\r\n            </button>\r\n            <h1 class=\"app-title\">{{title}}</h1>\r\n        </md-toolbar>\r\n        <div class=\"content\">\r\n            <div class=\"left\">\r\n                <textarea [(ngModel)]=\"text\"></textarea>\r\n            </div>\r\n            <div class=\"right\">\r\n                <showdown [value]=\"text\" [trimEachLine]=\"options.trimEachLine\" [omitExtraWLInCodeBlocks]=\"options.omitExtraWLInCodeBlocks\"\r\n                    [noHeaderId]=\"options.noHeaderId\" [prefixHeaderId]=\"options.prefixHeaderId\" [parseImgDimensions]=\"options.parseImgDimensions\"\r\n                    [headerLevelStart]=\"options.headerLevelStart\" [literalMidWordUnderscores]=\"options.literalMidWordUnderscores\"\r\n                    [strikethrough]=\"options.strikethrough\" [tables]=\"options.tables\" [tablesHeaderId]=\"options.tablesHeaderId\"\r\n                    [ghCodeBlocks]=\"options.ghCodeBlocks\" [tasklists]=\"options.tasklists\" [smoothLivePreview]=\"options.smoothLivePreview\"></showdown>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</md-sidenav-container>\r\n<a href=\"https://github.com/yisraelx/ngx-showdown\"><img style=\"position: absolute; top: 0; right: 0; border: 0;\" src=\"https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67\"\r\n                                                  alt=\"Fork me on GitHub\" data-canonical-src=\"https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png\">\r\n</a>";

/***/ }),

/***/ 658:
/***/ (function(module, exports) {

module.exports = ".app-title {\r\n    width: 100%;\r\n    text-align: center;\r\n}\r\n\r\nmd-sidenav {\r\n    width: 30%;\r\n    text-align: center;\r\n}\r\n\r\n.page {\r\n    height: calc(90%);\r\n}\r\n\r\n.content {\r\n    display: flex;\r\n    height: 100%;\r\n}\r\n\r\nshowdown, textarea {\r\n    height: 100%;\r\n    overflow-y: scroll;\r\n    border: none;\r\n    padding: 10px;\r\n}\r\n\r\n.left, .right {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    flex: 1;\r\n    padding: 1rem;\r\n}"

/***/ }),

/***/ 659:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var base_converter_class_1 = __webpack_require__(96);
exports.BaseConverter = base_converter_class_1.BaseConverter;
var base_converter_options_provider_1 = __webpack_require__(73);
exports.ConverterOptions = base_converter_options_provider_1.ConverterOptions;
exports.BaseConverterOptions = base_converter_options_provider_1.BaseConverterOptions;
var showdown_converter_provider_1 = __webpack_require__(221);
exports.ShowdownConverter = showdown_converter_provider_1.ShowdownConverter;
var showdown_directive_1 = __webpack_require__(141);
exports.ShowdownDirective = showdown_directive_1.ShowdownDirective;
var src_directive_1 = __webpack_require__(222);
exports.SrcDirective = src_directive_1.SrcDirective;
var showdown_pipe_1 = __webpack_require__(223);
exports.ShowdownPipe = showdown_pipe_1.ShowdownPipe;
var showdown_module_1 = __webpack_require__(661);
exports.ShowdownModule = showdown_module_1.ShowdownModule;


/***/ }),

/***/ 660:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;/*! showdown v 1.7.3 - 23-08-2017 */
(function(){
/**
 * Created by Tivie on 13-07-2015.
 */

function getDefaultOpts (simple) {
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
      describe: 'Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic \'section-\' prefix',
      type: 'string'
    },
    rawPrefixHeaderId: {
      defaultValue: false,
      describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
      type: 'boolean'
    },
    ghCompatibleHeaderId: {
      defaultValue: false,
      describe: 'Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)',
      type: 'boolean'
    },
    rawHeaderId: {
      defaultValue: false,
      describe: 'Remove only spaces, \' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids',
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
    literalMidWordAsterisks: {
      defaultValue: false,
      describe: 'Parse midword asterisks as literal asterisks',
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
    },
    ghMentionsLink: {
      defaultValue: 'https://github.com/{u}',
      description: 'Changes the link generated by @mentions. Only applies if ghMentions option is enabled.',
      type: 'string'
    },
    encodeEmails: {
      defaultValue: true,
      description: 'Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities',
      type: 'boolean'
    },
    openLinksInNewWindow: {
      defaultValue: false,
      description: 'Open all links in new windows',
      type: 'boolean'
    },
    backslashEscapesHTMLTags: {
      defaultValue: false,
      description: 'Support for HTML Tag escaping. ex: \<div>foo\</div>',
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

function allOptionsOn () {
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
        ghMentions:                           true,
        backslashEscapesHTMLTags:             true
      },
      original: {
        noHeaderId:                           true,
        ghCodeBlocks:                         false
      },
      ghost: {
        omitExtraWLInCodeBlocks:              true,
        parseImgDimensions:                   true,
        simplifiedAutoLink:                   true,
        excludeTrailingPunctuationFromURLs:   true,
        literalMidWordUnderscores:            true,
        strikethrough:                        true,
        tables:                               true,
        tablesHeaderId:                       true,
        ghCodeBlocks:                         true,
        tasklists:                            true,
        smoothLivePreview:                    true,
        simpleLineBreaks:                     true,
        requireSpaceBeforeHeadingText:        true,
        ghMentions:                           false,
        encodeEmails:                         true
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
  showdown.resetOptions();
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
function validate (extension, name) {
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
      if (!(ext.regex instanceof RegExp)) {
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
showdown.helper.isString = function (a) {
  'use strict';
  return (typeof a === 'string' || a instanceof String);
};

/**
 * Check if var is a function
 * @static
 * @param {*} a
 * @returns {boolean}
 */
showdown.helper.isFunction = function (a) {
  'use strict';
  var getType = {};
  return a && getType.toString.call(a) === '[object Function]';
};

/**
 * isArray helper function
 * @static
 * @param {*} a
 * @returns {boolean}
 */
showdown.helper.isArray = function (a) {
  'use strict';
  return a.constructor === Array;
};

/**
 * Check if value is undefined
 * @static
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 */
showdown.helper.isUndefined = function (value) {
  'use strict';
  return typeof value === 'undefined';
};

/**
 * ForEach helper function
 * Iterates over Arrays and Objects (own properties only)
 * @static
 * @param {*} obj
 * @param {function} callback Accepts 3 params: 1. value, 2. key, 3. the original array/object
 */
showdown.helper.forEach = function (obj, callback) {
  'use strict';
  // check if obj is defined
  if (showdown.helper.isUndefined(obj)) {
    throw new Error('obj param is required');
  }

  if (showdown.helper.isUndefined(callback)) {
    throw new Error('callback param is required');
  }

  if (!showdown.helper.isFunction(callback)) {
    throw new Error('callback param must be a function/closure');
  }

  if (typeof obj.forEach === 'function') {
    obj.forEach(callback);
  } else if (showdown.helper.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      callback(obj[i], i, obj);
    }
  } else if (typeof (obj) === 'object') {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        callback(obj[prop], prop, obj);
      }
    }
  } else {
    throw new Error('obj does not seem to be an array or an iterable object');
  }
};

/**
 * Standardidize extension name
 * @static
 * @param {string} s extension name
 * @returns {string}
 */
showdown.helper.stdExtName = function (s) {
  'use strict';
  return s.replace(/[_?*+\/\\.^-]/g, '').replace(/\s/g, '').toLowerCase();
};

function escapeCharactersCallback (wholeMatch, m1) {
  'use strict';
  var charCodeToEscape = m1.charCodeAt(0);
  return '¨E' + charCodeToEscape + 'E';
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
showdown.helper.escapeCharacters = function (text, charsToEscape, afterBackslash) {
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
 * Returns the index within the passed String object of the first occurrence of the specified regex,
 * starting the search at fromIndex. Returns -1 if the value is not found.
 *
 * @param {string} str string to search
 * @param {RegExp} regex Regular expression to search
 * @param {int} [fromIndex = 0] Index to start the search
 * @returns {Number}
 * @throws InvalidArgumentError
 */
showdown.helper.regexIndexOf = function (str, regex, fromIndex) {
  'use strict';
  if (!showdown.helper.isString(str)) {
    throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
  }
  if (regex instanceof RegExp === false) {
    throw 'InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp';
  }
  var indexOf = str.substring(fromIndex || 0).search(regex);
  return (indexOf >= 0) ? (indexOf + (fromIndex || 0)) : indexOf;
};

/**
 * Splits the passed string object at the defined index, and returns an array composed of the two substrings
 * @param {string} str string to split
 * @param {int} index index to split string at
 * @returns {[string,string]}
 * @throws InvalidArgumentError
 */
showdown.helper.splitAtIndex = function (str, index) {
  'use strict';
  if (!showdown.helper.isString(str)) {
    throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
  }
  return [str.substring(0, index), str.substring(index)];
};

/**
 * Obfuscate an e-mail address through the use of Character Entities,
 * transforming ASCII characters into their equivalent decimal or hex entities.
 *
 * Since it has a random component, subsequent calls to this function produce different results
 *
 * @param {string} mail
 * @returns {string}
 */
showdown.helper.encodeEmailAddress = function (mail) {
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

  mail = mail.replace(/./g, function (ch) {
    if (ch === '@') {
      // this *must* be encoded. I insist.
      ch = encode[Math.floor(Math.random() * 2)](ch);
    } else {
      var r = Math.random();
      // roughly 10% raw, 45% hex, 45% dec
      ch = (
        r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch)
      );
    }
    return ch;
  });

  return mail;
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
 * Common regexes.
 * We declare some common regexes to improve performance
 */
showdown.helper.regexes = {
  asteriskAndDash: /([*_])/g
};

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
  function _constructor () {
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
  function _parseExtension (ext, name) {

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
  function legacyExtensionLoading (ext, name) {
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
  function listen (name, callback) {
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

  function rTrimInputText (text) {
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

    // This lets us use ¨ trema as an escape char to avoid md5 hashes
    // The choice of character is arbitrary; anything that isn't
    // magic in Markdown will work.
    text = text.replace(/¨/g, '¨T');

    // Replace $ with ¨D
    // RegExp interprets $ as a special character
    // when it's in a replacement string
    text = text.replace(/\$/g, '¨D');

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

    /**
     * Strip any lines consisting only of spaces and tabs.
     * This makes subsequent regexs easier to write, because we can
     * match consecutive blank lines with /\n+/ instead of something
     * contorted like /[ \t]*\n+/
     */
    text = text.replace(/^[ \t]+$/mg, '');

    //run languageExtensions
    showdown.helper.forEach(langExtensions, function (ext) {
      text = showdown.subParser('runExtension')(ext, text, options, globals);
    });

    // run the sub parsers
    text = showdown.subParser('hashPreCodeTags')(text, options, globals);
    text = showdown.subParser('githubCodeBlocks')(text, options, globals);
    text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
    text = showdown.subParser('hashCodeTags')(text, options, globals);
    text = showdown.subParser('stripLinkDefinitions')(text, options, globals);
    text = showdown.subParser('blockGamut')(text, options, globals);
    text = showdown.subParser('unhashHTMLSpans')(text, options, globals);
    text = showdown.subParser('unescapeSpecialChars')(text, options, globals);

    // attacklab: Restore dollar signs
    text = text.replace(/¨D/g, '$$');

    // attacklab: Restore tremas
    text = text.replace(/¨T/g, '¨');

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

  var writeAnchorTag = function (wholeMatch, linkText, linkId, url, m5, m6, title) {
    if (showdown.helper.isUndefined(title)) {
      title = '';
    }
    linkId = linkId.toLowerCase();

    // Special case for explicit empty url
    if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
      url = '';
    } else if (!url) {
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
        return wholeMatch;
      }
    }

    //url = showdown.helper.escapeCharacters(url, '*_', false); // replaced line to improve performance
    url = url.replace(showdown.helper.regexes.asteriskAndDash, showdown.helper.escapeCharactersCallback);

    var result = '<a href="' + url + '"';

    if (title !== '' && title !== null) {
      title = title.replace(/"/g, '&quot;');
      //title = showdown.helper.escapeCharacters(title, '*_', false); // replaced line to improve performance
      title = title.replace(showdown.helper.regexes.asteriskAndDash, showdown.helper.escapeCharactersCallback);
      result += ' title="' + title + '"';
    }

    if (options.openLinksInNewWindow) {
      // escaped _
      result += ' target="¨E95Eblank"';
    }

    result += '>' + linkText + '</a>';

    return result;
  };

  // First, handle reference-style links: [link text] [id]
  text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, writeAnchorTag);

  // Next, inline-style links: [link text](url "optional title")
  // cases with crazy urls like ./image/cat1).png
  text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
    writeAnchorTag);

  // normal cases
  text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
                      writeAnchorTag);

  // handle reference-style shortcuts: [link text]
  // These must come last in case you've also got [link test][1]
  // or [link test](/foo)
  text = text.replace(/\[([^\[\]]+)]()()()()()/g, writeAnchorTag);

  // Lastly handle GithubMentions if option is enabled
  if (options.ghMentions) {
    text = text.replace(/(^|\s)(\\)?(@([a-z\d\-]+))(?=[.!?;,[\]()]|\s|$)/gmi, function (wm, st, escape, mentions, username) {
      if (escape === '\\') {
        return st + mentions;
      }

      //check if options.ghMentionsLink is a string
      if (!showdown.helper.isString(options.ghMentionsLink)) {
        throw new Error('ghMentionsLink option must be a string');
      }
      var lnk = options.ghMentionsLink.replace(/\{u}/g, username),
          target = '';
      if (options.openLinksInNewWindow) {
        target = ' target="¨E95Eblank"';
      }
      return st + '<a href="' + lnk + '"' + target + '>' + mentions + '</a>';
    });
  }

  text = globals.converter._dispatch('anchors.after', text, options, globals);
  return text;
});

// url allowed chars [a-z\d_.~:/?#[]@!$&'()*+,;=-]

var simpleURLRegex  = /\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)()(?=\s|$)(?!["<>])/gi,
    simpleURLRegex2 = /\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]]?)(?=\s|$)(?!["<>])/gi,
    //simpleURLRegex3 = /\b(((https?|ftp):\/\/|www\.)[a-z\d.-]+\.[a-z\d_.~:/?#\[\]@!$&'()*+,;=-]+?)([.!?()]?)(?=\s|$)(?!["<>])/gi,
    delimUrlRegex   = /<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>/gi,
    simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi,
    delimMailRegex  = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,

    replaceLink = function (options) {
      'use strict';

      return function (wm, link, m2, m3, trailingPunctuation) {
        var lnkTxt = link,
            append = '',
            target = '';
        if (/^www\./i.test(link)) {
          link = link.replace(/^www\./i, 'http://www.');
        }
        if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
          append = trailingPunctuation;
        }
        if (options.openLinksInNewWindow) {
          target = ' target="¨E95Eblank"';
        }
        return '<a href="' + link + '"' + target + '>' + lnkTxt + '</a>' + append;
      };
    },

    replaceMail = function (options, globals) {
      'use strict';
      return function (wholeMatch, b, mail) {
        var href = 'mailto:';
        b = b || '';
        mail = showdown.subParser('unescapeSpecialChars')(mail, options, globals);
        if (options.encodeEmails) {
          href = showdown.helper.encodeEmailAddress(href + mail);
          mail = showdown.helper.encodeEmailAddress(mail);
        } else {
          href = href + mail;
        }
        return b + '<a href="' + href + '">' + mail + '</a>';
      };
    };

showdown.subParser('autoLinks', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('autoLinks.before', text, options, globals);

  text = text.replace(delimUrlRegex, replaceLink(options));
  text = text.replace(delimMailRegex, replaceMail(options, globals));

  text = globals.converter._dispatch('autoLinks.after', text, options, globals);

  return text;
});

showdown.subParser('simplifiedAutoLinks', function (text, options, globals) {
  'use strict';

  if (!options.simplifiedAutoLink) {
    return text;
  }

  text = globals.converter._dispatch('simplifiedAutoLinks.before', text, options, globals);

  if (options.excludeTrailingPunctuationFromURLs) {
    text = text.replace(simpleURLRegex2, replaceLink(options));
  } else {
    text = text.replace(simpleURLRegex, replaceLink(options));
  }
  text = text.replace(simpleMailRegex, replaceMail(options, globals));

  text = globals.converter._dispatch('simplifiedAutoLinks.after', text, options, globals);

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
  text = showdown.subParser('horizontalRule')(text, options, globals);

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
    bq = bq.replace(/^[ \t]*>[ \t]?/gm, '¨0'); // trim one level of quoting

    // attacklab: clean up hack
    bq = bq.replace(/¨0/g, '');

    bq = bq.replace(/^[ \t]+$/gm, ''); // trim whitespace-only lines
    bq = showdown.subParser('githubCodeBlocks')(bq, options, globals);
    bq = showdown.subParser('blockGamut')(bq, options, globals); // recurse

    bq = bq.replace(/(^|\n)/g, '$1  ');
    // These leading spaces screw with <pre> content, so we need to fix that:
    bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch, m1) {
      var pre = m1;
      // attacklab: hack around Konqueror 3.5.4 bug:
      pre = pre.replace(/^  /mg, '¨0');
      pre = pre.replace(/¨0/g, '');
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
  text += '¨0';

  var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
  text = text.replace(pattern, function (wholeMatch, m1, m2) {
    var codeblock = m1,
        nextChar = m2,
        end = '\n';

    codeblock = showdown.subParser('outdent')(codeblock, options, globals);
    codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
    codeblock = showdown.subParser('detab')(codeblock, options, globals);
    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing newlines

    if (options.omitExtraWLInCodeBlocks) {
      end = '';
    }

    codeblock = '<pre><code>' + codeblock + end + '</code></pre>';

    return showdown.subParser('hashBlock')(codeblock, options, globals) + nextChar;
  });

  // strip sentinel
  text = text.replace(/¨0/, '');

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

  if (typeof(text) === 'undefined') {
    text = '';
  }
  text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
    function (wholeMatch, m1, m2, m3) {
      var c = m3;
      c = c.replace(/^([ \t]*)/g, '');	// leading whitespace
      c = c.replace(/[ \t]*$/g, '');	// trailing whitespace
      c = showdown.subParser('encodeCode')(c, options, globals);
      return m1 + '<code>' + c + '</code>';
    }
  );

  text = globals.converter._dispatch('codeSpans.after', text, options, globals);
  return text;
});

/**
 * Convert all tabs to spaces
 */
showdown.subParser('detab', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('detab.before', text, options, globals);

  // expand first n-1 tabs
  text = text.replace(/\t(?=\t)/g, '    '); // g_tab_width

  // replace the nth with two sentinels
  text = text.replace(/\t/g, '¨A¨B');

  // use the sentinel to anchor our regex so it doesn't explode
  text = text.replace(/¨B(.+?)¨A/g, function (wholeMatch, m1) {
    var leadingText = m1,
        numSpaces = 4 - leadingText.length % 4;  // g_tab_width

    // there *must* be a better way to do this:
    for (var i = 0; i < numSpaces; i++) {
      leadingText += ' ';
    }

    return leadingText;
  });

  // clean up sentinels
  text = text.replace(/¨A/g, '    ');  // g_tab_width
  text = text.replace(/¨B/g, '');

  text = globals.converter._dispatch('detab.after', text, options, globals);
  return text;
});

/**
 * Smart processing for ampersands and angle brackets that need to be encoded.
 */
showdown.subParser('encodeAmpsAndAngles', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('encodeAmpsAndAngles.before', text, options, globals);

  // Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:
  // http://bumppo.net/projects/amputator/
  text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, '&amp;');

  // Encode naked <'s
  text = text.replace(/<(?![a-z\/?$!])/gi, '&lt;');

  // Encode <
  text = text.replace(/</g, '&lt;');

  // Encode >
  text = text.replace(/>/g, '&gt;');

  text = globals.converter._dispatch('encodeAmpsAndAngles.after', text, options, globals);
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
showdown.subParser('encodeBackslashEscapes', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('encodeBackslashEscapes.before', text, options, globals);

  text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
  text = text.replace(/\\([`*_{}\[\]()>#+.!~=|-])/g, showdown.helper.escapeCharactersCallback);

  text = globals.converter._dispatch('encodeBackslashEscapes.after', text, options, globals);
  return text;
});

/**
 * Encode/escape certain characters inside Markdown code runs.
 * The point is that in code, these characters are literals,
 * and lose their special Markdown meanings.
 */
showdown.subParser('encodeCode', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('encodeCode.before', text, options, globals);

  // Encode all ampersands; HTML entities are not
  // entities within a Markdown code span.
  text = text
    .replace(/&/g, '&amp;')
  // Do the angle bracket song and dance:
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  // Now, escape characters that are magic in Markdown:
    .replace(/([*_{}\[\]\\=~-])/g, showdown.helper.escapeCharactersCallback);

  text = globals.converter._dispatch('encodeCode.after', text, options, globals);
  return text;
});

/**
 * Within tags -- meaning between < and > -- encode [\ ` * _ ~ =] so they
 * don't conflict with their use in Markdown for code, italics and strong.
 */
showdown.subParser('escapeSpecialCharsWithinTagAttributes', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('escapeSpecialCharsWithinTagAttributes.before', text, options, globals);

  // Build a regex to find HTML tags and comments.  See Friedl's
  // "Mastering Regular Expressions", 2nd Ed., pp. 200-201.
  var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;

  text = text.replace(regex, function (wholeMatch) {
    return wholeMatch
      .replace(/(.)<\/?code>(?=.)/g, '$1`')
      .replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
  });

  text = globals.converter._dispatch('escapeSpecialCharsWithinTagAttributes.after', text, options, globals);
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

  text += '¨0';

  text = text.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function (wholeMatch, language, codeblock) {
    var end = (options.omitExtraWLInCodeBlocks) ? '' : '\n';

    // First parse the github code block
    codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
    codeblock = showdown.subParser('detab')(codeblock, options, globals);
    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing whitespace

    codeblock = '<pre><code' + (language ? ' class="' + language + ' language-' + language + '"' : '') + '>' + codeblock + end + '</code></pre>';

    codeblock = showdown.subParser('hashBlock')(codeblock, options, globals);

    // Since GHCodeblocks can be false positives, we need to
    // store the primitive text and the parsed text in a global var,
    // and then return a token
    return '\n\n¨G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
  });

  // attacklab: strip sentinel
  text = text.replace(/¨0/, '');

  return globals.converter._dispatch('githubCodeBlocks.after', text, options, globals);
});

showdown.subParser('hashBlock', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashBlock.before', text, options, globals);
  text = text.replace(/(^\n+|\n+$)/g, '');
  text = '\n\n¨K' + (globals.gHtmlBlocks.push(text) - 1) + 'K\n\n';
  text = globals.converter._dispatch('hashBlock.after', text, options, globals);
  return text;
});

/**
 * Hash and escape <code> elements that should not be parsed as markdown
 */
showdown.subParser('hashCodeTags', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashCodeTags.before', text, options, globals);

  var repFunc = function (wholeMatch, match, left, right) {
    var codeblock = left + showdown.subParser('encodeCode')(match, options, globals) + right;
    return '¨C' + (globals.gHtmlSpans.push(codeblock) - 1) + 'C';
  };

  // Hash naked <code>
  text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '<code\\b[^>]*>', '</code>', 'gim');

  text = globals.converter._dispatch('hashCodeTags.after', text, options, globals);
  return text;
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

    // Replace the element text with a marker ("¨KxK" where x is its key)
    blockText = '\n\n¨K' + (globals.gHtmlBlocks.push(blockText) - 1) + 'K\n\n';

    return blockText;
  };
});

showdown.subParser('hashHTMLBlocks', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashHTMLBlocks.before', text, options, globals);

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
        return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
      };

  if (options.backslashEscapesHTMLTags) {
    // encode backslash escaped HTML tags
    text = text.replace(/\\<(\/?[^>]+?)>/g, function (wm, inside) {
      return '&lt;' + inside + '&gt;';
    });
  }

  // hash HTML Blocks
  for (var i = 0; i < blockTags.length; ++i) {

    var opTagPos,
        rgx1     = new RegExp('^ {0,3}(<' + blockTags[i] + '\\b[^>]*>)', 'im'),
        patLeft  = '<' + blockTags[i] + '\\b[^>]*>',
        patRight = '</' + blockTags[i] + '>';
    // 1. Look for the first position of the first opening HTML tag in the text
    while ((opTagPos = showdown.helper.regexIndexOf(text, rgx1)) !== -1) {

      // if the HTML tag is \ escaped, we need to escape it and break


      //2. Split the text in that position
      var subTexts = showdown.helper.splitAtIndex(text, opTagPos),
      //3. Match recursively
          newSubText1 = showdown.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, 'im');

      // prevent an infinite loop
      if (newSubText1 === subTexts[1]) {
        break;
      }
      text = subTexts[0].concat(newSubText1);
    }
  }
  // HR SPECIAL CASE
  text = text.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
    showdown.subParser('hashElement')(text, options, globals));

  // Special case for standalone HTML comments
  text = showdown.helper.replaceRecursiveRegExp(text, function (txt) {
    return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
  }, '^ {0,3}<!--', '-->', 'gm');

  // PHP and ASP-style processor instructions (<?...?> and <%...%>)
  text = text.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
    showdown.subParser('hashElement')(text, options, globals));

  text = globals.converter._dispatch('hashHTMLBlocks.after', text, options, globals);
  return text;
});

/**
 * Hash span elements that should not be parsed as markdown
 */
showdown.subParser('hashHTMLSpans', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashHTMLSpans.before', text, options, globals);

  function hashHTMLSpan (html) {
    return '¨C' + (globals.gHtmlSpans.push(html) - 1) + 'C';
  }

  // Hash Self Closing tags
  text = text.replace(/<[^>]+?\/>/gi, function (wm) {
    return hashHTMLSpan(wm);
  });

  // Hash tags without properties
  text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function (wm) {
    return hashHTMLSpan(wm);
  });

  // Hash tags with properties
  text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function (wm) {
    return hashHTMLSpan(wm);
  });

  // Hash self closing tags without />
  text = text.replace(/<[^>]+?>/gi, function (wm) {
    return hashHTMLSpan(wm);
  });

  /*showdown.helper.matchRecursiveRegExp(text, '<code\\b[^>]*>', '</code>', 'gi');*/

  text = globals.converter._dispatch('hashHTMLSpans.after', text, options, globals);
  return text;
});

/**
 * Unhash HTML spans
 */
showdown.subParser('unhashHTMLSpans', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('unhashHTMLSpans.before', text, options, globals);

  for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
    var repText = globals.gHtmlSpans[i],
        // limiter to prevent infinite loop (assume 10 as limit for recurse)
        limit = 0;

    while (/¨C(\d+)C/.test(repText)) {
      var num = RegExp.$1;
      repText = repText.replace('¨C' + num + 'C', globals.gHtmlSpans[num]);
      if (limit === 10) {
        break;
      }
      ++limit;
    }
    text = text.replace('¨C' + i + 'C', repText);
  }

  text = globals.converter._dispatch('unhashHTMLSpans.after', text, options, globals);
  return text;
});

/**
 * Hash and escape <pre><code> elements that should not be parsed as markdown
 */
showdown.subParser('hashPreCodeTags', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashPreCodeTags.before', text, options, globals);

  var repFunc = function (wholeMatch, match, left, right) {
    // encode html entities
    var codeblock = left + showdown.subParser('encodeCode')(match, options, globals) + right;
    return '\n\n¨G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
  };

  // Hash <pre><code>
  text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>', '^ {0,3}</code>\\s*</pre>', 'gim');

  text = globals.converter._dispatch('hashPreCodeTags.after', text, options, globals);
  return text;
});

showdown.subParser('headers', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('headers.before', text, options, globals);

  var headerLevelStart = (isNaN(parseInt(options.headerLevelStart))) ? 1 : parseInt(options.headerLevelStart),

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
    var hText = m2;
    if (options.customizedHeaderId) {
      hText = m2.replace(/\s?\{([^{]+?)}\s*$/, '');
    }

    var span = showdown.subParser('spanGamut')(hText, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m2) + '"',
        hLevel = headerLevelStart - 1 + m1.length,
        header = '<h' + hLevel + hID + '>' + span + '</h' + hLevel + '>';

    return showdown.subParser('hashBlock')(header, options, globals);
  });

  function headerId (m) {
    var title,
        prefix;

    // It is separate from other options to allow combining prefix and customized
    if (options.customizedHeaderId) {
      var match = m.match(/\{([^{]+?)}\s*$/);
      if (match && match[1]) {
        m = match[1];
      }
    }

    title = m;

    // Prefix id to prevent causing inadvertent pre-existing style matches.
    if (showdown.helper.isString(options.prefixHeaderId)) {
      prefix = options.prefixHeaderId;
    } else if (options.prefixHeaderId === true) {
      prefix = 'section-';
    } else {
      prefix = '';
    }

    if (!options.rawPrefixHeaderId) {
      title = prefix + title;
    }

    if (options.ghCompatibleHeaderId) {
      title = title
        .replace(/ /g, '-')
        // replace previously escaped chars (&, ¨ and $)
        .replace(/&amp;/g, '')
        .replace(/¨T/g, '')
        .replace(/¨D/g, '')
        // replace rest of the chars (&~$ are repeated as they might have been escaped)
        // borrowed from github's redcarpet (some they should produce similar results)
        .replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, '')
        .toLowerCase();
    } else if (options.rawHeaderId) {
      title = title
        .replace(/ /g, '-')
        // replace previously escaped chars (&, ¨ and $)
        .replace(/&amp;/g, '&')
        .replace(/¨T/g, '¨')
        .replace(/¨D/g, '$')
        // replace " and '
        .replace(/["']/g, '-')
        .toLowerCase();
    } else {
      title = title
        .replace(/[^\w]/g, '')
        .toLowerCase();
    }

    if (options.rawPrefixHeaderId) {
      title = prefix + title;
    }

    if (globals.hashLinkCounts[title]) {
      title = title + '-' + (globals.hashLinkCounts[title]++);
    } else {
      globals.hashLinkCounts[title] = 1;
    }
    return title;
  }

  text = globals.converter._dispatch('headers.after', text, options, globals);
  return text;
});

/**
 * Turn Markdown link shortcuts into XHTML <a> tags.
 */
showdown.subParser('horizontalRule', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('horizontalRule.before', text, options, globals);

  var key = showdown.subParser('hashBlock')('<hr />', options, globals);
  text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
  text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
  text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);

  text = globals.converter._dispatch('horizontalRule.after', text, options, globals);
  return text;
});

/**
 * Turn Markdown image shortcuts into <img> tags.
 */
showdown.subParser('images', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('images.before', text, options, globals);

  var inlineRegExp      = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
      crazyRegExp       = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g,
      referenceRegExp   = /!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g,
      refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;

  function writeImageTag (wholeMatch, altText, linkId, url, width, height, m5, title) {

    var gUrls   = globals.gUrls,
        gTitles = globals.gTitles,
        gDims   = globals.gDimensions;

    linkId = linkId.toLowerCase();

    if (!title) {
      title = '';
    }
    // Special case for explicit empty url
    if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
      url = '';

    } else if (url === '' || url === null) {
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

    altText = altText
      .replace(/"/g, '&quot;')
    //altText = showdown.helper.escapeCharacters(altText, '*_', false);
      .replace(showdown.helper.regexes.asteriskAndDash, showdown.helper.escapeCharactersCallback);
    //url = showdown.helper.escapeCharacters(url, '*_', false);
    url = url.replace(showdown.helper.regexes.asteriskAndDash, showdown.helper.escapeCharactersCallback);
    var result = '<img src="' + url + '" alt="' + altText + '"';

    if (title) {
      title = title
        .replace(/"/g, '&quot;')
      //title = showdown.helper.escapeCharacters(title, '*_', false);
        .replace(showdown.helper.regexes.asteriskAndDash, showdown.helper.escapeCharactersCallback);
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
  // cases with crazy urls like ./image/cat1).png
  text = text.replace(crazyRegExp, writeImageTag);

  // normal cases
  text = text.replace(inlineRegExp, writeImageTag);

  // handle reference-style shortcuts: |[img text]
  text = text.replace(refShortcutRegExp, writeImageTag);

  text = globals.converter._dispatch('images.after', text, options, globals);
  return text;
});

showdown.subParser('italicsAndBold', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('italicsAndBold.before', text, options, globals);

  // it's faster to have 3 separate regexes for each case than have just one
  // because of backtracing, in some cases, it could lead to an exponential effect
  // called "catastrophic backtrace". Ominous!

  function parseInside (txt, left, right) {
    if (options.simplifiedAutoLink) {
      txt = showdown.subParser('simplifiedAutoLinks')(txt, options, globals);
    }
    return left + txt + right;
  }

  // Parse underscores
  if (options.literalMidWordUnderscores) {
    text = text.replace(/\b___(\S[\s\S]*)___\b/g, function (wm, txt) {
      return parseInside (txt, '<strong><em>', '</em></strong>');
    });
    text = text.replace(/\b__(\S[\s\S]*)__\b/g, function (wm, txt) {
      return parseInside (txt, '<strong>', '</strong>');
    });
    text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function (wm, txt) {
      return parseInside (txt, '<em>', '</em>');
    });
  } else {
    text = text.replace(/___(\S[\s\S]*?)___/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong><em>', '</em></strong>') : wm;
    });
    text = text.replace(/__(\S[\s\S]*?)__/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong>', '</strong>') : wm;
    });
    text = text.replace(/_([^\s_][\s\S]*?)_/g, function (wm, m) {
      // !/^_[^_]/.test(m) - test if it doesn't start with __ (since it seems redundant, we removed it)
      return (/\S$/.test(m)) ? parseInside (m, '<em>', '</em>') : wm;
    });
  }

  // Now parse asterisks
  if (options.literalMidWordAsterisks) {
    text = text.trim().replace(/(^| )\*{3}(\S[\s\S]*?)\*{3}([ ,;!?.]|$)/g, function (wm, lead, txt, trail) {
      return parseInside (txt, lead + '<strong><em>', '</em></strong>' + trail);
    });
    text = text.trim().replace(/(^| )\*{2}(\S[\s\S]*?)\*{2}([ ,;!?.]|$)/g, function (wm, lead, txt, trail) {
      return parseInside (txt, lead + '<strong>', '</strong>' + trail);
    });
    text = text.trim().replace(/(^| )\*(\S[\s\S]*?)\*([ ,;!?.]|$)/g, function (wm, lead, txt, trail) {
      return parseInside (txt, lead + '<em>', '</em>' + trail);
    });
  } else {
    text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong><em>', '</em></strong>') : wm;
    });
    text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong>', '</strong>') : wm;
    });
    text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function (wm, m) {
      // !/^\*[^*]/.test(m) - test if it doesn't start with ** (since it seems redundant, we removed it)
      return (/\S$/.test(m)) ? parseInside (m, '<em>', '</em>') : wm;
    });
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
    listStr += '¨0';

    var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,
        isParagraphed = (/\n[ \t]*\n(?!¨0)/.test(listStr));

    // Since version 1.5, nesting sublists requires 4 spaces (or 1 tab) indentation,
    // which is a syntax breaking change
    // activating this option reverts to old behavior
    if (options.disableForced4SpacesIndentedSublists) {
      rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
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
      // So, to prevent it, we will put a marker (¨A)in the beginning of the line
      // Kind of hackish/monkey patching, but seems more effective than overcomplicating the list parser
      item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function (wm2) {
        return '¨A' + wm2;
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
        if (isParagraphed) {
          item = showdown.subParser('paragraphs')(item, options, globals);
        } else {
          item = showdown.subParser('spanGamut')(item, options, globals);
        }
      }

      // now we need to remove the marker (¨A)
      item = item.replace('¨A', '');
      // we can finally wrap the line in list item tags
      item =  '<li' + bulletStyle + '>' + item + '</li>\n';

      return item;
    });

    // attacklab: strip sentinel
    listStr = listStr.replace(/¨0/g, '');

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
  function parseConsecutiveLists (list, listType, trimTrailing) {
    // check if we caught 2 or more consecutive lists by mistake
    // we use the counterRgx, meaning if listType is UL we look for OL and vice versa
    var olRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm,
        ulRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm,
        counterRxg = (listType === 'ul') ? olRgx : ulRgx,
        result = '';

    if (list.search(counterRxg) !== -1) {
      (function parseCL (txt) {
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
  text += '¨0';

  if (globals.gListLevel) {
    text = text.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
      function (wholeMatch, list, m2) {
        var listType = (m2.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType, true);
      }
    );
  } else {
    text = text.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
      function (wholeMatch, m1, list, m3) {
        var listType = (m3.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType, false);
      }
    );
  }

  // strip sentinel
  text = text.replace(/¨0/, '');
  text = globals.converter._dispatch('lists.after', text, options, globals);
  return text;
});

/**
 * Remove one level of line-leading tabs or spaces
 */
showdown.subParser('outdent', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('outdent.before', text, options, globals);

  // attacklab: hack around Konqueror 3.5.4 bug:
  // "----------bug".replace(/^-/g,"") == "bug"
  text = text.replace(/^(\t|[ ]{1,4})/gm, '¨0'); // attacklab: g_tab_width

  // attacklab: clean up hack
  text = text.replace(/¨0/g, '');

  text = globals.converter._dispatch('outdent.after', text, options, globals);
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
    if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
      grafsOut.push(str);

    // test for presence of characters to prevent empty lines being parsed
    // as paragraphs (resulting in undesired extra empty paragraphs)
    } else if (str.search(/\S/) >= 0) {
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
    // use RegExp.test instead of string.search because of QML bug
    while (/¨(K|G)(\d+)\1/.test(grafsOutIt)) {
      var delim = RegExp.$1,
          num   = RegExp.$2;

      if (delim === 'K') {
        blockText = globals.gHtmlBlocks[num];
      } else {
        // we need to check if ghBlock is a false positive
        if (codeFlag) {
          // use encoded version of all text
          blockText = showdown.subParser('encodeCode')(globals.ghCodeBlocks[num].text, options, globals);
        } else {
          blockText = globals.ghCodeBlocks[num].codeblock;
        }
      }
      blockText = blockText.replace(/\$/g, '$$$$'); // Escape any dollar signs

      grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
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
    if (!(re instanceof RegExp)) {
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
  // Must come after anchors, because you can use < and >
  // delimiters in inline links like [this](<url>).
  text = showdown.subParser('autoLinks')(text, options, globals);
  text = showdown.subParser('italicsAndBold')(text, options, globals);
  text = showdown.subParser('strikethrough')(text, options, globals);
  text = showdown.subParser('simplifiedAutoLinks')(text, options, globals);

  // we need to hash HTML tags inside spans
  text = showdown.subParser('hashHTMLSpans')(text, options, globals);

  // now we encode amps and angles
  text = showdown.subParser('encodeAmpsAndAngles')(text, options, globals);

  // Do hard breaks
  if (options.simpleLineBreaks) {
    // GFM style hard breaks
    // only add line breaks if the text does not contain a block (special case for lists)
    if (!/\n\n¨K/.test(text)) {
      text = text.replace(/\n+/g, '<br />\n');
    }
  } else {
    // Vanilla hard breaks
    text = text.replace(/  +\n/g, '<br />\n');
  }

  text = globals.converter._dispatch('spanGamut.after', text, options, globals);
  return text;
});

showdown.subParser('strikethrough', function (text, options, globals) {
  'use strict';

  function parseInside (txt) {
    if (options.simplifiedAutoLink) {
      txt = showdown.subParser('simplifiedAutoLinks')(txt, options, globals);
    }
    return '<del>' + txt + '</del>';
  }

  if (options.strikethrough) {
    text = globals.converter._dispatch('strikethrough.before', text, options, globals);
    text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function (wm, txt) { return parseInside(txt); });
    text = globals.converter._dispatch('strikethrough.after', text, options, globals);
  }

  return text;
});

/**
 * Strips link definitions from text, stores the URLs and titles in
 * hash references.
 * Link defs are in the form: ^[id]: url "optional title"
 */
showdown.subParser('stripLinkDefinitions', function (text, options, globals) {
  'use strict';

  var regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm;

  // attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug
  text += '¨0';

  text = text.replace(regex, function (wholeMatch, linkId, url, width, height, blankLines, title) {
    linkId = linkId.toLowerCase();
    globals.gUrls[linkId] = showdown.subParser('encodeAmpsAndAngles')(url, options, globals);  // Link IDs are case-insensitive

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
  text = text.replace(/¨0/, '');

  return text;
});

showdown.subParser('tables', function (text, options, globals) {
  'use strict';

  if (!options.tables) {
    return text;
  }

  var tableRgx       = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm,
    //singeColTblRgx = /^ {0,3}\|.+\|\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n(?: {0,3}\|.+\|\n)+(?:\n\n|¨0)/gm;
      singeColTblRgx = /^ {0,3}\|.+\|\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|\n( {0,3}\|.+\|\n)*(?:\n|¨0)/gm;

  function parseStyles (sLine) {
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

  function parseHeaders (header, style) {
    var id = '';
    header = header.trim();
    // support both tablesHeaderId and tableHeaderId due to error in documention so we don't break backwards compatibility
    if (options.tablesHeaderId || options.tableHeaderId) {
      id = ' id="' + header.replace(/ /g, '_').toLowerCase() + '"';
    }
    header = showdown.subParser('spanGamut')(header, options, globals);

    return '<th' + id + style + '>' + header + '</th>\n';
  }

  function parseCells (cell, style) {
    var subText = showdown.subParser('spanGamut')(cell, options, globals);
    return '<td' + style + '>' + subText + '</td>\n';
  }

  function buildTable (headers, cells) {
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

  function parseTable (rawTable) {
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
  }

  text = globals.converter._dispatch('tables.before', text, options, globals);

  // find escaped pipe characters
  text = text.replace(/\\(\|)/g, showdown.helper.escapeCharactersCallback);

  // parse multi column tables
  text = text.replace(tableRgx, parseTable);

  // parse one column tables
  text = text.replace(singeColTblRgx, parseTable);

  text = globals.converter._dispatch('tables.after', text, options, globals);

  return text;
});

/**
 * Swap back in all the special characters we've hidden.
 */
showdown.subParser('unescapeSpecialChars', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('unescapeSpecialChars.before', text, options, globals);

  text = text.replace(/¨E(\d+)E/g, function (wholeMatch, m1) {
    var charCodeToReplace = parseInt(m1);
    return String.fromCharCode(charCodeToReplace);
  });

  text = globals.converter._dispatch('unescapeSpecialChars.after', text, options, globals);
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
  }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

// Regular Browser loader
} else {
  root.showdown = showdown;
}
}).call(this);

//# sourceMappingURL=showdown.js.map


/***/ }),

/***/ 661:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(8);
var showdown_directive_1 = __webpack_require__(141);
var src_directive_1 = __webpack_require__(222);
var showdown_pipe_1 = __webpack_require__(223);
var showdown_converter_provider_1 = __webpack_require__(221);
var base_converter_options_provider_1 = __webpack_require__(73);
var declarations = [
    showdown_directive_1.ShowdownDirective,
    showdown_pipe_1.ShowdownPipe,
    src_directive_1.SrcDirective
];
/**
 * @example
 * ```javascript
 * import { NgModule } from '@angular/core';
 * import { ShowdownModule} from 'ngx-showdown';
 * @NgModule({
 *  imports: [ ShowdownModule ];
 * })
 * export class AppModule{}
 * ```
 * ```javascript
 * import { NgModule } from '@angular/core';
 * import { ShowdownModule, IConverterOptions, ConverterOptions } from 'ngx-showdown';
 * @NgModule({
 *  imports: [ ShowdownModule.forRoot({...} as IConverterOptions | ConverterOptions) ];
 * })
 * export class AppModule{}
 * ```
 */
var ShowdownModule = /** @class */ (function () {
    function ShowdownModule() {
    }
    ShowdownModule_1 = ShowdownModule;
    ShowdownModule.forRoot = function (config) {
        return {
            ngModule: ShowdownModule_1,
            providers: [
                { provide: base_converter_options_provider_1.ConverterOptions, useValue: config }
            ]
        };
    };
    ShowdownModule = ShowdownModule_1 = __decorate([
        core_1.NgModule({
            declarations: declarations,
            providers: [
                showdown_converter_provider_1.ShowdownConverter,
                { provide: base_converter_options_provider_1.ConverterOptions, useClass: base_converter_options_provider_1.BaseConverterOptions }
            ],
            exports: declarations
        })
    ], ShowdownModule);
    return ShowdownModule;
    var ShowdownModule_1;
}());
exports.ShowdownModule = ShowdownModule;


/***/ }),

/***/ 662:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(8);
var utils_1 = __webpack_require__(140);
var ConverterOptions = /** @class */ (function () {
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
 * import { ConverterOptions, BaseConverterOptions } from 'ngx-showdown';
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
var BaseConverterOptions = /** @class */ (function (_super) {
    __extends(BaseConverterOptions, _super);
    function BaseConverterOptions() {
        return _super.call(this, {
            customizedHeaderId: false,
            backslashEscapesHTMLTags: false,
            disableForced4SpacesIndentedSublists: false,
            encodeEmails: true,
            excludeTrailingPunctuationFromURLs: false,
            extensions: [],
            ghCodeBlocks: true,
            ghCompatibleHeaderId: false,
            ghMentions: false,
            ghMentionsLink: 'https://github.com/{u}',
            headerLevelStart: 1,
            literalMidWordAsterisks: false,
            literalMidWordUnderscores: false,
            noHeaderId: false,
            omitExtraWLInCodeBlocks: false,
            openLinksInNewWindow: false,
            parseImgDimensions: false,
            prefixHeaderId: false,
            rawHeaderId: false,
            rawPrefixHeaderId: false,
            requireSpaceBeforeHeadingText: false,
            simpleLineBreaks: false,
            simplifiedAutoLink: false,
            smartIndentationFix: false,
            smoothLivePreview: false,
            strikethrough: false,
            tables: false,
            tablesHeaderId: false,
            tasklists: false,
            trimEachLine: false
        }) || this;
    }
    BaseConverterOptions = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], BaseConverterOptions);
    return BaseConverterOptions;
}(ConverterOptions));
exports.BaseConverterOptions = BaseConverterOptions;


/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var showdown_1 = __webpack_require__(660);
var utils_1 = __webpack_require__(140);
var BaseConverter = /** @class */ (function (_super) {
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


/***/ })

},[652]);
//# sourceMappingURL=app.js.map