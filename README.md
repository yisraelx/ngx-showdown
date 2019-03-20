# Angular X Showdown Module based on [Showdown library](https://github.com/showdownjs/showdown).
[![Travis build](https://travis-ci.org/yisraelx/ngx-showdown.svg?branch=master)](https://travis-ci.org/yisraelx/ngx-showdown)
[![Codecov coverage](https://codecov.io/github/yisraelx/ngx-showdown/coverage.svg?branch=master)](https://codecov.io/github/yisraelx/ngx-showdown)
[![Version](https://img.shields.io/npm/v/ngx-showdown.svg)](https://www.npmjs.com/package/ngx-showdown)
[![MIT License](https://img.shields.io/npm/l/ngx-showdown.svg)](https://github.com/yisraelx/ngx-showdown/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Demo
There is a demo in [source code](https://github.com/yisraelx/ngx-showdown/blob/master/demo), it is also [online](http://yisraelx.github.io/ngx-showdown) and have another demo in [Plunker](https://plnkr.co/edit/0j8d9w) can play it online.

## Install
```bash
$ npm install --save ngx-showdown
# and install peer dependencies
$ npm install --save @angular/core @angular/common showdown
```

## Use
#### Setup
```typescript
import { NgModule } from '@angular/core';
import { ShowdownModule } from 'ngx-showdown';

@NgModule({
    imports: [ ShowdownModule ]
})
export class AppModule{}
```
Or with config
```typescript
import { NgModule } from '@angular/core';
import { ShowdownModule, ConverterOptions } from 'ngx-showdown';
import * as Showdown from 'showdown';

@NgModule({
    imports: [ ShowdownModule.forRoot({...} as ConverterOptions | Showdown.ConverterOptions) ]
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

### Options
 Bind options object (it will detect object property changes )
```typescript
import { Component } from '@angular/core';
import * as Showdown from 'showdown';

@Component({
    selector: `some`,
    template: `<showdown [value]="text" [options]="options"></showdown>`,
    // ...
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

### Default converter options 
the default options is the showdown default options
```typescript
import { NgModel } from '@angular/core';
import { ConverterOptions, BaseConverterOptions } from 'ngx-showdown';
export class MyConverterOptions extends ConverterOptions{
    constructor(){
        super({...});
    }
}
@NgModel({
    providers:[
        {provide: ConverterOptions, useClass: MyConverterOptions},
    ]
})
export class AppModule{}
```
Or
```typescript
import { NgModel } from '@angular/core';
import { ConverterOptions } from 'ngx-showdown';
import * as Showdown from 'showdown';

@NgModel({
    providers:[
        {provide: ConverterOptions, useValue: {...} as Showdown.ConverterOptions | ConverterOptions},
    ]
})
export class AppModule{}
```

## Credits
This library based on [Showdown library](https://github.com/showdownjs/showdown)

## License
Copyright © 2016 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/ngx-showdown/blob/master/LICENSE).
