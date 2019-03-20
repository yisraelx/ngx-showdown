import { PipeTransform, Pipe, Optional } from '@angular/core';
import * as Showdown from 'showdown';
import { ConverterOptions } from './base-converter-options.provider';
import { BaseConverter } from './base-converter.class';

/**
 * A angular markdown pipe
 *
 * @example
 * Setup as standalone
 * ```typescript
 * import { NgModule } from '@angular/core';
 * import { ShowdownPipe } from 'ngx-showdown';
 *
 * @NgModule({
 *    declarations: [ ShowdownPipe ];
 * })
 * export class AppModule{}
 * ```
 * Pipe string to showdown pipe
 * ```
 * <input type="text" placeholder="Name"(change)="msg = '**Hello $name!**'.replace('$name', $event.target.value)" />
 * <div innerHTML="{{msg | showdown}}">
 * ```
 *
 * Pipe `text` property to showdown pipe with `options`
 * ```typescript
 * import * as Showdown from 'showdown';
 *
 * @Component({
 *     selector: 'some',
 *     template: `<div innerHTML="{{ text | showdown: options }}"></div>`
 * })
 * export class SomeComponent {
 *    text: string = "__Some Underline__";
 *    options: Showdown.ShowdownOptions = { underline: true };
 * // ...
 * }
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

    transform(md: string = '', options?: Showdown.ShowdownOptions): string {
        this.setOptions(options);
        return this.makeHtml(md);
    }
}
