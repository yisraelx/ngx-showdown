import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { ConverterOptions, BaseConverterOptions } from '../src/base-converter-options.provider';
import { ShowdownConverter } from '../src/showdown-converter.provider';

let showdownProviderModuleMetadata: TestModuleMetadata = {
    providers: [
        {provide: ConverterOptions, useClass: BaseConverterOptions},
        ShowdownConverter
    ]
};

describe('ShowdownConverter', () => {

    it('should be converted md to html', () => {
        let fixture = TestBed.configureTestingModule(showdownProviderModuleMetadata);
        let showdownConverter: ShowdownConverter = fixture.get(ShowdownConverter);

        expect(showdownConverter.makeHtml('# abc')).toBe('<h1 id="abc">abc</h1>');
    });

});