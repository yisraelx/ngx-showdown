import { TestModuleMetadata, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ConverterOptions, BaseConverterOptions } from '../src/base-converter-options.provider';
import { ShowdownPipe } from '../src/showdown.pipe';
import $ from './utils';

let showdownPipeModuleMetadata: TestModuleMetadata = {
    declarations: [ShowdownPipe],
    providers: [
        {provide: ConverterOptions, useClass: BaseConverterOptions},
        {provide: ComponentFixtureAutoDetect, useValue: true}
    ]
};

describe('ShowdownPipe', () => {

    it('should transforms "# abc" to "<h1 id="abc">abc</h1>"', () => {
        let pipe = new ShowdownPipe({} as any);

        expect(pipe.transform('# abc')).toBe('<h1 id="abc">abc</h1>');
    });

    it('should transforms "# abc" to "<h1>abc</h1>"', () => {
        let pipe = new ShowdownPipe({} as any);

        expect(pipe.transform('# abc', {noHeaderId: true})).toBe('<h1>abc</h1>');
    });

    it('should transforms " # a b c " to "<h1 id="abc">a b c</h1>"', () => {
        let pipe = new ShowdownPipe({} as any);

        expect(pipe.transform(' # a b c ', {trimEachLine: 'space'})).toBe('<h1 id="abc">a b c</h1>');
    });

    it('should transforms "\t#\ta\tb\tc\t" to "<h1 id="abc">a   b   c</h1>"', () => {
        let pipe = new ShowdownPipe({trimEachLine: 'tab'} as any);

        expect(pipe.transform('\t#\ta\tb\tc\t')).toBe('<h1 id="abc">a   b   c</h1>');
    });

    it('should be converted from md to html after it passes through the pipe', () => {
        let fixture = $.createFixture(showdownPipeModuleMetadata, {
            metadata: {template: '{{ text | showdown }}'},
            scope: {text: '# abc'}
        });

        expect(fixture.debugElement.nativeElement.innerHTML).toBe('&lt;h1 id="abc"&gt;abc&lt;/h1&gt;');
    });

    it('should be converted from md to html after it passes through the pipe ', () => {
        let fixture = $.createFixture(showdownPipeModuleMetadata, {
            metadata: {template: '{{ text | showdown:options}}'},
            scope: {text: '\t# abc\t', options: {trimEachLine: 'tab'}}
        });

        expect(fixture.debugElement.nativeElement.innerHTML).toBe('&lt;h1 id="abc"&gt;abc&lt;/h1&gt;');
    });

});
