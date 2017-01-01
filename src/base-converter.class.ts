import { Converter } from 'showdown';
import $ from './utils';
import { ConverterOptions } from './base-converter-options.provider';

export interface IConverterOptions {
    omitExtraWLInCodeBlocks?: boolean;
    noHeaderId?: boolean;
    prefixHeaderId?: string | boolean;
    parseImgDimensions?: boolean;
    headerLevelStart?: number;
    literalMidWordUnderscores?: boolean;
    strikethrough?: boolean;
    tables?: boolean;
    tablesHeaderId?: boolean;
    ghCodeBlocks?: boolean;
    tasklists?: boolean;
    smoothLivePreview?: boolean;
    trimEachLine?: boolean | 'tab' | 'space';
}

export interface IConverterConstructorOptions extends IConverterOptions {
    extensions?: string | string[];
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