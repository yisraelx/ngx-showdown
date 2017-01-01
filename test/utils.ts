import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, TestModuleMetadata } from '@angular/core/testing';

export default class Utils {

    static createFixture<T>(moduleMetadata: TestModuleMetadata, component: any): ComponentFixture<T> {
        if (typeof component === 'object') component = this.createComponent(component);

        moduleMetadata = Object.assign({declarations: [], schemas: [NO_ERRORS_SCHEMA]}, moduleMetadata);
        if (moduleMetadata.declarations.indexOf(component) === -1) moduleMetadata.declarations.push(component);

        return TestBed.configureTestingModule(moduleMetadata).createComponent<T>(component);
    }

    static createComponent({
        metadata = {}, Class = class {
    }, scope = {}
    }: {Class?: Function, scope?: {[key: string]: any}, metadata?: Component}) {
        Object.assign((Class as Function).prototype, scope);
        return Component(metadata)(Class);
    }

}