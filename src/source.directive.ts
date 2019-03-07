import { Directive, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShowdownComponent } from './showdown.component';

/**
 * @example
 * Setup as standalone
 * ```typescript
 * import { NgModule } from '@angular/core';
 * import { HttpClientModule } from '@angular/common/http';
 * import { ShowdownComponent, SrcDirective } from 'ngx-showdown';
 *
 * @NgModule({
 *    declarations: [ ShowdownComponent, SrcDirective ],
 *    imports: [ HttpClientModule ]
 * })
 * export class AppModule {}
 * ```
 *
 * Bind url `src` directive
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *     selector: 'some',
 *     template: '<showdown [src]="url" smartIndentationFix>**Loading...**</showdown>
 * })
 * class SomeComponent {
 *     url: string = 'https://unpkg.com/ngx-showdown/README.md';
 *     // ...
 * }
 * ```
 *
 * Set static url
 * ```html
 * <showdown src="README.md" [options]="{noHeaderId: true}"></showdown>
 * ```
 *
 * Set template reference variable
 * ```html
 * <showdown #source="source" src="README.md"></showdown>
 * ```
 */
@Directive({
    selector: 'showdown[src],[showdown][src]',
    exportAs: 'source'
})
export class SourceDirective {

    private _src: string;

    /** Source of md file */
    @Input()
    public get src(): string {
        return this._src;
    }

    public set src(src: string) {
        this._src = src;
        this.load();
    }

    constructor(private _showdownComponent: ShowdownComponent, private _http: HttpClient) {
    }

    public load(): void {
        let {src} = this;

        this._http.get(src, {responseType: 'text'}).subscribe((response: string) => {
            this._showdownComponent.render(response);
        });
    }
}
