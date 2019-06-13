import { ComponentFixtureAutoDetect, TestModuleMetadata } from '@angular/core/testing';
import { ShowdownPipe } from '../showdown.pipe';
import { createComponentFixture } from './helpers';

let showdownPipeModuleMetadata: TestModuleMetadata = {
  declarations: [ShowdownPipe],
  providers: [{provide: ComponentFixtureAutoDetect, useValue: true}]
};

describe('ShowdownPipe', () => {

  it('should transforms markdown to html by the `transform` method', () => {
    let pipe: ShowdownPipe = new ShowdownPipe();

    expect(pipe.transform('# abc')).toBe('<h1 id="abc">abc</h1>');
  });

  it('should transforms markdown to html with options by the `transform` method', () => {
    let pipe: ShowdownPipe = new ShowdownPipe();

    expect(pipe.transform('# abc', {noHeaderId: true})).toBe('<h1>abc</h1>');
  });

  it('should transforms markdown value of component property', () => {
    let fixture = createComponentFixture(showdownPipeModuleMetadata, {
      metadata: {template: '{{ text | showdown }}'},
      scope: {text: '# abc'}
    });

    expect(fixture.debugElement.nativeElement.innerHTML).toBe('&lt;h1 id="abc"&gt;abc&lt;/h1&gt;');
  });

  it('should transforms markdown to html and bind the result to element `innerHTML` property', () => {
    let fixture = createComponentFixture(showdownPipeModuleMetadata, {
      metadata: {template: '<div [innerHTML]="text | showdown:options"></div>'},
      scope: {text: '\t# abc\t', options: {smartIndentationFix: true, noHeaderId: true}}
    });

    expect(fixture.debugElement.nativeElement.children[0].innerHTML).toBe('<h1>abc</h1>');
  });

  it('should allow using several pipes with different options in the same template', () => {
    let fixture = createComponentFixture(showdownPipeModuleMetadata, {
      metadata: {template: `{{ '# abc' | showdown:{noHeaderId: true} }} | {{ '# 123' | showdown:{headerLevelStart: 2} }}`},
    });

    expect(fixture.debugElement.nativeElement.innerHTML).toBe('&lt;h1&gt;abc&lt;/h1&gt; | &lt;h2 id="123"&gt;123&lt;/h2&gt;');
  });

});
