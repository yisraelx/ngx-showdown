<p align="center">
  <img height="200px" width="200px" src="https://github.com/yisraelx/ngx-showdown/raw/master/demo/src/assets/logo.png" alt="ngx-showdown">
  <h1 align="center">Angular Showdown</h1>
</p>

[![Travis build](https://travis-ci.org/yisraelx/ngx-showdown.svg?branch=master)](https://travis-ci.org/yisraelx/ngx-showdown)
[![Codecov coverage](https://codecov.io/github/yisraelx/ngx-showdown/coverage.svg?branch=master)](https://codecov.io/github/yisraelx/ngx-showdown)
[![Version](https://img.shields.io/npm/v/ngx-showdown.svg)](https://www.npmjs.com/package/ngx-showdown)
[![MIT License](https://img.shields.io/npm/l/ngx-showdown.svg)](https://github.com/yisraelx/ngx-showdown/blob/master/LICENSE)
[![Documentation](https://img.shields.io/badge/%F0%9F%93%9A-documentation-informational.svg)](https://yisraelx.github.io/ngx-showdown/docs/index.html)
[![Bundle Size](https://img.shields.io/bundlephobia/min/ngx-showdown.svg?color=green)](https://bundlephobia.com/result?p=ngx-showdown)
[![TypeScript](https://img.shields.io/badge/100%25-TypeScript-blue.svg)](https://www.typescriptlang.org)
[![Semantic release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

**ngx-showdown is an [Angular](https://angular.io) (>=2) integration for [Showdown](https://github.com/showdownjs/showdown), A `Markdown` to `HTML` converter.**
___

## Demo
* Demo app in [source code](https://github.com/yisraelx/ngx-showdown/blob/master/demo) ([live](http://yisraelx.github.io/ngx-showdown)).
* You can play with it in [Stackblitz](https://stackblitz.com/edit/ngx-showdown) and [Plunker](https://plnkr.co/edit/0j8d9w).

## Install
```bash
$ npm install ngx-showdown --save
```
and install peer dependencies (`@angular/common/http` for `SourceDirective`)
```bash
$ npm install showdown @angular/common @angular/platform-browser --save
```
and install type package of `Showdown` for `TypeScript` 
```bash
$ npm install @types/showdown --save-dev
```


## Usage
*For more information and explanations, see the [full documentation](https://yisraelx.github.io/ngx-showdown/docs/index.html).*

### Setup `ShowdownModule` in your app.
Add `ShowdownModule` to `imports` of App.
```typescript
import { NgModule } from '@angular/core';
import { ShowdownModule } from 'ngx-showdown';

@NgModule({
  imports: [ ShowdownModule ]
})
export class AppModule {}
```
Or with config (it will init `ShowdownConfig` provider)
```typescript
import { NgModule } from '@angular/core';
import { ShowdownModule } from 'ngx-showdown';

@NgModule({
  imports: [ ShowdownModule.forRoot({emoji: true, noHeaderId: true, flavor: 'github'}) ]
})
export class AppModule {}
```

### Use `ShowdownComponent` in the template
#### Binding to `[value]` property
Bind markdown value to `value` property of showdown component.
```html
<input type="text" [(ngModel)]="text"/>
<showdown [value]="text"></showdown>
```

Bind value and options.
```typescript
import { Component } from '@angular/core';
import * as Showdown from 'showdown';

@Component({
  selector: 'some',
  template: '<showdown [value]="text" [options]="options"></showdown>'
})
export class SomeComponent {
  text: string = `
# h1
## h2
`;
  options: Showdown.ShowdownOptions = {...};
  // ...
}
```

As directive on anther element 
```html
<div showdown="# Static" noHeaderId></div>
```

#### Markdown in component content
A markdown value in the component content.  
```html
<showdown>
# H1
## H2
</showdown>
```

With options
```html
<showdown [options]="{smartIndentationFix: true}">
    * a
    * b
    * c
</showdown>
```

As directive on anther element 
```html
<span showdown emoji>:showdown:**howdown**</span>
```

#### Load .md content (by `SourceDirective`)
Load markdown content of url source.
```html
<showdown src="README.md"></showdown>
```

Bind input url to `src` directive.
```html
<input type="text" placeholder="Url" [(ngModel)]="url"/>
<showdown #sd [src]="url" (error)="sd.render('**Not found..**')">**No Url..**</showdown>
```
*Note: Loading markdown content requires [`HttpClient`](https://angular.io/api/common/http/HttpClient) of [`@angular/common/http`](https://angular.io/api/common/http)*

#### Mixing sources
When both `Content` and `[value]`, It will render `[value]`.
```html
<showdown value="# Value"># Content</showdown>
```

When both `Content` and `[src]`, It will render `Content` and when `src` loads then results will be `src` content. 
```html
<showdown src="README.md"># Content</showdown>
```

When both `[value]` and `[src]`, It will render `[value]` and when `src` loads then results will be `src` content. 
```html
<showdown value="# Value" src="README.md"></showdown>
```

#### Binding options
Bind options object (it init root `ShowdownConfig` and then set the bind `options`)
```typescript
import { Component } from '@angular/core';
import * as Showdown from 'showdown';

@Component({
  selector: `some`,
  template: `<showdown [value]="text" [options]="options"></showdown>`
})
export class SomeComponent {
  text: string = '# Some';
  options: Showdown.ShowdownOptions = {noHeaderId: true};
  // ...
}
```
Or
```html
<showdown [options]="{noHeaderId: true}"># abc</showdown>
```
Bind single option (it have input properties for all showdown options).
```html
<showdown noHeaderId [headerLevelStart]="2" [tables]="options.tables"># abc</showdown>
```

#### Sanitize the convert html output
Sanitize the convert html output by [`DomSanitizer`](https://angular.io/api/platform-browser/DomSanitizer#sanitize).
```html
<showdown sanitize>
# Some
<a href="javascript:alert('Hello!')">Click</a>
__Foo__
</showdown>
```
Also sanitize content of `src` url.
```html
<showdown [value]="# Loading.." src="README.md" sanitize="true"></showdown>
```

### Use `ShowdownPipe` in the template
Transform markdown value of `text` property to html. 
```html
{{ text | showdown }}
```

Transform value with options (it init root `ShowdownConfig` and then set the pipe `options`)
```typescript
import { Component } from '@angular/core';
import * as Showdown from 'showdown';

@Component({
  selector: 'some',
  template: '{{ text | showdown:options }}'
})
export class SomeComponent {
  text: string = `
      # h1
      ## h2
  `;
  options: Showdown.ShowdownOptions = {smartIndentationFix: true};
  // ...
}
```

### Use `ShowdownConverter` service

```typescript
import { Injectable } from '@angular/core';
import { ShowdownConverter } from 'ngx-showdown';

@Injectable()
export class SomeService {
  constructor(showdownConverter: ShowdownConverter){
    console.log(showdownConverter.makeHtml('# Showdown'));
  }
}
```

### Set config provider (`ShowdownConfig`)
Set root config that will be injected to [ShowdownComponent](#ShowdownComponent), [ShowdownPipe](#ShowdownPipe), [ShowdownConverter](#ShowdownConverter) when they are created.
```typescript
import { NgModel } from '@angular/core';
import { ShowdownModule, ShowdownConverter } from 'ngx-showdown';
import * as Showdown from 'showdown';

let colorExtension: Showdown.FilterExtension = {
  type: 'output',
  filter(text: string, converter: ShowdownConverter){
    return text.replace('$color', converter.getOption('color') || 'green')
  }
};

@NgModel({
  imports:[
    ShowdownModule.forRoot({
      flavor: 'original',
      emoji: true,
      color: 'red',
      extensions: [ colorExtension ]
    })
  ]
})
export class AppModule {}
```

Override the root config provider value.
```typescript
import { Component } from '@angular/core';
import { ShowdownConfig } from 'ngx-showdown';

@Component({
  selector: 'some',
  template: '<showdown># Header</showdown>',
  providers: [ {provide: ShowdownConfig, useValue: {underline: true, emoji: false}} ]
})
export class SomeComponent {}
```

Set the config manually by the converter methods.
```typescript
import { Component } from '@angular/core';
import { ShowdownComponent } from 'ngx-showdown';
import * as highlightExtension from 'showdown-highlight';
import 'highlight.js/styles/default.css';

@Component({
  selector: 'some',
  template: '<showdown># Header</showdown>'
})
export class SomeComponent {
  constructor(showdownComponent: ShowdownComponent) {
    showdownComponent.addExtension(highlightExtension);
    showdownComponent.setFlavor('ghost');
    showdownComponent.setOptions({emoji: true});
  }
}
```

#### Flavor
Set root flavor ([Showdown flavors](https://github.com/showdownjs/showdown/blob/master/README.md#flavors)).
```typescript
import { NgModel } from '@angular/core';
import { ShowdownModule } from 'ngx-showdown';

@NgModel({
  imports:[
    ShowdownModule.forRoot({flavor: 'github'})
  ]
})
export class AppModule {}
```
*Note: If `flavor` is not set then the default value is 'vanilla' flavor.*

#### ConverterOptions
Set root ConverterOptions ([Showdown options](https://github.com/showdownjs/showdown/blob/master/README.md#valid-options)).
```typescript
import { NgModel } from '@angular/core';
import { ShowdownModule } from 'ngx-showdown';

@NgModel({
  imports:[
    ShowdownModule.forRoot({underline: true, emoji: false})
  ]
})
export class AppModule {}
```

#### Extensions
Set root Extensions ([Showdown extensions](https://github.com/showdownjs/showdown#extensions)).
With extension can be made changes to the `Markdown` input ('lang') and the `Html` output also listen to parse event, you can [make extension](https://github.com/showdownjs/showdown/wiki/Extensions) or [search in npm](https://www.npmjs.com/search?q=keywords:showdown%20extension) for existing extension.
```typescript
import { NgModel } from '@angular/core';
import { ShowdownModule } from 'ngx-showdown';
import * as Showdown from 'showdown';
import * as highlightExtension from 'showdown-highlight';
import 'highlight.js/styles/default.css';

let someExtension: Showdown.ShowdownExtension = {
  type: 'lang',
  regex: new RegExp('markdown', 'g'),
  replace: 'showdown'
};


@NgModel({
  imports: [ 
    ShowdownModule.forRoot({extensions: [ someExtension, highlightExtension ]}) 
  ]
})
export class AppModule {}
```

## Troubleshoot
#### Interpolation
Using unescaped `{}` (`<showdown>{}</showdown>`) in template causes an template parse error ([@angular/angular/#11859](https://github.com/angular/angular/issues/11859)), 
The solution is to use escape chars (html char code etc.), 
Anther solution is to override the default [interpolation](https://angular.io/api/core/Component#interpolation).

#### Whitespaces
Angular aot compiler remove whitespaces by default, use [ngPreserveWhitespaces](https://angular.io/api/core/Component#preserving-whitespace) to preserve whitespaces. 
```html
<showdown ngPreserveWhitespaces>
* a
  * 1
  * 2
* b
</showdown>
```
With `ngPreserveWhitespaces`
```
* a
  * 1
  * 2
* b
```
Without `ngPreserveWhitespaces`
```
* a * 1 * 2
* b
```

#### Indentation
Showdown converter [smartIndentationFix](https://github.com/showdownjs/showdown/wiki/Showdown-options#smartindentationfix) option can fix string indentation problems of es6 template and html. 
```typescript
text = `
  # A
  ## B
`;
```
```html
<showdown [value]="text" smartIndentationFix></showdown>
```
With `smartIndentationFix`
```
# A
## B
```
Without `smartIndentationFix`
```
  # A
  ## B
```

## Contribute
**Pull requests are welcome!**

## Development
This project built with [`Angular Cli`](https://angular.io/cli).

Install dependencies
```bash
$ yarn install
```
Run test
```bash
$ yarn test
```
Build for release
```bash
$ yarn build
```

## Credits
This project use [Showdown library](https://github.com/showdownjs/showdown) to convert `Markdown` to `Html`.

## License
Copyright © [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/ngx-showdown/blob/master/LICENSE).
