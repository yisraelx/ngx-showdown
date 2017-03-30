import { Directive, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MdDirective } from './md.directive';

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
 * <md src="README.md" [options]="{...} as IConverterOptionsChangeable"><md/>
 * ```
 * ```html
 * <div md src="README.md"><div/>
 * ```
 */
@Directive({
    selector: 'md[src],[md][src]'
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

    constructor(private _mdDirective: MdDirective, private _http: Http) {
    }

    public load(): void {
        let {src} = this;
        this._http.get(src).subscribe((res: Response) => {
            let value = res.text();
            this._mdDirective.setValue(value, MdDirective.TYPES.SRC);
        });
    }
}