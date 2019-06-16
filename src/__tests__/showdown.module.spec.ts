import { Component, Injectable, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, TestBedStatic } from '@angular/core/testing';
import { ShowdownConfig } from '../showdown-config.provider';
import { ShowdownConverter } from '../showdown-converter.provider';
import { ShowdownComponent } from '../showdown.component';
import { ShowdownModule } from '../showdown.module';

describe('ShowdownModule', () => {

  it('should imports the `ShowdownModule` to the app', () => {
    @Component({
      selector: 'some',
      template: '<showdown>**Some**</showdown>'
    })
    class SomeComponent {
      constructor(public converter: ShowdownConverter) {
      }
    }

    let moduleFixture: TestBedStatic = TestBed.configureTestingModule({
      declarations: [SomeComponent],
      imports: [ShowdownModule]
    });
    let showdownConverter: ShowdownConverter = moduleFixture.get(ShowdownConverter);
    let componentFixture: ComponentFixture<SomeComponent> = moduleFixture.createComponent(SomeComponent);
    let {componentInstance, nativeElement} = componentFixture;

    componentFixture.detectChanges();

    expect(showdownConverter instanceof ShowdownConverter).toBeTruthy();
    expect(componentInstance instanceof SomeComponent).toBeTruthy();
    expect(componentInstance.converter).toBe(showdownConverter);
    expect(showdownConverter.getFlavor()).toBe('vanilla');
    expect(nativeElement.children[0].innerHTML).toBe('<p><strong>Some</strong></p>');
  });

  it('should imports the ShowdownModule with options', () => {
    @Injectable()
    class SomeService {
      constructor(public converter: ShowdownConverter, public config: ShowdownConfig) {
      }
    }

    let fixture: TestBedStatic = TestBed.configureTestingModule({
      providers: [SomeService],
      imports: [ShowdownModule.forRoot({foo: 'bar', noHeaderId: true})]
    });
    let someService: SomeService = fixture.get(SomeService);
    let showdownConverter: ShowdownConverter = fixture.get(ShowdownConverter);
    let showdownConfig: ShowdownConfig = fixture.get(ShowdownConfig);

    expect(showdownConverter instanceof ShowdownConverter).toBeTruthy();
    expect(someService.converter).toBe(showdownConverter);
    expect(someService.config).toBe(showdownConfig);
    expect(showdownConverter.getOption('noHeaderId')).toBeTruthy();
    expect(showdownConverter.getOption('foo')).toBe('bar');
  });

  it('should imports the ShowdownModule with flavor ', () => {
    let fixture: TestBedStatic = TestBed.configureTestingModule({
      imports: [ShowdownModule.forRoot({flavor: 'github'})]
    });

    let showdownConfig: ShowdownConfig = fixture.get(ShowdownConfig);
    let showdownConverter: ShowdownConverter = fixture.get(ShowdownConverter);

    expect(showdownConfig.flavor).toBe('github');
    expect(showdownConverter.getFlavor()).toBe('github');
  });

  it('should inject options in the module and other options in the component', () => {
    let componentShowdownConfig: ShowdownConfig = {foo: 'bar', color: 'green', underline: true, flavor: 'original'};

    @Component({
      selector: 'some',
      providers: [
        {provide: ShowdownConfig, useValue: componentShowdownConfig}
      ],
      template: '<showdown>__Some__</showdown>'
    })
    class SomeComponent {
      @ViewChild(ShowdownComponent, {static: true}) component: ShowdownComponent;
    }

    let moduleFixtureShowdownConfig: ShowdownConfig = {noHeaderId: true, color: 'red', flavor: 'ghost'};
    let moduleFixture: TestBedStatic = TestBed.configureTestingModule({
      declarations: [SomeComponent],
      imports: [ShowdownModule.forRoot(moduleFixtureShowdownConfig)]
    });

    let moduleFixtureConfig: ShowdownConfig = moduleFixture.get(ShowdownConfig);
    let componentFixture: ComponentFixture<SomeComponent> = moduleFixture.createComponent(SomeComponent);
    let {componentInstance, nativeElement} = componentFixture;

    componentFixture.detectChanges();

    expect(componentInstance instanceof SomeComponent).toBeTruthy();
    expect(moduleFixtureConfig).toEqual(moduleFixtureShowdownConfig);
    expect(componentInstance.component.getFlavor()).toBe('original');
    expect(componentInstance.component.getOption('color')).toBe('green');
    expect(componentInstance.component.value).toBe('__Some__');
    expect(nativeElement.children[0].innerHTML).toBe('<p><u>Some</u></p>');
  });

});
