import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { ConverterOptions, BaseConverterOptions } from '../src/base-converter-options.provider';
import { MdConverter } from '../src/md-converter.provider';

let mdProviderModuleMetadata: TestModuleMetadata = {
    providers: [
        {provide: ConverterOptions, useClass: BaseConverterOptions},
        MdConverter
    ]
};

describe('MdConverter', () => {

    it('should be converted md to html', () => {
        let fixture = TestBed.configureTestingModule(mdProviderModuleMetadata);
        let mdConverter: MdConverter = fixture.get(MdConverter);

        expect(mdConverter.makeHtml('# abc')).toBe('<h1 id="abc">abc</h1>');
    });

});