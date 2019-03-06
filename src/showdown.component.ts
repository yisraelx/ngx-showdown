import { Component, ElementRef, Input, OnInit, Optional } from '@angular/core';
import { getDefaultOptions } from 'showdown';
import $ from './utils';
import { ConverterOptions } from './base-converter-options.provider';
import { BaseConverter, IConverterOptionsChangeable } from './base-converter.class';


// The options keys for the dynamic properties set
const OPTIONS_PROPERTIES_KEYS: string[] = Object.keys(getDefaultOptions());

// options getter setter dynamic definition (the code after the class)
export interface ShowdownComponent extends IConverterOptionsChangeable {
}

export enum SHOWDOWN_DIRECTIVE_TYPES {
    NONE,
    SRC,
    BINDING,
    CONTENT
}

export enum SHOWDOWN_DIRECTIVE_STATUSES {
    CREATED,
    INIT,
    PROCESSING,
    READY,
}

/**
 * @problem in content use <showdown>{}</showdown> - [unescaped "{":](https://github.com/angular/angular/issues/11859) the solution is to sanitize (html char code etc.).
 *
 * @example
 * Setup as standalone
 * ```typescript
 * import { NgModule } from '@angular/core';
 * import { ShowdownComponent } from 'ngx-showdown';
 *
 * @NgModule({
 *     declarations: [ ShowdownComponent ];
 * })
 * export class AppModule{}
 * ```
 *
 * Bind markdown value and options object
 * ```typescript
 * import { Component } from '@angular/core';
 * import { IConverterOptionsChangeable } from 'ngx-showdown';
 *
 * @Component({
 *     selector: 'some',
 *     template: '<showdown [value]="text" [options]="options"></showdown>'
 * })
 * export class SomeComponent {
 *     text: string = "# Some header";
 *     options: IConverterOptionsChangeable = {noHeaderId: true};
 *     // ...
 * }
 * ```
 * Bind single option (it have properties for all showdown options).
 * ```html
 * <showdown emoji="true"  noHeaderId># Some text :+1:</showdown>
 * ```
 *
 * Set static markdown value
 * ```html
 * <showdown value="___Some static value___" underline></showdown>
 * ```
 *
 * Use as directive on anther element
 * ```html
 * <div showdown="# Div Element" headerLevelStart="2"></div>
 * ```
 *
 * Markdown value in the element content
 * ```html
 * <div>
 *    <showdown smartIndentationFix>
 *       # List:
 *       * a
 *            * A
 *       * b
 *    </showdown>
 * </div>
 * ```
 *
 * Set template reference variable
 * ```html
 * <showdown #sd></showdown>
 * ```
 * Or
 * ```html
 * <div showdown #sd="showdown"></div>
 * ```
 */
@Component({
    selector: 'showdown,[showdown]',
    template: '<ng-content></ng-content>',
    exportAs: 'showdown',
    inputs: OPTIONS_PROPERTIES_KEYS
})
export class ShowdownComponent extends BaseConverter implements OnInit, IConverterOptionsChangeable {

    public static readonly TYPES = SHOWDOWN_DIRECTIVE_TYPES;
    public static readonly STATUSES = SHOWDOWN_DIRECTIVE_STATUSES;

    private _value: string;
    private _type: number = ShowdownComponent.TYPES.NONE;
    private _status: number = ShowdownComponent.STATUSES.CREATED;

    /** Value of the component (the input md text pre converter). */
    @Input()
    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        this.setValue(value);
    }

    /** Type of the input source [binding, content, src]. */
    public get type(): string {
        return ShowdownComponent.TYPES[this._type].toLowerCase();
    }

    /** Status of the component life cycle. */
    public get status(): string {
        return ShowdownComponent.STATUSES[this._status].toLowerCase();
    }

    /** Alias to value */
    @Input()
    public get showdown(): string {
        return this.value;
    }

    public set showdown(value: string) {
        this.value = value;
    }

    @Input()
    public get options(): IConverterOptionsChangeable {
        return this.getOptions();
    }

    public set options(options: IConverterOptionsChangeable) {
        this.setOptions(options);
    }

    constructor(private _elementRef: ElementRef, @Optional() options?: ConverterOptions) {
        super(options);

        // override the setOption method (define in the super constructor)
        this.setOption = (optionKey: string, value: any) => {
            this.getOptions()[optionKey] = value;
            this._onChange();
        };
    }

    public ngOnInit(): void {

        if (this._type === ShowdownComponent.TYPES.NONE && !$.isEmpty(this._elementRef.nativeElement.innerText)) {
            let value = this._elementRef.nativeElement.innerHTML;
            this.setValue(value, ShowdownComponent.TYPES.CONTENT);
        }

        if (this._status === ShowdownComponent.STATUSES.CREATED) {
            this._status = ShowdownComponent.STATUSES.INIT;
        }

    }

    public setValue(value: string, type: number = ShowdownComponent.TYPES.BINDING): void {
        this._value = value;
        this._type = type;
        this._onChange();
    }

    public setOptions(options: IConverterOptionsChangeable): void {
        super.setOptions(options);
        this._onChange();
    }

    public compile(): void {
        if (this._type === ShowdownComponent.TYPES.NONE) return;
        this._status = ShowdownComponent.STATUSES.PROCESSING;
        this._elementRef.nativeElement.innerHTML = this.toHTML();
        this._status = ShowdownComponent.STATUSES.READY;
    }

    public registerOnChange(fn: (() => void)): void {
        if (!$.isFunction(fn)) throw new Error('Arg fn is missing or invalid.');
        this._onChange = fn;
    }

    /** Converter the component (md value) to html */
    public toHTML(): string {
        let {_value: value} = this;
        return this.makeHtml(value);
    }

    /** Default OnChange method, Called on change value or options */
    private _onChange: (() => void) = (): void => {
        this.compile();
    }

}

// define options properties getter setter for angular directive and direct access
for (let key of OPTIONS_PROPERTIES_KEYS) {
  Object.defineProperty(ShowdownComponent.prototype, key, {
    set (value: any): void {
      this.setOption(key, value === '' || value == null || value);
    },
    get (): any {
      return this.getOption(key);
    },
    enumerable: true,
    configurable: true
  });
}
