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
        omitExtraWLInCodeBlocks: true,
        noHeaderId: true,
        prefixHeaderId: true,
        parseImgDimensions: true,
        headerLevelStart: 1,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        ghCodeBlocks: true,
        tasklists: true,
        smoothLivePreview: true,
        trimEachLine: 'space'
    };

    keys(obj: Object) {
        return Object.keys(obj);
    }

    isType(value: any, type: string) {
        return typeof value === type;
    }
}
