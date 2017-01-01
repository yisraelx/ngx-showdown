import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { TestModuleMetadata } from '@angular/core/testing';
import { MdDirective } from '../src/md.directive';
import { SrcDirective } from '../src/src.directive';
import { ConverterOptions, BaseConverterOptions } from '../src/base-converter-options.provider';
import $ from './utils';

let srcDirectiveModuleMetadata: TestModuleMetadata = {
    declarations: [MdDirective, SrcDirective],
    providers: [
        { provide: ConverterOptions, useClass: BaseConverterOptions },
        BaseRequestOptions,
        MockBackend,
        {
            provide: Http, useFactory: (backend, options) => {
                return new Http(backend, options);
            }, deps: [MockBackend, BaseRequestOptions]
        }

    ],
    imports: [HttpModule]
};


describe('SrcDirective', () => {

    it('should be the mdDirective.type to be equal to MdDirective.TYPES.SRC', () => {
        let fixture = $.createFixture(srcDirectiveModuleMetadata, { metadata: { template: '<md src="TEST.md"></md>' } });
        let mockBackend = fixture.debugElement.injector.get(MockBackend);
        let mdDirective: MdDirective = fixture.debugElement.children[0].injector.get(MdDirective);
        mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({ body: '# abc' })));
        });

        fixture.detectChanges();
        expect(mdDirective.type).toBe(MdDirective.TYPES[MdDirective.TYPES.SRC].toLowerCase());
        expect(mdDirective.status).toBe(MdDirective.STATUSES[MdDirective.STATUSES.READY].toLowerCase());
    });

    it('should be request to md[src] url over http and converted the response md data to html and set the result to the element content', () => {
        let fixture = $.createFixture(srcDirectiveModuleMetadata, { metadata: { template: '<md src="TEST.md"></md>' } });
        let mockBackend = fixture.debugElement.injector.get(MockBackend);

        mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({ body: '# abc' })));
        });

        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
    });

    it('should be request to md[src] url over http and converted the response md data to html and set the result to the element content (whit options)', () => {
        let fixture = $.createFixture(srcDirectiveModuleMetadata, { metadata: { template: '<md src="TEST.md" [options]="{trimEachLine: true}"></md>' } });
        let mockBackend = fixture.debugElement.injector.get(MockBackend);

        mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({ body: '\t # abc\t ' })));
        });

        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="abc">abc</h1>');
    });

    it('should be request and converted after binding second time', () => {
        let fixture = $.createFixture<{ url: string }>(srcDirectiveModuleMetadata, { metadata: { template: '<md [src]="url"></md>' }, scope: { url: 'TEST.md' } });
        let mockBackend = fixture.debugElement.injector.get(MockBackend);
        let srcDirective: SrcDirective = fixture.debugElement.children[0].injector.get(SrcDirective);

        mockBackend.connections.subscribe((connection: MockConnection) => {
            switch (connection.request.url) {
                case 'TEST.md':
                    connection.mockRespond(new Response(new ResponseOptions({ body: '# Test' })));
                    break;
                case 'TEST2.md':
                    connection.mockRespond(new Response(new ResponseOptions({ body: '# Test 2' })));
                    break;
                default:
                    connection.mockRespond(new Response(new ResponseOptions({ status: 404, body: '404 Page Not Found!' })));
            }
        });

        fixture.detectChanges();
        expect(srcDirective.src).toBe('TEST.md');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="test">Test</h1>');

        fixture.componentInstance.url = 'TEST2.md';
        fixture.detectChanges();
        expect(srcDirective.src).toBe('TEST2.md');
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="test2">Test 2</h1>');

    });

    it('should be request same url two time and get different response', () => {
        let fixture = $.createFixture<{ url: string }>(srcDirectiveModuleMetadata, { metadata: { template: '<md [src]="url"></md>' }, scope: { url: 'TEST.md' } });
        let mockBackend = fixture.debugElement.injector.get(MockBackend);
        let srcDirective: SrcDirective = fixture.debugElement.children[0].injector.get(SrcDirective);
        let count = 1;
        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(new ResponseOptions({ body: `# Test ${count}` })));
            count++;
        });

        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="test1">Test 1</h1>');

        srcDirective.load();
        expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1 id="test2">Test 2</h1>');
    });


});