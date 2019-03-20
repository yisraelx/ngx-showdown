import { Optional } from '@angular/core';
import * as Showdown from 'showdown';
import { ConverterOptions } from './base-converter-options.provider';

let { hasOwnProperty } = {};

/**
 * @example
 * Setup as standalone
 * ```typescript
 * import { NgModule } from '@angular/core';
 * import { ShowdownConverter } from 'ngx-showdown';
 *
 * @NgModule({
 *     declarations: [ ShowdownConverter ];
 * })
 * export class AppModule {}
 * ```
 *
 * Use the converter instance.
 * ```typescript
 * import { Injectable } from '@angular/core';
 * import { ShowdownConverter } from 'ngx-showdown';
 *
 * @Injectable()
 * export class SomeService {
 *    constructor(showdownConverter: ShowdownConverter) {
 *        let markdown: string = "**Some**";
 *        let html: string = showdownConverter.makeHtml(markdown);
 *        console.log(`some:\nmarkdown: ${markdown)\nhtml: ${html}\n`);
 *    }
 * }
 * ```
 */
export class ShowdownConverter extends Showdown.Converter {

    constructor(@Optional() options?: ConverterOptions) {
        super(options);
    }

     public setOptions(options: Showdown.ShowdownOptions): void {
        for (let key in options) {
            if (hasOwnProperty.call(options, key)) {
              this.setOption(key, options[key]);
            }
        }
    }
}
