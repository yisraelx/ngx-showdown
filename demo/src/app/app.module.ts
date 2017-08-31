import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdInputModule,
    MdSlideToggleModule,
    MdSliderModule,
    MdToolbarModule,
    MdButtonModule,
    MdListModule,
    MdSidenavModule,
    MdIconModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { ShowdownModule } from '../../../src';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ShowdownModule,
        // material
        MdInputModule,
        MdSlideToggleModule,
        MdSliderModule,
        MdToolbarModule,
        MdButtonModule,
        MdListModule,
        MdSidenavModule,
        MdIconModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}