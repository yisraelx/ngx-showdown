import { Component, ElementRef, Input, OnChanges, OnInit, Optional } from '@angular/core';
import { getDefaultOptions } from 'showdown';
import { ConverterOptions } from './base-converter-options.provider';
import { BaseConverter, IConverterOptionsChangeable } from './base-converter.class';


// The options keys for the dynamic properties set
const OPTIONS_PROPERTIES_KEYS: string[] = Object.keys(getDefaultOptions());

// options getter setter dynamic definition (the code after the class)
export interface ShowdownComponent extends IConverterOptionsChangeable {
}

/**
 * A angular markdown component
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
 * export class AppModule {}
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
export class ShowdownComponent extends BaseConverter implements OnInit, OnChanges, IConverterOptionsChangeable {

    /**
     * The input markdown value.
     *
     * @example
     * Set some static markdown value.
     * ```html
     * <showdown value="**Some bold value**"></showdown>
     * ```
     *
     * Bind property with markdown value.
     * ```html
     * <textarea [(ngModel)]="text"></textarea>
     * <showdown [value]="text"></showdown>
     * ```
     */
    @Input() value: string;

    /**
     * Input alias to `value`.
     *
     * @example
     * ```html
     * <div [showdown]="# Some Header"></div>
     * ```
     *
     * Equivalent to
     * ```html
     * <showdown [value]="# Some Header"></showdown>
     * ```
     */
    @Input() set showdown(value: string) {
        this.value = value;
    }

   /**
    * The showdown options of the converter.
    *
    * @example
    * Bind options
    * ```typescript
    * import { Component } from '@angular/core';
    * import { IConverterOptionsChangeable } from 'ngx-showdown';
    *
    * @Component({
    *     selector: `some`,
    *     template: `
    *      <showdown [options]="options"># Some Header<showdown>
    *     `
    * })
    * export class SomeComponent {
    *     options: IConverterOptionsChangeable = {headerLevelStart: 1};
    *     // ...
    * }
    * ```
    * Or
    * ```html
    * <showdown [options]="{smartIndentationFix: true}"> # Indentation Fix<showdown>
    * ```
    */
    @Input()
    public get options(): IConverterOptionsChangeable {
        return this.getOptions();
    }

    public set options(options: IConverterOptionsChangeable) {
        this.setOptions(options);
    }

    constructor(private _elementRef: ElementRef, @Optional() options?: ConverterOptions) {
        super(options);
    }

    /**
     * A angular lifecycle method, Use on init to check if it `content` type and load the element `content` to `value`.
     * @internal
     */
    ngOnInit(): void {
        if (this.value === undefined && this._elementRef.nativeElement.innerHTML.trim() !== '') {
            this.render(this._elementRef.nativeElement.innerHTML);
        }
    }

    /**
     * A angular lifecycle method, Use to call to render method after changes.
     * @internal
     */
    ngOnChanges(): void {
        this.render();
    }

    /**
     * Convert the markdown value of `this#value` to html and set the html result to the element content.
     *
     * @param value - A markdown value to render (it will override the current value of `this#value`)
     * @example
     * ```html
     * <textarea #textarea (change)="showdown.render(textarea.value)"/># Some Header</textarea>
     * <showdown #showdown></showdown>
     * ```
     */
    public render(value?: string): void {
        if (typeof value === 'string') {
            this.value = value;
        }

        if (typeof this.value === 'string') {
            this._elementRef.nativeElement.innerHTML = this.makeHtml(this.value);
        }
    }

}

// define options properties getter setter for angular directive and direct access
for (let key of OPTIONS_PROPERTIES_KEYS) {
  Object.defineProperty(ShowdownComponent.prototype, key, {
    set (value: any): void {
        this.setOption(key, value === '' || value == null || value);
    },
    configurable: true
  });
}
