import { PipeTransform, Pipe, Optional } from '@angular/core';
import { ConverterOptions } from './base-converter-options.provider';
import { BaseConverter, IConverterOptions } from './base-converter.class';

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
@Pipe({
    name: 'md',
    pure: false
})
export class MdPipe extends BaseConverter implements PipeTransform {

    constructor(@Optional() options: ConverterOptions) {
        super(options);
    }

    transform(md: string = '', options?: IConverterOptions): string {
        this.setOptions(options);
        return this.makeHtml(md);
    }
}