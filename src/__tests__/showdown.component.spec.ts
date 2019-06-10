import { TestModuleMetadata, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ShowdownComponent } from '../showdown.component';
import { ShowdownConfig } from '../showdown-config.provider';
import { createComponentFixture } from './helpers';

let showdownComponentModuleMetadata: TestModuleMetadata = {
    declarations: [ShowdownComponent],
    providers: [
        { provide: ShowdownConfig, useValue: {color: 'green'} },
        { provide: ComponentFixtureAutoDetect, useValue: true }
    ]
};

describe('ShowdownComponent', () => {

    it('should create component and override root config', () => {
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
            metadata: {
                template: '<showdown></showdown>',
                providers: [ { provide: ShowdownConfig, useValue: {foo: 'bar', flavor: 'ghost'} } ]
            }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent instanceof ShowdownComponent).toBeTruthy();
        expect(showdownComponent.getFlavor()).toBe('ghost');
        expect(showdownComponent.getOption('foo')).toBe('bar');
        expect(showdownComponent.getOption('color')).toBeUndefined();
    });

    it('should not render if the component `value` property is empty ', () => {
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown></showdown>' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBeUndefined();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('');

        showdownComponent.render();
        expect(showdownComponent.value).toBeUndefined();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('');
    });

    it('should render empty value that bind to `[value]` property', () => {
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
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
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
          metadata: { template: '<showdown ># Hello</showdown>' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBe('# Hello');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="hello">Hello</h1>');

        showdownComponent.render('');
        expect(showdownComponent.value).toBe('');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('');
    });

    it('should render markdown value that bind from `[value]` property', () => {
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown [value]="text"></showdown>' },
            scope: { text: '# abc' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBe('# abc');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
    });

    it('should be set markdown value that bind from `[showdown]` property to component `value` property', () => {
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
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

    it('should render changes markdown value that bind from `[value]` property', () => {
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
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

  it('should render markdown value that bind from `[value]` property (with `options` object)', () => {
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
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

    it('should render markdown value that bind from `[value]` property (with `smartIndentationFix` option)', () => {
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
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

    it('should render markdown value that bind from `[showdown]` property on div element', () => {
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
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

    it('should render markdown value from element content', () => {
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown># abc</showdown>' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBe('# abc');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
    });

    it('should render markdown value from element content (with `options` object)', () => {
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown [options]="{noHeaderId:true}"># abc</showdown>' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBe('# abc');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1>abc</h1>');
    });

    it('should be set options (with casting)', () => {
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
            metadata: {template: '<showdown noHeaderId emoji="false" underline="true" [smartIndentationFix]="true" [options]="options"></showdown>'},
            scope: {options: {tables: true}}
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.getOption('noHeaderId')).toBeTruthy();
        expect(showdownComponent.getOption('emoji')).toBeFalsy();
        expect(showdownComponent.getOption('underline')).toBeTruthy();
        expect(showdownComponent.getOption('smartIndentationFix')).toBeTruthy();
        expect(showdownComponent.getOption('tables')).toBeTruthy();
    });

    it('should render by `render` method markdown value and override the current component `value` ', () => {
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
          metadata: {template: '<showdown># some</showdown>'}
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBe('# some');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="some">some</h1>');

        showdownComponent.render('**other**');

        expect(showdownComponent.value).toBe('**other**');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<p><strong>other</strong></p>');
    });

    it('should set empty input value of option (`[*]`) property to true', () => {
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
            metadata: {template: '<showdown noHeaderId># abc</showdown>'}
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.getOption('noHeaderId')).toBeTruthy();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1>abc</h1>');
    });

    it('should set options object value that bind from `[options]` property', () => {
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
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

    it('should sanitize the convert result', () => {
        let text: string = `# 123\n<a href="javascript:alert('')">click</a>\n**Some**`;
        let fixture = createComponentFixture(showdownComponentModuleMetadata, {
            metadata: {template: '<showdown [value]="text" sanitize></showdown>'},
            scope: {text}
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBe(text);
        expect(fixture.debugElement.nativeElement.children[0].innerHTML)
          .toBe(`<h1>123</h1>\n<p><a href="unsafe:javascript:alert('')">click</a>\n<strong>Some</strong></p>`);
    });
});
