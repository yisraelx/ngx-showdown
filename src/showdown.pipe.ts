import { PipeTransform, Pipe, Optional } from '@angular/core';
import { ConverterOptions } from './base-converter-options.provider';
import { BaseConverter, IConverterOptionsChangeable } from './base-converter.class';

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
@Pipe({
    name: 'showdown',
    pure: false
})
export class ShowdownPipe extends BaseConverter implements PipeTransform {

    constructor(@Optional() options: ConverterOptions) {
        super(options);
    }

    transform(md: string = '', options?: IConverterOptionsChangeable): string {
        this.setOptions(options);
        return this.makeHtml(md);
    }
}