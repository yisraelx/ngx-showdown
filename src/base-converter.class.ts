import * as Showdown from 'showdown';
import $ from './utils';

export class BaseConverter extends Showdown.Converter {

    constructor(options?: Showdown.ConverterOptions) {
        super(options);
    }

    public setOptions(options: Showdown.ShowdownOptions): void {
        if ($.isObject(options)) {
            $.forIn(options, (value: any, optionKey: string) => {
                this.setOption(optionKey, value);
            });
        }
    }

}
