import { ModuleWithProviders, NgModule } from '@angular/core';
import { ShowdownDirective } from './showdown.directive';
import { SrcDirective } from './src.directive';
import { ShowdownPipe } from './showdown.pipe';
import { ShowdownConverter } from './showdown-converter.provider';
import { ConverterOptions, BaseConverterOptions } from './base-converter-options.provider';
import { IConverterOptions } from './base-converter.class';


let declarations = [
    ShowdownDirective,
    ShowdownPipe,
    SrcDirective
];

/**
 * @example
 * ```javascript
 * import { NgModule } from '@angular/core';
 * import { ShowdownModule} from 'ngx-showdown';
 * @NgModule({
 *  imports: [ ShowdownModule ];
 * })
 * export class AppModule{}
 * ```
 * ```javascript
 * import { NgModule } from '@angular/core';
 * import { ShowdownModule, IConverterOptions, ConverterOptions } from 'ngx-showdown';
 * @NgModule({
 *  imports: [ ShowdownModule.forRoot({...} as IConverterOptions | ConverterOptions) ];
 * })
 * export class AppModule{}
 * ```
 */
@NgModule({
    declarations: declarations,
    providers: [
        ShowdownConverter,
        {provide: ConverterOptions, useClass: BaseConverterOptions}
    ],
    exports: declarations
})
export class ShowdownModule {
    static forRoot(config: ConverterOptions | IConverterOptions): ModuleWithProviders {
        return {
            ngModule: ShowdownModule,
            providers: [
                {provide: ConverterOptions, useValue: config}
            ]
        };
    }
}