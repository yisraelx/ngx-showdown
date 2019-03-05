import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import { TestModuleMetadata } from '@angular/core/testing';
import { ShowdownComponent } from '../src/showdown.component';
import { SrcDirective } from '../src/src.directive';
import { ConverterOptions, BaseConverterOptions } from '../src/base-converter-options.provider';
import $ from './utils';

let srcDirectiveModuleMetadata: TestModuleMetadata = {
    declarations: [ShowdownComponent, SrcDirective],
    providers: [
        { provide: ConverterOptions, useClass: BaseConverterOptions }
    ],
    imports: [HttpClientTestingModule]
};


describe('SrcDirective', () => {

    it('should be the showdownComponent.type to be equal to ShowdownComponent.TYPES.SRC', () => {
        let fixture = $.createFixture(srcDirectiveModuleMetadata, { metadata: { template: '<showdown src="TEST.md"></showdown>' } });
        let mockHttpClient: HttpTestingController = fixture.debugElement.injector.get(HttpTestingController);
        let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

        fixture.detectChanges();
        let req: TestRequest = mockHttpClient.expectOne(`TEST.md`);
        expect(req.request.method).toBe('GET');
        req.flush('# abc');
        expect(showdownComponent.type).toBe(ShowdownComponent.TYPES[ShowdownComponent.TYPES.SRC].toLowerCase());
        expect(showdownComponent.status).toBe(ShowdownComponent.STATUSES[ShowdownComponent.STATUSES.READY].toLowerCase());
    });

    it('should be request to showdown[src] url over http and converted the response md data to html and set the result to the element content', () => {
        let fixture = $.createFixture(srcDirectiveModuleMetadata, { metadata: { template: '<showdown src="TEST.md"></showdown>' } });
        let mockHttpClient: HttpTestingController = fixture.debugElement.injector.get(HttpTestingController);

        fixture.detectChanges();
        let req: TestRequest = mockHttpClient.expectOne(`TEST.md`);
        expect(req.request.method).toBe('GET');
        req.flush('# abc');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
    });

    it('should be request to showdown[src] url over http and converted the response md data to html and set the result to the element content (whit options)', () => {
        let fixture = $.createFixture(srcDirectiveModuleMetadata, { metadata: { template: '<showdown src="TEST.md" [options]="{smartIndentationFix: true}"></showdown>' } });
        let mockHttpClient: HttpTestingController = fixture.debugElement.injector.get(HttpTestingController);

        fixture.detectChanges();
        let req: TestRequest = mockHttpClient.expectOne(`TEST.md`);
        expect(req.request.method).toBe('GET');
        req.flush('\t # abc\t ');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
    });

    it('should be request and converted after binding second time', () => {
        let fixture = $.createFixture<{ url: string }>(srcDirectiveModuleMetadata, { metadata: { template: '<showdown [src]="url"></showdown>' }, scope: { url: 'TEST.md' } });
        let mockHttpClient: HttpTestingController = fixture.debugElement.injector.get(HttpTestingController);
        let srcDirective: SrcDirective = fixture.debugElement.children[0].injector.get(SrcDirective);

        fixture.detectChanges();
        let req: TestRequest = mockHttpClient.expectOne(`TEST.md`);
        expect(req.request.method).toBe('GET');
        req.flush('# Test');
        expect(srcDirective.src).toBe('TEST.md');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="test">Test</h1>');

        fixture.componentInstance.url = 'TEST2.md';
        fixture.detectChanges();
        let req2: TestRequest = mockHttpClient.expectOne(`TEST2.md`);
        expect(req2.request.method).toBe('GET');
        req2.flush('# Test 2');
        expect(srcDirective.src).toBe('TEST2.md');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="test2">Test 2</h1>');

    });

    it('should be request same url two time and get different response', () => {
        let fixture = $.createFixture<{ url: string }>(srcDirectiveModuleMetadata, { metadata: { template: '<showdown [src]="url"></showdown>' }, scope: { url: 'TEST.md' } });
        let mockHttpClient: HttpTestingController = fixture.debugElement.injector.get(HttpTestingController);
        let srcDirective: SrcDirective = fixture.debugElement.children[0].injector.get(SrcDirective);

        fixture.detectChanges();
        let req: TestRequest = mockHttpClient.expectOne(`TEST.md`);
        expect(req.request.method).toBe('GET');
        req.flush('# Test 1');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="test1">Test 1</h1>');

        srcDirective.load();
        let req2: TestRequest = mockHttpClient.expectOne(`TEST.md`);
        expect(req2.request.method).toBe('GET');
        req2.flush('# Test 2');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="test2">Test 2</h1>');
    });

});
