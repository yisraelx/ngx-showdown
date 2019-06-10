import * as Showdown from 'showdown';

let { hasOwnProperty } = {};

export interface ShowdownConfig extends Showdown.ConverterOptions {
}

/**
 * @example
 *
 * Set custom config provider.
 * ```typescript
 * import { NgModel } from '@angular/core';
 * import { ShowdownModule, ShowdownConfig } from 'ngx-showdown';
 *
 * export class MyShowdownConfig extends ShowdownConfig {
 *     emoji = true;
 *     underscore = false;
 *     flavor = 'github';
 * }
 *
 * @NgModel({
 *     imports: [ ShowdownModule ],
 *     providers: [ {provide: ShowdownConfig, useClass: MyConverterOptions} ]
 * })
 * export class AppModule {}
 * ```
 */
export class ShowdownConfig implements Showdown.ConverterOptions {

  flavor?: Showdown.Flavor;

  constructor(options?: ShowdownConfig | Showdown.ConverterOptions) {
    this.merge(options);
  }

  public merge?(options: ShowdownConfig | Showdown.ConverterOptions) {
    for (let key in options) {
      if (hasOwnProperty.call(options, key)) {
        this[key] = options[key];
      }
    }
  }

}
