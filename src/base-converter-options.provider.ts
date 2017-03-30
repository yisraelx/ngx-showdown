import { Injectable } from '@angular/core';
import $ from './utils';
import { IConverterConstructorOptions } from './base-converter.class';

export class ConverterOptions {

    disableForced4SpacesIndentedSublists: boolean;
    encodeEmails: boolean;
    excludeTrailingPunctuationFromURLs: boolean;
    extensions: string[];
    ghCodeBlocks: boolean;
    ghCompatibleHeaderId: boolean;
    ghMentions: boolean;
    ghMentionsLink: string;
    headerLevelStart: number;
    literalMidWordUnderscores: boolean;
    noHeaderId: boolean;
    omitExtraWLInCodeBlocks: boolean;
    parseImgDimensions: boolean;
    prefixHeaderId: string | boolean;
    requireSpaceBeforeHeadingText: boolean;
    simpleLineBreaks: boolean;
    simplifiedAutoLink: boolean;
    smartIndentationFix: boolean;
    smoothLivePreview: boolean;
    strikethrough: boolean;
    tables: boolean;
    tablesHeaderId: boolean;
    tasklists: boolean;
    trimEachLine?: boolean | 'tab' | 'space';

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
            disableForced4SpacesIndentedSublists: false,
            encodeEmails: true,
            excludeTrailingPunctuationFromURLs: false,
            extensions: [],
            ghCodeBlocks: true,
            ghCompatibleHeaderId: false,
            ghMentions: false,
            ghMentionsLink: 'https://github.com/{u}',
            headerLevelStart: 1,
            literalMidWordUnderscores: false,
            noHeaderId: false,
            omitExtraWLInCodeBlocks: false,
            parseImgDimensions: false,
            prefixHeaderId: false,
            requireSpaceBeforeHeadingText: false,
            simpleLineBreaks: false,
            simplifiedAutoLink: false,
            smartIndentationFix: false,
            smoothLivePreview: false,
            strikethrough: false,
            tables: false,
            tablesHeaderId: false,
            tasklists: false,
            trimEachLine: false
        });
    }
}