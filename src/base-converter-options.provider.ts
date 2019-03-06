import { Injectable } from '@angular/core';
import $ from './utils';
import { IConverterOptions } from './base-converter.class';

// options getter setter dynamic definition (the code after the class)
export interface ConverterOptions extends IConverterOptions {
}

export class ConverterOptions implements IConverterOptions{

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
            backslashEscapesHTMLTags: false,
            completeHTMLDocument: false,
            customizedHeaderId: false,
            disableForced4SpacesIndentedSublists: false,
            emoji: false,
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
            metadata: false,
            noHeaderId: false,
            omitExtraWLInCodeBlocks: false,
            openLinksInNewWindow: false,
            parseImgDimensions: false,
            prefixHeaderId: false,
            rawHeaderId: false,
            rawPrefixHeaderId: false,
            requireSpaceBeforeHeadingText: false,
            simpleLineBreaks: false,
            simplifiedAutoLink: false,
            smartIndentationFix: false,
            smoothLivePreview: false,
            strikethrough: false,
            tables: false,
            tablesHeaderId: false,
            tasklists: false,
            underline: false
        });
    }
}
