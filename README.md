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
$ npm install --save @angular/core @angular/http showdown
```

## Use
#### Setup
```javascript
import { NgModule } from '@angular/core';
import { ShowdownModule } from 'ngx-showdown';

@NgModule({
    imports: [ ShowdownModule ]
})
export class AppModule{}
```
Or with config
```javascript
import { NgModule } from '@angular/core';
import { ShowdownModule, ConverterOptions, IConverterOptions } from 'ngx-showdown';

@NgModule({
    imports: [ ShowdownModule.forRoot({...} as ConverterOptions | IConverterOptions) ]
})
export class AppModule{}
```
### ShowdownDirective
#### Binding
```javascript
import { IConverterOptionsChangeable } from 'ngx-showdown';
// ...
    text: string = `
        # h1
        ## h2
    `;
    options: IConverterOptionsChangeable = {...}
// ...
```
```html
<showdown [value]="text"></showdown>
```
```html
<showdown [value]="text" [options]="options"></showdown>
```
```html
<div [showdown]="text" [options]="options"></div>
```
#### Content
```html
<showdown>
    # H1
    ## H2
</showdown>
```
```html
<showdown [options]="{...} as IConverterOptionsChangeable">
    # H1
    ## H2
</showdown>
```
Note: _there is a problem in content unescaped "{" and "}" (use html char code)._

### Options
```javascript
import { IConverterOptionsChangeable } from 'ngx-showdown';
// ...
    options: IConverterOptionsChangeable = {...};
//...
```
```html
<showdown [options]="options"># abc</showdown>
```
```html
<showdown [disableForced4SpacesIndentedSublists]="options.disableForced4SpacesIndentedSublists" [encodeEmails]="options.encodeEmails" [excludeTrailingPunctuationFromURLs]="options.excludeTrailingPunctuationFromURLs" [ghCodeBlocks]="options.ghCodeBlocks" [ghCompatibleHeaderId]="options.ghCompatibleHeaderId" [ghMentions]="options.ghMentions" [ghMentionsLink]="options.ghMentionsLink" [headerLevelStart]="options.headerLevelStart" [literalMidWordUnderscores]="options.literalMidWordUnderscores" [noHeaderId]="options.noHeaderId" [omitExtraWLInCodeBlocks]="options.omitExtraWLInCodeBlocks" [parseImgDimensions]="options.parseImgDimensions" [prefixHeaderId]="options.prefixHeaderId" [requireSpaceBeforeHeadingText]="options.requireSpaceBeforeHeadingText" [simpleLineBreaks]="options.simpleLineBreaks" [simplifiedAutoLink]="options.simplifiedAutoLink" [smartIndentationFix]="options.smartIndentationFix" [smoothLivePreview]="options.smoothLivePreview" [strikethrough]="options.strikethrough" [tables]="options.tables" [tablesHeaderId]="options.tablesHeaderId" [tasklists]="options.tasklists" [trimEachLine]="options.trimEachLine"># abc</showdown>
```
### Trim each line
```html
<showdown trimEachLine="space"> # abc </showdown> // <showdown><h1>abc</h1></showdown>
```
```html
<showdown trimEachLine="tab">\t# abc\t</showdown> // <showdown><h1>abc</h1></showdown>
```
both tab and space
```html
<showdown trimEachLine>\t # abc\t </showdown> // <showdown><h1>abc</h1></showdown>
```
### Load .md file (SrcDirective)
```html
<showdown src="README.md"></showdown>
```
```html
<showdown src="README.md" [options]="{...} as IConverterOptionsChangeable"></showdown>
```

### Pipe
```javascript
import { IConverterOptionsChangeable } from 'ngx-showdown';
// ...
    text: string = `
        # h1
        ## h2
    `;
    options: IConverterOptionsChangeable = {...}
// ...
```
```html
{{ text | showdown }}
```
```html
{{ text | showdown:options }}
```

### Provider
```javascript
import { ShowdownConverter } from 'ngx-showdown';

class Some{
        constructor(showdownConverter: ShowdownConverter){
            console.log(showdownConverter.makeHtml("..."));
        }
}
```

### Default converter options 
the default options is the showdown default options
```javascript
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
```javascript
import { NgModel } from '@angular/core';
import { ConverterOptions, IConverterOptions } from 'ngx-showdown';

@NgModel({
    providers:[
        {provide: ConverterOptions, useValue: {...} as IConverterOptions | ConverterOptions},
    ]
})
export class AppModule{}
```

## Credits
This library based on [Showdown library](https://github.com/showdownjs/showdown)

## License
Copyright © 2016 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/ngx-showdown/blob/master/LICENSE).
