import { ModuleWithProviders, NgModule } from '@angular/core';
import { MdDirective } from './md.directive';
import { SrcDirective } from './src.directive';
import { MdPipe } from './md.pipe';
import { MdConverter } from './md-converter.provider';
import { ConverterOptions, BaseConverterOptions } from './base-converter-options.provider';
import { IConverterOptions } from './base-converter.class';


let declarations = [
    MdDirective,
    MdPipe,
    SrcDirective
];

/**
 * @example
 * ```javascript
 * import { NgModule } from '@angular/core';
 * import { MdModule} from 'ng2-md';
 * @NgModule({
 *  imports: [ MdModule ];
 * })
 * export class AppModule{}
 * ```
 * ```javascript
 * import { NgModule } from '@angular/core';
 * import { MdModule, IConverterOptions, ConverterOptions } from 'ng2-md';
 * @NgModule({
 *  imports: [ MdModule.forRoot({...} as IConverterOptions | ConverterOptions) ];
 * })
 * export class AppModule{}
 * ```
 */
@NgModule({
    declarations,
    providers: [
        MdConverter,
        {provide: ConverterOptions, useClass: BaseConverterOptions}
    ],
    exports: declarations
})
export class MdModule {
    static forRoot(config: ConverterOptions | IConverterOptions): ModuleWithProviders {
        return {
            ngModule: MdModule,
            providers: [
                {provide: ConverterOptions, useValue: config}
            ]
        };
    }
}