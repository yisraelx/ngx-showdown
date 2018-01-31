import { Component } from '@angular/core';
import { IConverterOptionsChangeable } from '../../../src';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Angular X Showdown Demo!';
    text: string = `## Hello Showdown!
\`\`\`js
let a = 1;
let b = 2;
let sum = a+b;
console.log(\`sum: \${sum}\`);
\`\`\``;

    options: IConverterOptionsChangeable = {
        backslashEscapesHTMLTags: false,
        completeHTMLDocument: false,
        customizedHeaderId: false,
        disableForced4SpacesIndentedSublists: false,
        emoji: false,
        encodeEmails: true,
        excludeTrailingPunctuationFromURLs: false,
        ghCodeBlocks: true,
        ghCompatibleHeaderId: false,
        ghMentions: false,
        ghMentionsLink: 'https://github.com/{u}',
        headerLevelStart: 1,
        literalMidWordAsterisks: false,
        literalMidWordUnderscores: false,
        metadata: false,
        noHeaderId: false,
        omitExtraWLInCodeBlocks: false,
        openLinksInNewWindow: false,
        parseImgDimensions: false,
        prefixHeaderId: false,
        rawHeaderId: false,
        rawPrefixHeaderId: false,
        requireSpaceBeforeHeadingText: false,
        simpleLineBreaks: false,
        simplifiedAutoLink: false,
        smartIndentationFix: false,
        smoothLivePreview: false,
        strikethrough: false,
        tables: false,
        tablesHeaderId: false,
        tasklists: false,
        trimEachLine: 'space',
        underline: false
    };

    keys(obj: Object) {
        return Object.keys(obj);
    }

    isType(value: any, type: string) {
        return typeof value === type;
    }
}
