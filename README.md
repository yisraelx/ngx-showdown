# Rename Library from 'ng2-md' to 'ngx-showdown'
# Angular 2 Markdown Module based on [Showdown library](https://github.com/showdownjs/showdown).
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
$ npm install --save ng2-md
# and install peer dependencies
$ npm install --save @angular/core @angular/http showdown
```

## Use
#### Setup
```javascript
import { NgModule } from '@angular/core';
import { MdModule } from 'ng2-md';

@NgModule({
    imports: [ MdModule ]
})
export class AppModule{}
```
Or with config
```javascript
import { NgModule } from '@angular/core';
import { MdModule, ConverterOptions, IConverterOptions } from 'ng2-md';

@NgModule({
    imports: [ MdModule.forRoot({...} as ConverterOptions | IConverterOptions) ]
})
export class AppModule{}
```
### MdDirective
#### Binding
```javascript
import { IConverterOptionsChangeable } from 'ng2-md';
// ...
    text: string = `
        # h1
        ## h2
    `;
    options: IConverterOptionsChangeable = {...}
// ...
```
```html
<md [value]="text"><md>
```
```html
<md [value]="text" [options]="options"><md>
```
```html
<div [md]="text" [options]="options"><div>
```
#### Content
```html
<md>
    # H1
    ## H2
<md>
```
```html
<md [options]="{...} as IConverterOptionsChangeable">
    # H1
    ## H2
<md>
```
Note: _there is a problem in content unescaped "{" and "}" (use html char code)._

### Options
```javascript
import { IConverterOptionsChangeable } from 'ng2-md';
// ...
    options: IConverterOptionsChangeable = {...};
//...
```
```html
<md [options]="options"># abc</md>
```
```html
<md [disableForced4SpacesIndentedSublists]="options.disableForced4SpacesIndentedSublists" [encodeEmails]="options.encodeEmails" [excludeTrailingPunctuationFromURLs]="options.excludeTrailingPunctuationFromURLs" [ghCodeBlocks]="options.ghCodeBlocks" [ghCompatibleHeaderId]="options.ghCompatibleHeaderId" [ghMentions]="options.ghMentions" [ghMentionsLink]="options.ghMentionsLink" [headerLevelStart]="options.headerLevelStart" [literalMidWordUnderscores]="options.literalMidWordUnderscores" [noHeaderId]="options.noHeaderId" [omitExtraWLInCodeBlocks]="options.omitExtraWLInCodeBlocks" [parseImgDimensions]="options.parseImgDimensions" [prefixHeaderId]="options.prefixHeaderId" [requireSpaceBeforeHeadingText]="options.requireSpaceBeforeHeadingText" [simpleLineBreaks]="options.simpleLineBreaks" [simplifiedAutoLink]="options.simplifiedAutoLink" [smartIndentationFix]="options.smartIndentationFix" [smoothLivePreview]="options.smoothLivePreview" [strikethrough]="options.strikethrough" [tables]="options.tables" [tablesHeaderId]="options.tablesHeaderId" [tasklists]="options.tasklists" [trimEachLine]="options.trimEachLine"># abc</md>
```
### Trim each line
```html
<md trimEachLine="space"> # abc </md> // <md><h1>abc</h1></md>
```
```html
<md trimEachLine="tab">\t# abc\t</md> // <md><h1>abc</h1></md>
```
both tab and space
```html
<md trimEachLine>\t # abc\t </md> // <md><h1>abc</h1></md>
```
### Load .md file (SrcDirective)
```html
<md src="README.md"></md>
```
```html
<md src="README.md" [options]="{...} as IConverterOptionsChangeable"></md>
```

### Pipe
```javascript
import { IConverterOptionsChangeable } from 'ng2-md';
// ...
    text: string = `
        # h1
        ## h2
    `;
    options: IConverterOptionsChangeable = {...}
// ...
```
```html
{{ text | md }}
```
```html
{{ text | md:options }}
```

### Provider
```javascript
import { MdConverter } from 'ng2-md';

class Some{
        constructor(mdConverter: MdConverter){
            console.log(mdConverter.makeHtml("..."));
        }
}
```

### Default converter options 
the default options is the showdown default options
```javascript
import { NgModel } from '@angular/core';
import { ConverterOptions, BaseConverterOptions } from 'ng2-md';
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
import { ConverterOptions, IConverterOptions } from 'ng2-md';

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