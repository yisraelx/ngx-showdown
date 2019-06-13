import * as Showdown from 'showdown';

/**
 * @internal
 */
let { hasOwnProperty } = {};

export interface ShowdownConfig extends Showdown.ConverterOptions {
}

/**
 * A config provider
 *
 * ### Example
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

  /**
   * @see https://github.com/showdownjs/showdown/blob/master/README.md#flavors
   */
  flavor?: Showdown.Flavor;

  constructor(options?: ShowdownConfig | Showdown.ConverterOptions) {
      this.merge(options);
  }

    /**
     * Merge options
     *
     * @param options - A options object to merge.
     */
    public merge?(options: ShowdownConfig | Showdown.ConverterOptions) {
      for (let key in options) {
          if (hasOwnProperty.call(options, key)) {
              this[key] = options[key];
          }
      }
    }

}
