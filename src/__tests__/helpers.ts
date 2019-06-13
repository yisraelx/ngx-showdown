import { Component, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';

export function createComponentFixture<T>(moduleMetadata: TestModuleMetadata, componentOptions: ICreateComponentOptions | (new (...args: any[]) => any)): ComponentFixture<T> {
  let component: Type<T> = typeof componentOptions === 'object' ? createComponent(componentOptions) as any : componentOptions;

  moduleMetadata = Object.assign({declarations: [], schemas: [NO_ERRORS_SCHEMA]}, moduleMetadata);
  if (moduleMetadata.declarations.indexOf(component) === -1) {
    moduleMetadata.declarations.push(component);
  }

  return TestBed.configureTestingModule(moduleMetadata).createComponent<T>(component);
}

export interface ICreateComponentOptions {
  Class?: (new (...args: any[]) => any);
  scope?: {[key: string]: any};
  metadata?: Component;
}

export function createComponent({metadata = {}, Class, scope = {}}: ICreateComponentOptions): (new (...args: any[]) => any) {

  class ClassComponent extends (Class as any || class {
  }) {
  }

  Object.assign(ClassComponent.prototype, scope);

  return Component(metadata)(ClassComponent);
}
