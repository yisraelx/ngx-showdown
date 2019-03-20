import { ConverterOptions } from '../base-converter-options.provider';

describe('BaseConverterOptions', () => {

    it('should be set options', () => {
        let converterOptions = new ConverterOptions();
        converterOptions.merge({ noHeaderId: false, tables: true });

        expect(converterOptions.tables).toBeTruthy();
        expect(converterOptions.noHeaderId).toBeFalsy();
    });

});
