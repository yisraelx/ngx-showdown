import { Component } from '@angular/core';
import { getDefaultOptions, ShowdownOptions } from 'showdown';

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

    options: ShowdownOptions = getDefaultOptions();

    keys(obj: Object) {
        return Object.keys(obj);
    }

    isType(value: any, type: string) {
        return typeof value === type;
    }
}
