/* tslint:disable:deprecation */
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { ComponentFixtureAutoDetect, TestModuleMetadata } from '@angular/core/testing';
import { ShowdownComponent } from '../showdown.component';
import { SourceDirective } from '../source.directive';
import { createComponentFixture } from './helpers';

let sourceDirectiveModuleMetadata: TestModuleMetadata = {
  declarations: [ShowdownComponent, SourceDirective],
  providers: [{provide: ComponentFixtureAutoDetect, useValue: true}],
  imports: [HttpClientTestingModule]
};

describe('SourceDirective', () => {

  it('should not load if `src` is empty', () => {
    let fixture = createComponentFixture(sourceDirectiveModuleMetadata, {metadata: {template: '<showdown src></showdown>'}});
    let mockHttpClient: HttpTestingController = fixture.debugElement.injector.get(HttpTestingController);
    let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);
    let sourceDirective: SourceDirective = fixture.debugElement.children[0].injector.get(SourceDirective);

    mockHttpClient.expectNone('');

    expect(sourceDirective.src).toBe('');
    expect(showdownComponent.value).toBeUndefined();
    expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('');

    sourceDirective.load('');
    expect(sourceDirective.src).toBe('');
    expect(showdownComponent.value).toBeUndefined();
    expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('');
  });

  it('should make http request to the bind url of `[src]` and render the response', () => {
    let fixture = createComponentFixture(sourceDirectiveModuleMetadata, {metadata: {template: '<showdown src="TEST.md"></showdown>'}});
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

  it('should make http request to the bind url of `[src]` and render the response (whit options)', () => {
    let fixture = createComponentFixture(sourceDirectiveModuleMetadata, {metadata: {template: '<showdown src="TEST.md" [options]="{smartIndentationFix: true}"></showdown>'}});
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

  it('should make new http request and render the response if `src` is change', () => {
    let fixture = createComponentFixture<{url: string}>(sourceDirectiveModuleMetadata, {
      metadata: {template: '<showdown [src]="url"></showdown>'},
      scope: {url: 'TEST.md'}
    });
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

  it('should make http request to the same url twice and get different response and render', () => {
    let fixture = createComponentFixture<{url: string}>(sourceDirectiveModuleMetadata, {
      metadata: {template: '<showdown [src]="url"></showdown>'},
      scope: {url: 'TEST.md'}
    });
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

  it('should load by `load` method markdown content url and override the current component `url` ', () => {
    let fixture = createComponentFixture<{url: string}>(sourceDirectiveModuleMetadata, {
      metadata: {template: '<showdown src="TEST.md" underline></showdown>'}
    });
    let mockHttpClient: HttpTestingController = fixture.debugElement.injector.get(HttpTestingController);
    let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);
    let sourceDirective: SourceDirective = fixture.debugElement.children[0].injector.get(SourceDirective);

    expect(showdownComponent.value).toBeUndefined();
    expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('');

    let req: TestRequest = mockHttpClient.expectOne(`TEST.md`);
    expect(req.request.method).toBe('GET');
    req.flush('___Some___');
    expect(sourceDirective.src).toBe('TEST.md');
    expect(showdownComponent.value).toBe('___Some___');
    expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<p><u>Some</u></p>');

    sourceDirective.load(`TEST2.md`);
    let req2: TestRequest = mockHttpClient.expectOne(`TEST2.md`);
    expect(req2.request.method).toBe('GET');
    req2.flush('*Other*');
    expect(sourceDirective.src).toBe('TEST2.md');
    expect(showdownComponent.value).toBe('*Other*');
    expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<p><em>Other</em></p>');
  });

  it('should render the component content before the http response content ', () => {
    let fixture = createComponentFixture<{url: string}>(sourceDirectiveModuleMetadata, {
      metadata: {template: '<showdown src="TEST.md">**Loading...**</showdown>'}
    });
    let mockHttpClient: HttpTestingController = fixture.debugElement.injector.get(HttpTestingController);
    let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

    expect(showdownComponent.value).toBe('**Loading...**');
    expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<p><strong>Loading…</strong></p>');

    let req: TestRequest = mockHttpClient.expectOne(`TEST.md`);
    expect(req.request.method).toBe('GET');
    req.flush('**Loaded...**');
    expect(showdownComponent.value).toBe('**Loaded...**');
    expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<p><strong>Loaded…</strong></p>');
  });

  it('should emit `error` event if the http request fail', () => {
    let fixture = createComponentFixture<{url: string}>(sourceDirectiveModuleMetadata, {
      metadata: {template: '<showdown src="error.md" (error)="handleError($event)">**Try...**</showdown>'},
      scope: {
        handleError($event: HttpErrorResponse) {
          expect($event.error).toBe('**400**');
          showdownComponent.render('**Catch...**');
        }
      }
    });
    let mockHttpClient: HttpTestingController = fixture.debugElement.injector.get(HttpTestingController);
    let showdownComponent: ShowdownComponent = fixture.debugElement.children[0].injector.get(ShowdownComponent);

    expect(showdownComponent.value).toBe('**Try...**');
    expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<p><strong>Try…</strong></p>');

    let req: TestRequest = mockHttpClient.expectOne(`error.md`);
    expect(req.request.method).toBe('GET');
    req.flush('**400**', {status: 400, statusText: 'Bad Request'});
    expect(showdownComponent.value).toBe('**Catch...**');
    expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<p><strong>Catch…</strong></p>');
  });

});
