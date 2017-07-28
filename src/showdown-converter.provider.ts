import { Injectable, Optional } from '@angular/core';
import { ConverterOptions } from './base-converter-options.provider';
import { BaseConverter } from './base-converter.class';

/**
 * @example
 * ```javascript
 * import { ShowdownConverter } from 'ngx-showdown';
 * class Some{
 *  constructor(showdownConverter: ShowdownConverter){
 *      console.log(showdownConverter.makeHtml("..."));
 *  }
 * }
 * ```
 */
@Injectable()
export class ShowdownConverter extends BaseConverter {
    constructor(@Optional() options?: ConverterOptions) {
        super(options);
    }
}