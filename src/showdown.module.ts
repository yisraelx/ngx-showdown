import { ModuleWithProviders, NgModule } from '@angular/core';
import * as Showdown from 'showdown';
import { ShowdownComponent } from './showdown.component';
import { SourceDirective } from './source.directive';
import { ShowdownPipe } from './showdown.pipe';
import { ShowdownConverter } from './showdown-converter.provider';
import { ConverterOptions, BaseConverterOptions } from './base-converter-options.provider';

const DECLARATIONS = [
    ShowdownComponent,
    ShowdownPipe,
    SourceDirective
];

/**
 * @example
 * ```typescript
 * Add `ShowdownModule` to app `imports`.
 * import { NgModule } from '@angular/core';
 * import { ShowdownModule } from 'ngx-showdown';
 *
 * @NgModule({
 *    imports: [ ShowdownModule ];
 * })
 * export class AppModule {}
 * ```
 */
@NgModule({
    declarations: DECLARATIONS,
    providers: [
        ShowdownConverter,
        {provide: ConverterOptions, useClass: BaseConverterOptions}
    ],
    exports: DECLARATIONS
})
export class ShowdownModule {

    /**
     *
     * @param options - A root options for all converter instances.
     * @example
     * Add `ShowdownModule` to app `imports` with config.
     * ```typescript
     * import { NgModule } from '@angular/core';
     * import { ShowdownModule } from 'ngx-showdown';
     *
     * @NgModule({
     *    imports: [ ShowdownModule.forRoot({smartIndentationFix: true}) ];
     * })
     * export class AppModule {}
     * ```
     */
    static forRoot(options: ConverterOptions | Showdown.ConverterOptions): ModuleWithProviders {
        return {
            ngModule: ShowdownModule,
            providers: [
                {provide: ConverterOptions, useValue: options}
            ]
        };
    }
}
