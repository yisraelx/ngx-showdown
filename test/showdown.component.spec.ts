import { TestModuleMetadata, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ShowdownComponent } from '../src/showdown.component';
import { ConverterOptions, BaseConverterOptions } from '../src/base-converter-options.provider';
import $ from './utils';

let showdownComponentModuleMetadata: TestModuleMetadata = {
    declarations: [ShowdownComponent],
    providers: [
        { provide: ConverterOptions, useClass: BaseConverterOptions },
        { provide: ComponentFixtureAutoDetect, useValue: true }
    ]
};

describe('ShowdownComponent', () => {

    it('should not render if `value` is not empty ', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown></showdown>' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBeUndefined();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('');

        showdownComponent.render();
        expect(showdownComponent.value).toBeUndefined();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('');
    });

    it('should render bind data of `value` with empty string', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
          metadata: { template: '<showdown [value]="text"></showdown>' },
          scope: { text: '# Hello' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBe('# Hello');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="hello">Hello</h1>');

        fixture.debugElement.componentInstance.text = '';
        fixture.detectChanges();

        expect(showdownComponent.value).toBe('');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('');
    });

    it('should render by `render` method `value` with empty string', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
          metadata: { template: '<showdown ># Hello</showdown>' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBe('# Hello');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="hello">Hello</h1>');

        showdownComponent.render('');
        expect(showdownComponent.value).toBe('');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('');
    });

    it('should convert the bind data of `value` property and set to the element content', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown [value]="text"></showdown>' },
            scope: { text: '# abc' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBe('# abc');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
    });

    it('should be set input of showdownComponent#showdown to showdownComponent#value', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<div [showdown]="text"></div>'},
            scope: { text: '# abc' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBe('# abc');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');

        fixture.debugElement.componentInstance.text = '**123**';
        fixture.detectChanges();

        expect(showdownComponent.value).toBe('**123**');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<p><strong>123</strong></p>');

        showdownComponent.showdown = '## ABC';
        showdownComponent.render();

        expect(showdownComponent.value).toBe('## ABC');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2 id="abc">ABC</h2>');
    });

    it('should be converted showdown[value] bind attr to html and set the result to the element content', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown [value]="text"></showdown>' },
            scope: { text: '# abc' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);


        expect(showdownComponent.value).toBe('# abc');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');

        fixture.debugElement.componentInstance.text = '## abc';
        fixture.detectChanges();

        expect(showdownComponent.value).toBe('## abc');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2 id="abc">abc</h2>');
    });

    it('should be converted showdown[value] bind attr to html and set the result to the element content (whit options)', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown [value]="text" [options]="options"></showdown>' },
            scope: { text: '# abc', options: { noHeaderId: true } }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBe('# abc');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1>abc</h1>');

        fixture.debugElement.componentInstance.text = '## abc';
        fixture.detectChanges();

        expect(showdownComponent.value).toBe('## abc');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2>abc</h2>');

        fixture.debugElement.componentInstance.options = {noHeaderId: false};
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2 id="abc">abc</h2>');
    });

    it('should be converted showdown[value] bind attr to html and set the result to the element content', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: {template: '<showdown [value]="text" [smartIndentationFix]="options.smartIndentationFix"></showdown>'},
            scope: {text: ' # a b c ', options: {smartIndentationFix: true}}
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBe(' # a b c ');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">a b c</h1>');

        fixture.debugElement.componentInstance.text = '\t#\ta\tb\tc\t';
        fixture.detectChanges();

        expect(showdownComponent.value).toBe('\t#\ta\tb\tc\t');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">a   b   c</h1>');

        fixture.debugElement.componentInstance.options.smartIndentationFix = false;
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe(`<pre><code>#   a   b   c   \n</code></pre>`);
    });

    it('should be converted div[showdown] bind attr to html and set the result to the element content', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<div [showdown]="text"></div>' },
            scope: { text: '# abc' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
        expect(showdownComponent.value).toBe('# abc');

        fixture.debugElement.componentInstance.text = '## abc';
        fixture.detectChanges();

        expect(showdownComponent.value).toBe('## abc');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2 id="abc">abc</h2>');
    });

    it('should be converted element md content to html and set the result to the element content', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown># abc</showdown>' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBe('# abc');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
    });

    it('should be converted element md content to html and set the result to the element content (whit options)', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown [options]="{noHeaderId:true}"># abc</showdown>' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBe('# abc');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1>abc</h1>');
    });

    it('should be set get options', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: {template: '<showdown noHeaderId [smartIndentationFix]="true" [options]="options"></showdown>'},
            scope: {options: {tables: true}}
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.options.noHeaderId).toBeTruthy();
        expect(showdownComponent.getOption('noHeaderId')).toBeTruthy();
        expect(showdownComponent.options.smartIndentationFix).toBeTruthy();
        expect(showdownComponent.getOption('smartIndentationFix')).toBeTruthy();
        expect(showdownComponent.options.tables).toBeTruthy();
        expect(showdownComponent.getOption('tables')).toBeTruthy();
    });

    it('should render by `render` method markdown value and override the current component `value` ', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
          metadata: {template: '<showdown># some</showdown>'}
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBe('# some');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="some">some</h1>');

        showdownComponent.render('**other**');

        expect(showdownComponent.value).toBe('**other**');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<p><strong>other</strong></p>');
    });

    it('should set empty option attr to true', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: {template: '<showdown noHeaderId># abc</showdown>'}
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.getOption('noHeaderId')).toBeTruthy();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1>abc</h1>');
    });

    it('should bind options object value', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: {template: '<showdown [options]="{noHeaderId: noHeaderId, smartIndentationFix: true}"> # abc</showdown>'},
            scope: {noHeaderId: true}
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.getOption('noHeaderId')).toBeTruthy();
        expect(showdownComponent.getOption('smartIndentationFix')).toBeTruthy();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1>abc</h1>');

        fixture.debugElement.componentInstance.noHeaderId = false;
        fixture.detectChanges();

        expect(showdownComponent.getOption('noHeaderId')).toBeFalsy();
        expect(showdownComponent.getOption('smartIndentationFix')).toBeTruthy();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
    });
});
