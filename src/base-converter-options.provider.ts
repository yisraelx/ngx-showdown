import { Injectable } from '@angular/core';
import $ from './utils';
import { IConverterConstructorOptions } from './base-converter.class';

export class ConverterOptions {

    omitExtraWLInCodeBlocks: boolean;
    noHeaderId: boolean;
    prefixHeaderId: string | boolean;
    parseImgDimensions: boolean;
    headerLevelStart: number;
    literalMidWordUnderscores: boolean;
    strikethrough: boolean;
    tables: boolean;
    tablesHeaderId: boolean;
    ghCodeBlocks: boolean;
    tasklists: boolean;
    smoothLivePreview: boolean;
    trimEachLine: boolean | 'space' | 'tab';
    extensions: string | string[];

    constructor(options?: IConverterConstructorOptions) {
        this.merge(options);
    }

    public merge(options: IConverterConstructorOptions) {
        if (!$.isObject(options)) return;
        $.forIn(options, (val, key) => {
            this[key] = val;
        });
    }
}

/**
 * @example
 * ```javascript
 * import { NgModel } from '@angular/core';
 * import { ConverterOptions, BaseConverterOptions } from 'ng2-md';
 * export class MyConverterOptions extends ConverterOptions{
 *  constructor(){
 *      super({...});
 *  }
 * }
 * @NgModel({
 *  providers:[
 *      {provide: ConverterOptions, useClass: MyConverterOptions},
 *  ]
 * })
 * export class AppModule{}
 * ```
 */
@Injectable()
export class BaseConverterOptions extends ConverterOptions {
    constructor() {
        super({
            omitExtraWLInCodeBlocks: false,
            noHeaderId: false,
            prefixHeaderId: false,
            parseImgDimensions: false,
            headerLevelStart: 1,
            literalMidWordUnderscores: false,
            strikethrough: false,
            tables: false,
            tablesHeaderId: false,
            ghCodeBlocks: true,
            tasklists: false,
            smoothLivePreview: false,
            trimEachLine: false
        });
    }
}