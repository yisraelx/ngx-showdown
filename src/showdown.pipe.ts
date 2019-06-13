import { Pipe, PipeTransform } from '@angular/core';
import * as Showdown from 'showdown';
import { ShowdownConverter } from './showdown-converter.provider';

/**
 * A angular pipe to transform `Markdown` to `HTML`.
 *
 * ### Example
 *
 * Setup as standalone
 * ```typescript
 * import { NgModule } from '@angular/core';
 * import { ShowdownPipe } from 'ngx-showdown';
 *
 * @NgModule({
 *   declarations: [ ShowdownPipe ];
 * })
 * export class AppModule {}
 * ```
 *
 * Transform markdown value to html.
 * ```html
 * <input type="text" placeholder="Name" [(ngModel)]="name"/>
 * <div [innerHTML]="'**Hello '+(name || 'nobody')+'!**' | showdown">
 * ```
 *
 * Transform markdown value to html with `options`.
 * ```typescript
 * import * as Showdown from 'showdown';
 *
 * @Component({
 *   selector: 'some',
 *   template: `<div innerHTML="{{ text | showdown: options }}"></div>`
 * })
 * export class SomeComponent {
 *   text: string = "__Some Underline__";
 *   options: Showdown.ShowdownOptions = { underline: true };
 *   // ...
 * }
 * ```
 */
@Pipe({
  name: 'showdown',
  pure: false
})
export class ShowdownPipe extends ShowdownConverter implements PipeTransform {

  /**
   * Transform markdown value to html.
   *
   * @param value - The markdown value to transform to html.
   * @param options - A `Showdown` converter options.
   * @returns Returns the transform result of `value` to html.
   */
  transform(value: string, options?: Showdown.ShowdownOptions): string {
    this.setOptions(options);
    return this.makeHtml(value);
  }

}
