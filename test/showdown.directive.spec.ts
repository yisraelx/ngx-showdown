import { TestModuleMetadata, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ShowdownDirective } from '../src/showdown.directive';
import { ConverterOptions, BaseConverterOptions } from '../src/base-converter-options.provider';
import $ from './utils';

let showdownDirectiveModuleMetadata: TestModuleMetadata = {
    declarations: [ShowdownDirective],
    providers: [
        { provide: ConverterOptions, useClass: BaseConverterOptions },
        { provide: ComponentFixtureAutoDetect, useValue: true }
    ]
};

describe('ShowdownDirective', () => {

    it('should be the showdownDirective.type to be equal to ShowdownDirective.TYPES.NONE', () => {
        let fixture = $.createFixture(showdownDirectiveModuleMetadata, {
            metadata: { template: '<showdown></showdown>' }
        });
        let showdownDirective: ShowdownDirective = fixture.debugElement.children[0].injector.get(ShowdownDirective);

        expect(showdownDirective.type).toBe(ShowdownDirective.TYPES[ShowdownDirective.TYPES.NONE].toLowerCase());
        expect(showdownDirective.status).toBe(ShowdownDirective.STATUSES[ShowdownDirective.STATUSES.INIT].toLowerCase());
    });

    it('should be the showdownDirective.type to be equal to ShowdownDirective.TYPES.BINDING', () => {
        let fixture = $.createFixture(showdownDirectiveModuleMetadata, {
            metadata: { template: '<showdown [value]="text"></showdown>' },
            scope: { text: '# abc' }
        });
        let showdownDirective: ShowdownDirective = fixture.debugElement.children[0].injector.get(ShowdownDirective);

        expect(showdownDirective.type).toBe(ShowdownDirective.TYPES[ShowdownDirective.TYPES.BINDING].toLowerCase());
        expect(showdownDirective.status).toBe(ShowdownDirective.STATUSES[ShowdownDirective.STATUSES.READY].toLowerCase());
    });

    it('should be get set showdownDirective.value and alias showdownDirective.showdown', () => {
        let fixture = $.createFixture(showdownDirectiveModuleMetadata, {
            metadata: { template: '<showdown></showdown>' }
        });
        let showdownDirective: ShowdownDirective = fixture.debugElement.children[0].injector.get(ShowdownDirective);

        expect(showdownDirective.showdown).toBe(showdownDirective.value);

        showdownDirective.value = '# abc';
        expect(showdownDirective.value).toBe('# abc');
        expect(showdownDirective.showdown).toBe('# abc');
        expect(showdownDirective.showdown).toBe(showdownDirective.value);

        showdownDirective.showdown = '## abc';
        expect(showdownDirective.value).toBe('## abc');
        expect(showdownDirective.showdown).toBe('## abc');
        expect(showdownDirective.showdown).toBe(showdownDirective.value);
    });

    it('should be replace the on change method', () => {
        let fixture = $.createFixture(showdownDirectiveModuleMetadata, {
            metadata: { template: '<showdown [value]="text"></showdown>' },
            scope: { text: '# abc' }
        });
        let showdownDirective: ShowdownDirective = fixture.debugElement.children[0].injector.get(ShowdownDirective);

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
        showdownDirective.registerOnChange(function () {
            this._value = this._value.toUpperCase();
            this.compile();
        });
        (showdownDirective as any)._onChange();

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">ABC</h1>');
    });

    it('should be throw error if registerOnChange arg fn is not function', () => {
        let showdownDirective: ShowdownDirective = new ShowdownDirective({} as any);
        let execute = () => {
            showdownDirective.registerOnChange(void 0);
        };
        expect(execute).toThrow();
    });

    it('should be converted showdown[value] bind attr to html and set the result to the element content', () => {
        let fixture = $.createFixture(showdownDirectiveModuleMetadata, {
            metadata: { template: '<showdown [value]="text"></showdown>' },
            scope: { text: '# abc' }
        });

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');

        fixture.debugElement.componentInstance.text = '## abc';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2 id="abc">abc</h2>');
    });

    it('should be converted showdown[value] bind attr to html and set the result to the element content (whit options)', () => {
        let fixture = $.createFixture(showdownDirectiveModuleMetadata, {
            metadata: { template: '<showdown [value]="text" [options]="options"></showdown>' },
            scope: { text: '# abc', options: { noHeaderId: true } }
        });
        let showdownDirective: ShowdownDirective = fixture.debugElement.children[0].injector.get(ShowdownDirective);

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1>abc</h1>');

        showdownDirective.value = '## abc';
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2>abc</h2>');

        showdownDirective.noHeaderId = false;
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2 id="abc">abc</h2>');
    });

    it('should be converted showdown[value] bind attr to html and set the result to the element content (trimEachLine directive)', () => {
        let fixture = $.createFixture(showdownDirectiveModuleMetadata, {
            metadata: { template: '<showdown [value]="text" [trimEachLine]="options.trimEachLine"></showdown>' },
            scope: { text: ' # a b c ', options: { trimEachLine: 'space' } }
        });
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">a b c</h1>');

        fixture.debugElement.componentInstance.options.trimEachLine = 'tab';
        fixture.debugElement.componentInstance.text = '\t#\ta\tb\tc\t';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">a   b   c</h1>');

    });

    it('should be converted div[showdown] bind attr to html and set the result to the element content', () => {
        let fixture = $.createFixture(showdownDirectiveModuleMetadata, {
            metadata: { template: '<div [showdown]="text"></div>' },
            scope: { text: '# abc' }
        });

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');

        fixture.debugElement.componentInstance.text = '## abc';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2 id="abc">abc</h2>');
    });

    it('should be the showdownDirective.type to be equal to ShowdownDirective.TYPES.CONTENT', () => {
        let fixture = $.createFixture(showdownDirectiveModuleMetadata, {
            metadata: { template: '<showdown># abc</showdown>' }
        });
        let showdownDirective: ShowdownDirective = fixture.debugElement.children[0].injector.get(ShowdownDirective);

        expect(showdownDirective.type).toBe(ShowdownDirective.TYPES[ShowdownDirective.TYPES.CONTENT].toLowerCase());
        expect(showdownDirective.status).toBe(ShowdownDirective.STATUSES[ShowdownDirective.STATUSES.READY].toLowerCase());
    });

    it('should be converted element md content to html and set the result to the element content', () => {
        let fixture = $.createFixture(showdownDirectiveModuleMetadata, {
            metadata: { template: '<showdown># abc</showdown>' }
        });

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
    });

    it('should be converted element md content to html and set the result to the element content (whit options)', () => {
        let fixture = $.createFixture(showdownDirectiveModuleMetadata, {
            metadata: { template: '<showdown [options]="{noHeaderId:true}"># abc</showdown>' }
        });

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1>abc</h1>');
    });

    it('should be set get options', () => {
        let fixture = $.createFixture(showdownDirectiveModuleMetadata, {
            metadata: { template: '<showdown noHeaderId trimEachLine="space" [options]="options"></showdown>' },
            scope: { options: { tables: true } }
        });
        let showdownDirective: ShowdownDirective = fixture.debugElement.children[0].injector.get(ShowdownDirective);

        expect(showdownDirective.options.noHeaderId).toBeTruthy();
        expect(showdownDirective.noHeaderId).toBeTruthy();
        expect(showdownDirective.options.trimEachLine).toBe('space');
        expect(showdownDirective.trimEachLine).toBe('space');
        expect(showdownDirective.options.tables).toBeTruthy();
        expect(showdownDirective.tables).toBeTruthy();
    });

});