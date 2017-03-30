import { Component } from '@angular/core';
import { IConverterOptions } from '../../../src';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Angular 2 Markdown Demo!';
    md: string = `## hello markdown!
\`\`\`js
let a = 1;
let b = 2;
let sum = a+b;
console.log(\`sum: \${sum}\`);
\`\`\``;

    options: IConverterOptions = {
        disableForced4SpacesIndentedSublists: false,
        encodeEmails: true,
        excludeTrailingPunctuationFromURLs: false,
        ghCodeBlocks: true,
        ghCompatibleHeaderId: false,
        ghMentions: false,
        ghMentionsLink: 'https://github.com/{u}',
        headerLevelStart: 1,
        literalMidWordUnderscores: false,
        noHeaderId: false,
        omitExtraWLInCodeBlocks: false,
        parseImgDimensions: false,
        prefixHeaderId: false,
        requireSpaceBeforeHeadingText: false,
        simpleLineBreaks: false,
        simplifiedAutoLink: false,
        smartIndentationFix: false,
        smoothLivePreview: false,
        strikethrough: false,
        tables: false,
        tablesHeaderId: false,
        tasklists: false,
        trimEachLine: 'space'
    };

    keys(obj: Object) {
        return Object.keys(obj);
    }

    isType(value: any, type: string) {
        return typeof value === type;
    }
}
