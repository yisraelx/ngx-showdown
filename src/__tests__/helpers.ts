import { Component, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { TestBed, ComponentFixture, TestModuleMetadata } from '@angular/core/testing';

export  function createComponentFixture<T>(moduleMetadata: TestModuleMetadata, componentOptions: ICreateComponentOptions | Function): ComponentFixture<T> {
        let component: Type<T> = typeof componentOptions === 'object' ? createComponent(componentOptions) as any : componentOptions;

        moduleMetadata = Object.assign({declarations: [], schemas: [NO_ERRORS_SCHEMA]}, moduleMetadata);
        if (moduleMetadata.declarations.indexOf(component) === -1) moduleMetadata.declarations.push(component);

        return TestBed.configureTestingModule(moduleMetadata).createComponent<T>(component);
}

export interface ICreateComponentOptions {
  Class?: Function;
  scope?: {[key: string]: any};
  metadata?: Component;
}

export function createComponent({metadata = {}, Class, scope = {}}: ICreateComponentOptions): Function {
        @Component(metadata)
        class ClassComponent extends (Class || class {} as any) {
        }
        Object.assign(ClassComponent.prototype, scope);
        return ClassComponent;
}
