import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { ComponentFixtureAutoDetect, TestModuleMetadata } from '@angular/core/testing';
import { ShowdownComponent } from '../src/showdown.component';
import { SourceDirective } from '../src/source.directive';
import { ConverterOptions, BaseConverterOptions } from '../src/base-converter-options.provider';
import $ from './utils';

let sourceDirectiveModuleMetadata: TestModuleMetadata = {
    declarations: [ShowdownComponent, SourceDirective],
    providers: [
        { provide: ConverterOptions, useClass: BaseConverterOptions },
        { provide: ComponentFixtureAutoDetect, useValue: true }
    ],
    imports: [HttpClientTestingModule]
};


describe('SourceDirective', () => {

    it('should not load if `src` is empty', () => {
        let fixture = $.createFixture(sourceDirectiveModuleMetadata, { metadata: { template: '<showdown src></showdown>' } });
        let mockHttpClient: HttpTestingController = fixture.debugElement.injector.get(HttpTestingController);
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);
        let sourceDirective: SourceDirective = fixture.debugElement.children[0].injector.get(SourceDirective);

        mockHttpClient.expectNone('');

        expect(sourceDirective.src).toBe('');
        expect(showdownComponent.value).toBeUndefined();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('');
    });

    it('should be request to showdown[src] url over http and converted the response md data to html and set the result to the element content', () => {
        let fixture = $.createFixture(sourceDirectiveModuleMetadata, { metadata: { template: '<showdown src="TEST.md"></showdown>' } });
        let mockHttpClient: HttpTestingController = fixture.debugElement.injector.get(HttpTestingController);
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBeUndefined();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('');

        let req: TestRequest = mockHttpClient.expectOne(`TEST.md`);
        expect(req.request.method).toBe('GET');
        req.flush('# abc');
        expect(showdownComponent.value).toBe('# abc');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
    });

    it('should be request to showdown[src] url over http and converted the response md data to html and set the result to the element content (whit options)', () => {
        let fixture = $.createFixture(sourceDirectiveModuleMetadata, { metadata: { template: '<showdown src="TEST.md" [options]="{smartIndentationFix: true}"></showdown>' } });
        let mockHttpClient: HttpTestingController = fixture.debugElement.injector.get(HttpTestingController);
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        expect(showdownComponent.value).toBeUndefined();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('');

        let req: TestRequest = mockHttpClient.expectOne(`TEST.md`);
        expect(req.request.method).toBe('GET');
        req.flush('\t # abc\t ');
        expect(showdownComponent.value).toBe('\t # abc\t ');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
    });

    it('should be request and converted after binding second time', () => {
        let fixture = $.createFixture<{ url: string }>(sourceDirectiveModuleMetadata, { metadata: { template: '<showdown [src]="url"></showdown>' }, scope: { url: 'TEST.md' } });
        let mockHttpClient: HttpTestingController = fixture.debugElement.injector.get(HttpTestingController);
        let sourceDirective: SourceDirective = fixture.debugElement.children[0].injector.get(SourceDirective);

        let req: TestRequest = mockHttpClient.expectOne(`TEST.md`);
        expect(req.request.method).toBe('GET');
        req.flush('# Test');
        expect(sourceDirective.src).toBe('TEST.md');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="test">Test</h1>');

        fixture.componentInstance.url = 'TEST2.md';
        fixture.detectChanges();
        let req2: TestRequest = mockHttpClient.expectOne(`TEST2.md`);
        expect(req2.request.method).toBe('GET');
        req2.flush('# Test 2');
        expect(sourceDirective.src).toBe('TEST2.md');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="test2">Test 2</h1>');
    });

    it('should be request same url two time and get different response', () => {
        let fixture = $.createFixture<{ url: string }>(sourceDirectiveModuleMetadata, { metadata: { template: '<showdown [src]="url"></showdown>' }, scope: { url: 'TEST.md' } });
        let mockHttpClient: HttpTestingController = fixture.debugElement.injector.get(HttpTestingController);
        let sourceDirective: SourceDirective = fixture.debugElement.children[0].injector.get(SourceDirective);

        let req: TestRequest = mockHttpClient.expectOne(`TEST.md`);
        expect(req.request.method).toBe('GET');
        req.flush('# Test 1');
        expect(sourceDirective.src).toBe('TEST.md');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="test1">Test 1</h1>');

        sourceDirective.load();
        let req2: TestRequest = mockHttpClient.expectOne(`TEST.md`);
        expect(req2.request.method).toBe('GET');
        req2.flush('# Test 2');
        expect(sourceDirective.src).toBe('TEST.md');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="test2">Test 2</h1>');
    });
});
