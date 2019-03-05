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

    it('should be the showdownComponent.type to be equal to ShowdownComponent.TYPES.NONE', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown></showdown>' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.type).toBe(ShowdownComponent.TYPES[ShowdownComponent.TYPES.NONE].toLowerCase());
        expect(showdownComponent.status).toBe(ShowdownComponent.STATUSES[ShowdownComponent.STATUSES.INIT].toLowerCase());
    });

    it('should be the showdownComponent.type to be equal to ShowdownComponent.TYPES.BINDING', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown [value]="text"></showdown>' },
            scope: { text: '# abc' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.type).toBe(ShowdownComponent.TYPES[ShowdownComponent.TYPES.BINDING].toLowerCase());
        expect(showdownComponent.status).toBe(ShowdownComponent.STATUSES[ShowdownComponent.STATUSES.READY].toLowerCase());
    });

    it('should be get set showdownComponent.value and alias showdownComponent.showdown', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown></showdown>' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.showdown).toBe(showdownComponent.value);

        showdownComponent.value = '# abc';
        expect(showdownComponent.value).toBe('# abc');
        expect(showdownComponent.showdown).toBe('# abc');
        expect(showdownComponent.showdown).toBe(showdownComponent.value);

        showdownComponent.showdown = '## abc';
        expect(showdownComponent.value).toBe('## abc');
        expect(showdownComponent.showdown).toBe('## abc');
        expect(showdownComponent.showdown).toBe(showdownComponent.value);
    });

    it('should be replace the on change method', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown [value]="text"></showdown>' },
            scope: { text: '# abc' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
        showdownComponent.registerOnChange(function () {
            this._value = this._value.toUpperCase();
            this.compile();
        });
        (showdownComponent as any)._onChange();

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">ABC</h1>');
    });

    it('should be throw error if registerOnChange arg fn is not function', () => {
        let showdownComponent: ShowdownComponent = new ShowdownComponent({} as any);
        let execute = () => {
            showdownComponent.registerOnChange(void 0);
        };
        expect(execute).toThrow();
    });

    it('should be converted showdown[value] bind attr to html and set the result to the element content', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown [value]="text"></showdown>' },
            scope: { text: '# abc' }
        });

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');

        fixture.debugElement.componentInstance.text = '## abc';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2 id="abc">abc</h2>');
    });

    it('should be converted showdown[value] bind attr to html and set the result to the element content (whit options)', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown [value]="text" [options]="options"></showdown>' },
            scope: { text: '# abc', options: { noHeaderId: true } }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1>abc</h1>');

        showdownComponent.value = '## abc';
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2>abc</h2>');

        showdownComponent.noHeaderId = false;
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2 id="abc">abc</h2>');
    });

    it('should be converted showdown[value] bind attr to html and set the result to the element content (trimEachLine directive)', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
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
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<div [showdown]="text"></div>' },
            scope: { text: '# abc' }
        });

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');

        fixture.debugElement.componentInstance.text = '## abc';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h2 id="abc">abc</h2>');
    });

    it('should be the showdownComponent.type to be equal to ShowdownComponent.TYPES.CONTENT', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown># abc</showdown>' }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.type).toBe(ShowdownComponent.TYPES[ShowdownComponent.TYPES.CONTENT].toLowerCase());
        expect(showdownComponent.status).toBe(ShowdownComponent.STATUSES[ShowdownComponent.STATUSES.READY].toLowerCase());
    });

    it('should be converted element md content to html and set the result to the element content', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown># abc</showdown>' }
        });

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
    });

    it('should be converted element md content to html and set the result to the element content (whit options)', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown [options]="{noHeaderId:true}"># abc</showdown>' }
        });

        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1>abc</h1>');
    });

    it('should be set get options', () => {
        let fixture = $.createFixture(showdownComponentModuleMetadata, {
            metadata: { template: '<showdown noHeaderId trimEachLine="space" [options]="options"></showdown>' },
            scope: { options: { tables: true } }
        });
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.options.noHeaderId).toBeTruthy();
        expect(showdownComponent.noHeaderId).toBeTruthy();
        expect(showdownComponent.options.trimEachLine).toBe('space');
        expect(showdownComponent.trimEachLine).toBe('space');
        expect(showdownComponent.options.tables).toBeTruthy();
        expect(showdownComponent.tables).toBeTruthy();
    });

});
