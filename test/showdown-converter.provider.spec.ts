import { Directive } from '@angular/core';
import { TestBed, TestBedStatic } from '@angular/core/testing';
import * as Showdown from 'showdown';
import { ConverterOptions } from '../src/base-converter-options.provider';
import { ShowdownConverter } from '../src/showdown-converter.provider';

describe('ShowdownConverter', () => {

    it('should be set multiple options', () => {
        let showdownConverter: ShowdownConverter = new ShowdownConverter();
        showdownConverter.setOptions({ noHeaderId: false, tables: true });
        expect(showdownConverter.getOption('tables')).toBeTruthy();
        expect(showdownConverter.getOptions().noHeaderId).toBeFalsy();
    });

    it('should only own options properties', () => {
        let showdownConverter: ShowdownConverter = new ShowdownConverter();
        let options: Showdown.ShowdownOptions = Object.setPrototypeOf({noHeaderId: true}, {emoji: true});
        showdownConverter.setOptions(options);
        expect(showdownConverter.getOption('noHeaderId')).toBeTruthy();
        expect(showdownConverter.getOption('emoji')).toBeFalsy();
    });

    it('should be inject options provider', () => {
        let fixture: TestBedStatic = TestBed.configureTestingModule({
            providers: [
                {provide: ConverterOptions, useValue: {noHeaderId: true, foo: 'bar'}},
                ShowdownConverter
            ]
        });
        let showdownConverter: ShowdownConverter = fixture.get(ShowdownConverter);

        expect(showdownConverter.getOption('noHeaderId')).toBeTruthy();
        expect(showdownConverter.getOption('foo')).toBe('bar');
        expect(showdownConverter.makeHtml('# abc')).toBe('<h1>abc</h1>');
    });

    it('should extends from `ShowdownConverter` and keep the Angular annotations', () => {
        class Some extends ShowdownConverter {}

        @Directive({selector: 'some'})
        class SomeDirective extends ShowdownConverter {}

        let fixture: TestBedStatic = TestBed.configureTestingModule({
            providers: [
                { provide: ConverterOptions, useValue: { color: 'red' } },
                ShowdownConverter,
                Some,
                SomeDirective
            ]
        });
        let showdownConverter: ShowdownConverter = fixture.get(ShowdownConverter);
        let some: Some = fixture.get(Some);
        let someDirective: SomeDirective = fixture.get(SomeDirective);
        someDirective.setOption('noHeaderId', true);

        expect(showdownConverter.getOption('color')).toBe('red');

        expect(some).not.toBe(showdownConverter);
        expect(some instanceof ShowdownConverter).toBeTruthy();
        expect(some.getOption('color')).toBe('red');
        expect(some.makeHtml('# abc')).toBe('<h1 id="abc">abc</h1>');

        expect(someDirective).not.toBe(showdownConverter);
        expect(someDirective).not.toBe(some);
        expect(someDirective instanceof ShowdownConverter).toBeTruthy();
        expect(someDirective.getOption('color')).toBe('red');
        expect(someDirective.makeHtml('# abc')).toBe('<h1>abc</h1>');
    });

    it('should be converted md to html', () => {
        let fixture: TestBedStatic = TestBed.configureTestingModule({ providers: [ ShowdownConverter ] });
        let showdownConverter: ShowdownConverter = fixture.get(ShowdownConverter);

        expect(showdownConverter.makeHtml('# abc')).toBe('<h1 id="abc">abc</h1>');
    });

});
