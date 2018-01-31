import { Directive, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShowdownDirective } from './showdown.directive';

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
@Directive({
    selector: 'showdown[src],[showdown][src]'
})
export class SrcDirective {

    private _src: string;

    /** Source of md file */
    @Input()
    public get src(): string {
        return this._src;
    }

    public set src(src: string) {
        this._src = src;
        this.load();
    }

    constructor(private _showdownDirective: ShowdownDirective, private _http: HttpClient) {
    }

    public load(): void {
        let {src} = this;

        this._http.get(src, {responseType: 'text'}).subscribe((response: string) => {
            this._showdownDirective.setValue(response, ShowdownDirective.TYPES.SRC);
        });
    }
}