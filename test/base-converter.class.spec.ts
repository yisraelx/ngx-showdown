import { BaseConverter } from '../src/base-converter.class';

describe('BaseConverter', () => {

    it('should be set mulitple options', () => {
        let baseConverter = new BaseConverter();
        baseConverter.setOptions({ noHeaderId: false, tables: true });
        expect(baseConverter.getOption('tables')).toBeTruthy();
        expect(baseConverter.getOptions().noHeaderId).toBeFalsy();
    });

});