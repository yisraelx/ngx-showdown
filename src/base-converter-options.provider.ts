import { Injectable } from '@angular/core';
import $ from './utils';
import { IConverterOptions } from './base-converter.class';

export class ConverterOptions {

    customizedHeaderId: boolean;
    disableForced4SpacesIndentedSublists: boolean;
    encodeEmails: boolean;
    excludeTrailingPunctuationFromURLs: boolean;
    ghCodeBlocks: boolean;
    ghCompatibleHeaderId: boolean;
    ghMentions: boolean;
    ghMentionsLink: string;
    headerLevelStart: number;
    literalMidWordAsterisks: boolean;
    literalMidWordUnderscores: boolean;
    noHeaderId: boolean;
    omitExtraWLInCodeBlocks: boolean;
    openLinksInNewWindow: boolean;
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

    constructor(options?: IConverterOptions) {
        this.merge(options);
    }

    public merge(options: IConverterOptions) {
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
 * import { ConverterOptions, BaseConverterOptions } from 'ngx-showdown';
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
            customizedHeaderId: false,
            disableForced4SpacesIndentedSublists: false,
            encodeEmails: true,
            excludeTrailingPunctuationFromURLs: false,
            extensions: [],
            ghCodeBlocks: true,
            ghCompatibleHeaderId: false,
            ghMentions: false,
            ghMentionsLink: 'https://github.com/{u}',
            headerLevelStart: 1,
            literalMidWordAsterisks: false,
            literalMidWordUnderscores: false,
            noHeaderId: false,
            omitExtraWLInCodeBlocks: false,
            openLinksInNewWindow: false,
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