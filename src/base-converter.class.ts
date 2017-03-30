import { Converter } from 'showdown';
import $ from './utils';
import { ConverterOptions } from './base-converter-options.provider';

export interface IConverterOptions {
    disableForced4SpacesIndentedSublists?: boolean;
    encodeEmails?: boolean;
    excludeTrailingPunctuationFromURLs?: boolean;
    ghCodeBlocks?: boolean;
    ghCompatibleHeaderId?: boolean;
    ghMentions?: boolean;
    ghMentionsLink?: string;
    headerLevelStart?: number;
    literalMidWordUnderscores?: boolean;
    noHeaderId?: boolean;
    omitExtraWLInCodeBlocks?: boolean;
    parseImgDimensions?: boolean;
    prefixHeaderId?: string | boolean;
    requireSpaceBeforeHeadingText?: boolean;
    simpleLineBreaks?: boolean;
    simplifiedAutoLink?: boolean;
    smartIndentationFix?: boolean;
    smoothLivePreview?: boolean;
    strikethrough?: boolean;
    tables?: boolean;
    tablesHeaderId?: boolean;
    tasklists?: boolean;
    trimEachLine?: boolean | 'tab' | 'space';
}

export interface IConverterConstructorOptions extends IConverterOptions {
    extensions?: string[];
}

export class BaseConverter extends Converter {

    constructor(options?: IConverterConstructorOptions | ConverterOptions) {
        super(options);
        // override makeHtml method (define in super constructor)
        let {makeHtml} = this;
        this.makeHtml = (text: string): string => {
            text = this._preMakeHtml(text);
            return makeHtml.call(this, text);
        };
    }

    public setOptions(options: IConverterOptions): void {
        if ($.isObject(options)) {
            $.forIn(options, (value: any, optionKey: string) => {
                this.setOption(optionKey, value);
            });
        }
    }

    /** pre super.makeHtml (situation that not possible to achieve it with subParsers or extensions) */
    private _preMakeHtml(text: string): string {
        let {trimEachLine} = this.getOptions() as IConverterOptions;
        text = $.trimEachLine(text, trimEachLine);
        return text;
    }
}