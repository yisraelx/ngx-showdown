import { Converter } from 'showdown';
import $ from './utils';
import { ConverterOptions } from './base-converter-options.provider';

export interface IConverterOptionsChangeable {
    customizedHeaderId?: boolean;
    backslashEscapesHTMLTags?: boolean;
    completeHTMLDocument?: boolean;
    disableForced4SpacesIndentedSublists?: boolean;
    emoji?: boolean;
    encodeEmails?: boolean;
    excludeTrailingPunctuationFromURLs?: boolean;
    ghCodeBlocks?: boolean;
    ghCompatibleHeaderId?: boolean;
    ghMentions?: boolean;
    ghMentionsLink?: string;
    headerLevelStart?: number;
    literalMidWordAsterisks?: boolean;
    literalMidWordUnderscores?: boolean;
    metadata?: boolean;
    noHeaderId?: boolean;
    omitExtraWLInCodeBlocks?: boolean;
    openLinksInNewWindow?: boolean;
    parseImgDimensions?: boolean;
    prefixHeaderId?: string | boolean;
    rawHeaderId?: boolean;
    rawPrefixHeaderId?: boolean;
    requireSpaceBeforeHeadingText?: boolean;
    simpleLineBreaks?: boolean;
    simplifiedAutoLink?: boolean;
    smartIndentationFix?: boolean;
    smoothLivePreview?: boolean;
    strikethrough?: boolean;
    tables?: boolean;
    tablesHeaderId?: boolean;
    tasklists?: boolean;
    underline?: boolean;
}

export interface IConverterOptions extends IConverterOptionsChangeable {
    extensions?: string[];
}

export class BaseConverter extends Converter {

    constructor(options?: IConverterOptions | ConverterOptions) {
        super(options);
    }

    public setOptions(options: IConverterOptionsChangeable): void {
        if ($.isObject(options)) {
            $.forIn(options, (value: any, optionKey: string) => {
                this.setOption(optionKey, value);
            });
        }
    }

}
