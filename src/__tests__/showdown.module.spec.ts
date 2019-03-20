import { Component, Injectable, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, TestBedStatic } from '@angular/core/testing';
import { ShowdownModule } from '../showdown.module';
import * as Showdown from 'showdown';
import { ShowdownComponent } from '../showdown.component';
import { ConverterOptions } from '../base-converter-options.provider';
import { ShowdownConverter } from '../showdown-converter.provider';

describe('ShowdownModule', () => {
    it('should imports the `ShowdownModule` to the app', () => {
          @Component({
              selector: 'some',
              template: '<showdown>**Some**</showdown>'
          })
          class SomeComponent {
              constructor(public converter: ShowdownConverter) {}
          }

          let moduleFixture: TestBedStatic = TestBed.configureTestingModule({
              declarations: [ SomeComponent ],
              imports: [ ShowdownModule ]
          });
          let showdownConverter: ShowdownConverter = moduleFixture.get(ShowdownConverter);
          let componentFixture: ComponentFixture<SomeComponent> = moduleFixture.createComponent(SomeComponent);
          let {componentInstance, nativeElement} = componentFixture;

          componentFixture.detectChanges();

          expect(showdownConverter instanceof ShowdownConverter).toBeTruthy();
          expect(componentInstance instanceof SomeComponent).toBeTruthy();
          expect(componentInstance.converter).toBe(showdownConverter);
          expect(nativeElement.children[0].innerHTML).toBe('<p><strong>Some</strong></p>');
    });

    it('should inject ShowdownModule with options', () => {
        @Injectable()
        class SomeService {
            constructor(public converter: ShowdownConverter, public options: ConverterOptions) {}
        }

        let fixture: TestBedStatic = TestBed.configureTestingModule({
            providers: [ SomeService ],
            imports: [ ShowdownModule.forRoot({foo: 'bar', noHeaderId: true}) ]
        });
        let someService: SomeService = fixture.get(SomeService);
        let showdownConverter: ShowdownConverter = fixture.get(ShowdownConverter);
        let converterOptions: ConverterOptions = fixture.get(ConverterOptions);

        expect(showdownConverter instanceof ShowdownConverter).toBeTruthy();
        expect(someService.converter).toBe(showdownConverter);
        expect(someService.options).toBe(converterOptions);
        expect(showdownConverter.getOption('noHeaderId')).toBeTruthy();
        expect(showdownConverter.getOption('foo')).toBe('bar');

    });

    it('should inject options in the module and other options in the component', () => {
        let componentConverterOptions: Showdown.ConverterOptions = { foo: 'bar', color: 'green', underline: true };
        @Component({
            selector: 'some',
            providers: [
                { provide: ConverterOptions, useValue: componentConverterOptions},
            ],
            template: '<showdown>__Some__</showdown>'
        })
        class SomeComponent {
            @ViewChild(ShowdownComponent) component;
        }

        let moduleFixtureConverterOptions: Showdown.ConverterOptions = { noHeaderId: true, color: 'red'};
        let moduleFixture: TestBedStatic = TestBed.configureTestingModule({
            declarations: [SomeComponent],
            imports: [
              ShowdownModule.forRoot(moduleFixtureConverterOptions)
            ]
        });

        let moduleFixtureOptions: Showdown.ConverterOptions = moduleFixture.get(ConverterOptions);
        let componentFixture: ComponentFixture<SomeComponent> = moduleFixture.createComponent(SomeComponent);
        let {componentInstance, nativeElement} = componentFixture;

        componentFixture.detectChanges();

        expect(componentInstance instanceof SomeComponent).toBeTruthy();
        expect(moduleFixtureOptions).toEqual(moduleFixtureConverterOptions);
        expect(componentInstance.component.getOption('color')).toBe('green');
        expect(componentInstance.component.value).toBe('__Some__');
        expect(nativeElement.children[0].innerHTML).toBe('<p><u>Some</u></p>');
    });

});
