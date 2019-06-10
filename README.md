# Angular X Showdown Module based on [Showdown library](https://github.com/showdownjs/showdown).
[![Travis build](https://travis-ci.org/yisraelx/ngx-showdown.svg?branch=master)](https://travis-ci.org/yisraelx/ngx-showdown)
[![Codecov coverage](https://codecov.io/github/yisraelx/ngx-showdown/coverage.svg?branch=master)](https://codecov.io/github/yisraelx/ngx-showdown)
[![Version](https://img.shields.io/npm/v/ngx-showdown.svg)](https://www.npmjs.com/package/ngx-showdown)
[![MIT License](https://img.shields.io/npm/l/ngx-showdown.svg)](https://github.com/yisraelx/ngx-showdown/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Demo
There is a demo in [source code](https://github.com/yisraelx/ngx-showdown/blob/master/demo), it is also [online](http://yisraelx.github.io/ngx-showdown) and have another demo in [Plunker](https://plnkr.co/edit/0j8d9w) can play it online.

## Install
```bash
$ npm install ngx-showdown --save
```
and install peer dependencies (`@angular/common/http` for `SourceDirective`)
```bash
$ npm install showdown @angular/core @angular/common --save
```
and install type package of `showdown` for TypeScript 
```bash
$ npm install @types/showdown --save-dev
```

## Use
#### Setup
Add `ShowdownModule` to `imports` of App.
```typescript
import { NgModule } from '@angular/core';
import { ShowdownModule } from 'ngx-showdown';

@NgModule({
    imports: [ ShowdownModule ]
})
export class AppModule{}
```
Or with [config](#ShowdownConfig)
```typescript
import { NgModule } from '@angular/core';
import { ShowdownModule } from 'ngx-showdown';

@NgModule({
    imports: [ ShowdownModule.forRoot({emoji: true, noHeaderId: true, flavor: 'github'}) ]
})
export class AppModule{}
```

### ShowdownComponent
#### Binding
```typescript
import { Component } from '@angular/core';
import * as Showdown from 'showdown';

@Component({...})
export class SomeComponent {
  text: string = `
# h1
## h2
`;
  options: Showdown.ShowdownOptions = {...};
  // ...
}
```
Bind property to 'value' attribute of showdown element.
```html
<showdown [value]="text"></showdown>
```
With options
```html
<showdown [value]="text" [options]="options"></showdown>
```
As attribute on anther element 
```html
<div [showdown]="text" [options]="options"></div>
```

#### Content
A showdown element with markdown content.  
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
As attribute on anther element 
```html
<span showdown>**Showdown**</span>
```

#### Options
Bind options object (it init root [config](#ShowdownConfig) and then set the bind `options`)
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

#### Indentation

Showdown converter [smartIndentationFix](https://github.com/showdownjs/showdown/wiki/Showdown-options#smartindentationfix) option can fix string indentation. 
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

### Load .md file (SourceDirective)
```html
<showdown src="README.md"></showdown>
```
```html
<showdown src="README.md" [options]="{emoji: true}"></showdown>
```

### Pipe
```typescript
import { Component } from '@angular/core';
import * as Showdown from 'showdown';

@Component({...})
export class SomeComponent {
  text: string = `
      # h1
      ## h2
  `;
  options: Showdown.ShowdownOptions = {...};
// ...
}
```
Convert the markdown value of `text` property to html by showdown pipe 
```html
{{ text | showdown }}
```
With options
```html
{{ text | showdown:options }}
```

### Provider

```typescript
import { ShowdownConverter } from 'ngx-showdown';

export class SomeComponent {
  constructor(showdownConverter: ShowdownConverter){
    console.log(showdownConverter.makeHtml('# Showdown'));
  }
}
```

### ShowdownConfig
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

Override the root config provider.
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

##### Extensions
Set root Extensions ([Showdown extensions](https://github.com/showdownjs/showdown#extensions)).
With extension can be made changes to the `Markdown` input ('lang') and the `Html` output also listen to parse event, you can [make extension](https://github.com/showdownjs/showdown/wiki/Extensions) or [search in npm](https://www.npmjs.com/search?q=keywords:showdown%20extension) for existing extension.
```typescript
import { NgModel } from '@angular/core';
import { ShowdownModule } from 'ngx-showdown';
import * as Showdown from 'showdown';
import * as highlightExtension from 'showdown-highlight';

let someExtension: Showdown.ShowdownExtension = {
    type: 'lang',
    regex: /markdown/g,
    replace: 'showdown'
};


@NgModel({
    imports: [ ShowdownModule.forRoot({
        extensions: [ someExtension, highlightExtension ]
    }) ]
})
export class AppModule {}
```

## Credits
This library based on [Showdown library](https://github.com/showdownjs/showdown)

## License
Copyright © 2016 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/ngx-showdown/blob/master/LICENSE).
