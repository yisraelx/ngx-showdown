import { Injectable, Optional } from '@angular/core';
import { ConverterOptions } from './base-converter-options.provider';
import { BaseConverter } from './base-converter.class';

/**
 * @example
 * ```javascript
 * import { MdConverter } from 'ng2-md';
 * class Some{
 *  constructor(mdConverter: MdConverter){
 *      console.log(mdConverter.makeHtml("..."));
 *  }
 * }
 * ```
 */
@Injectable()
export class MdConverter extends BaseConverter {
    constructor(@Optional() options?: ConverterOptions) {
        super(options);
    }
}