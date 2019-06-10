import { Optional } from '@angular/core';
import * as Showdown from 'showdown';
import { ShowdownConfig } from './showdown-config.provider';

let { hasOwnProperty } = {};

/**
 * @example
 * Setup as standalone
 * ```typescript
 * import { NgModule } from '@angular/core';
 * import { ShowdownConverter } from 'ngx-showdown';
 *
 * @NgModule({
 *     providers: [ ShowdownConverter ];
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
 *     constructor(showdownConverter: ShowdownConverter) {
 *         let markdown: string = "**Some**";
 *         let html: string = showdownConverter.makeHtml(markdown);
 *         console.log(`some:\nmarkdown: ${markdown)\nhtml: ${html}\n`);
 *     }
 * }
 * ```
 */
export class ShowdownConverter extends Showdown.Converter {

    constructor(@Optional() config?: ShowdownConfig) {
        super(config && {extensions: config.extensions});
        this.setFlavor((config && config.flavor) || 'vanilla');
        this.setOptions(config);
    }

     public setOptions(options: Showdown.ShowdownOptions): void {
        for (let key in options) {
            if (hasOwnProperty.call(options, key)) {
                this.setOption(key, options[key]);
            }
        }
    }

}
