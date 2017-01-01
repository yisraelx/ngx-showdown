import { TestModuleMetadata, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { MdDirective } from '../src/md.directive';
import { ConverterOptions, BaseConverterOptions } from '../src/base-converter-options.provider';
import $ from './utils';

let mdDirectiveModuleMetadata: TestModuleMetadata = {
    declarations: [MdDirective],
    providers: [
        { provide: ConverterOptions, useClass: BaseConverterOptions },
        { provide: ComponentFixtureAutoDetect, useValue: true }
    ]
};

describe('MdDirective', () => {

    it('should be the mdDirective.type to be equal to MdDirective.TYPES.NONE', () => {
        let fixture = $.createFixture(mdDirectiveModuleMetadata, {
            metadata: { template: '<md></md>' }
        });
        let mdDirective: MdDirective = fixture.debugElement.children[0].injector.get(MdDirective);

        expect(mdDirective.type).toBe(MdDirective.TYPES[MdDirective.TYPES.NONE].toLowerCase());
        expect(mdDirective.status).toBe(MdDirective.STATUSES[MdDirective.STATUSES.INIT].toLowerCase());
    });

    it('should be the mdDirective.type to be equal to MdDirective.TYPES.BINDING', () => {
        let fixture = $.createFixture(mdDirectiveModuleMetadata, {
            metadata: { template: '<md [value]="text"></md>' },
            scope: { text: '# abc' }
        });
        let mdDirective: MdDirective = fixture.debugElement.children[0].injector.get(MdDirective);

        expect(mdDirective.type).toBe(MdDirective.TYPES[MdDirective.TYPES.BINDING].toLowerCase());
        expect(mdDirective.status).toBe(MdDirective.STATUSES[MdDirective.STATUSES.READY].toLowerCase());
    });

    it('should be get set mdDirective.value and alias mdDirective.md', () => {
        let fixture = $.createFixture(mdDirectiveModuleMetadata, {
            metadata: { template: '<md></md>' }
        });
        let mdDirective: MdDirective = fixture.debugElement.children[0].injector.get(MdDirective);

        expect(mdDirective.md).toBe(mdDirective.value);

        mdDirective.value = '# abc';
        expect(mdDirective.value).toBe('# abc');
        expect(mdDirective.md).toBe('# abc');
        expect(mdDirective.md).toBe(mdDirective.value);

        mdDirective.md = '## abc';
        expect(mdDirective.value).toBe('## abc');
        expect(mdDirective.md).toBe('## abc');
        expect(mdDirective.md).toBe(mdDirective.value);
    });

    it('should be replace the on change method', () => {
        let fixture = $.createFixture(mdDirectiveModuleMetadata, {
            metadata: { template: '<md [value]="text"></md>' },
            scope: { text: '# abc' }
        });
        let mdDirective: MdDirective = fixture.debugElement.children[0].injector.get(MdDirective);

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
        mdDirective.registerOnChange(function () {
            this._value = this._value.toUpperCase();
            this.compile();
        });
        (mdDirective as any)._onChange();

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">ABC</h1>');
    });

    it('should be throw error if registerOnChange arg fn is not function', () => {
        let mdDirective: MdDirective = new MdDirective({} as any);
        let execute = () => {
            mdDirective.registerOnChange(void 0);
        };
        expect(execute).toThrow();
    });

    it('should be converted md[value] bind attr to html and set the result to the element content', () => {
        let fixture = $.createFixture(mdDirectiveModuleMetadata, {
            metadata: { template: '<md [value]="text"></md>' },
            scope: { text: '# abc' }
        });

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');

        fixture.debugElement.componentInstance.text = '## abc';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2 id="abc">abc</h2>');
    });

    it('should be converted md[value] bind attr to html and set the result to the element content (whit options)', () => {
        let fixture = $.createFixture(mdDirectiveModuleMetadata, {
            metadata: { template: '<md [value]="text" [options]="options"></md>' },
            scope: { text: '# abc', options: { noHeaderId: true } }
        });
        let mdDirective: MdDirective = fixture.debugElement.children[0].injector.get(MdDirective);

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1>abc</h1>');

        mdDirective.value = '## abc';
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2>abc</h2>');

        mdDirective.noHeaderId = false;
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2 id="abc">abc</h2>');
    });

    it('should be converted md[value] bind attr to html and set the result to the element content (trimEachLine directive)', () => {
        let fixture = $.createFixture(mdDirectiveModuleMetadata, {
            metadata: { template: '<md [value]="text" [trimEachLine]="options.trimEachLine"></md>' },
            scope: { text: ' # a b c ', options: { trimEachLine: 'space' } }
        });
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">a b c</h1>');

        fixture.debugElement.componentInstance.options.trimEachLine = 'tab';
        fixture.debugElement.componentInstance.text = '\t#\ta\tb\tc\t';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">a   b   c</h1>');

    });

    it('should be converted div[md] bind attr to html and set the result to the element content', () => {
        let fixture = $.createFixture(mdDirectiveModuleMetadata, {
            metadata: { template: '<div [md]="text"></div>' },
            scope: { text: '# abc' }
        });

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');

        fixture.debugElement.componentInstance.text = '## abc';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2 id="abc">abc</h2>');
    });

    it('should be the mdDirective.type to be equal to MdDirective.TYPES.CONTENT', () => {
        let fixture = $.createFixture(mdDirectiveModuleMetadata, {
            metadata: { template: '<md># abc</md>' }
        });
        let mdDirective: MdDirective = fixture.debugElement.children[0].injector.get(MdDirective);

        expect(mdDirective.type).toBe(MdDirective.TYPES[MdDirective.TYPES.CONTENT].toLowerCase());
        expect(mdDirective.status).toBe(MdDirective.STATUSES[MdDirective.STATUSES.READY].toLowerCase());
    });

    it('should be converted element md content to html and set the result to the element content', () => {
        let fixture = $.createFixture(mdDirectiveModuleMetadata, {
            metadata: { template: '<md># abc</md>' }
        });

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
    });

    it('should be converted element md content to html and set the result to the element content (whit options)', () => {
        let fixture = $.createFixture(mdDirectiveModuleMetadata, {
            metadata: { template: '<md [options]="{noHeaderId:true}"># abc</md>' }
        });

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1>abc</h1>');
    });

    it('should be set get options', () => {
        let fixture = $.createFixture(mdDirectiveModuleMetadata, {
            metadata: { template: '<md noHeaderId trimEachLine="space" [options]="options"></md>' },
            scope: { options: { tables: true } }
        });
        let mdDirective: MdDirective = fixture.debugElement.children[0].injector.get(MdDirective);

        expect(mdDirective.options.noHeaderId).toBeTruthy();
        expect(mdDirective.noHeaderId).toBeTruthy();
        expect(mdDirective.options.trimEachLine).toBe('space');
        expect(mdDirective.trimEachLine).toBe('space');
        expect(mdDirective.options.tables).toBeTruthy();
        expect(mdDirective.tables).toBeTruthy();
    });

});