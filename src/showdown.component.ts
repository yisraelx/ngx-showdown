import { Component, ElementRef, Input, OnChanges, OnInit, Optional, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ShowdownConverter } from './showdown-converter.provider';
import * as Showdown from 'showdown';
import { ShowdownConfig } from './showdown-config.provider';

/**
 * @internal
 */
const MAP_OPTION = {
  '': true,
  'true': true,
  'false': false
};

/**
 * @internal
 */
let _toOption = (value: any) => MAP_OPTION.hasOwnProperty(value) ? MAP_OPTION[value] : value;

/**
 * The options keys for the dynamic properties set
 * @internal
 */
const OPTIONS_PROPERTIES_KEYS: string[] = Object.keys(Showdown.getDefaultOptions());

// for the options getter setter properties that dynamic definition (the code after the class)
export interface ShowdownComponent extends Showdown.ShowdownOptions {
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
 * import * as Showdown from 'showdown';
 *
 * @Component({
 *     selector: 'some',
 *     template: '<showdown [value]="text" [options]="options"></showdown>'
 * })
 * export class SomeComponent {
 *     text: string = "# Some header";
 *     options: Showdown.ShowdownOptions = {noHeaderId: true};
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
export class ShowdownComponent extends ShowdownConverter implements OnInit, OnChanges, Showdown.ShowdownOptions {

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
    * import * as Showdown from 'showdown';
    *
    * @Component({
    *     selector: `some`,
    *     template: `
    *      <showdown [options]="options"># Some Header<showdown>
    *     `
    * })
    * export class SomeComponent {
    *     options: Showdown.ShowdownOptions = {headerLevelStart: 1};
    *     // ...
    * }
    * ```
    * Or
    * ```html
    * <showdown [options]="{smartIndentationFix: true}"> # Indentation Fix<showdown>
    * ```
    */
    @Input()
    get options(): Showdown.ShowdownOptions {
        return this.getOptions();
    }

    set options(options: Showdown.ShowdownOptions) {
        this.setOptions(options);
    }

    private _sanitize: boolean;

    /**
     * Enables html sanitize, it will sanitize the converter html output by [`DomSanitizer`](https://angular.io/api/platform-browser/DomSanitizer#sanitize).
     *
     * **Example :**
     *
     * ```typescript
     * import { Component } from '@angular/core';
     *
     * @Component({
     *   selector: 'some',
     *   styles: [`.box { width: 95%; padding: 5px; border: 1px solid black;}`],
     *   template: `
     *     <h3>Input</h3>
     *     <textarea class="box" [(ngModel)]="text"></textarea>
     *     <input type="checkbox" [(ngModel)]="sanitize"/> <b>Sanitize</b>
     *     <h3>Markdown</h3>
     *     <pre class="box"><code>{{ text }}</code></pre>
     *     <h3>Result</h3>
     *     <pre class="box"><code>{{sd.innerHTML}}</code></pre>
     *     <h3>Preview</h3>
     *     <div class="box">
     *       <showdown #sd [value]="text" [sanitize]="sanitize"></showdown>
     *     </div>
     *   `;
     * })
     * export class SomeComponent {
     *    text: string = `# A cool link
     * <a href="javascript:alert('Hello!')">click me</a>`;
     * }
     * ```
     */
    @Input()
    set sanitize(sanitize: boolean){
        this._sanitize = _toOption(sanitize);
    }

    constructor(private _elementRef: ElementRef, @Optional() private _domSanitizer?: DomSanitizer, @Optional() config?: ShowdownConfig) {
        super(config);
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
            let result = this.makeHtml(this.value);

            if (this._sanitize) {
                result = this._domSanitizer.sanitize(SecurityContext.HTML, result);
            }

            this._elementRef.nativeElement.innerHTML = result;
        }
    }

}

// Define options properties getter setter for angular directive and direct access
for (let key of OPTIONS_PROPERTIES_KEYS) {
  Object.defineProperty(ShowdownComponent.prototype, key, {
      set (value: any): void {
          this.setOption(key, _toOption(value));
      },
      configurable: true
  });
}
