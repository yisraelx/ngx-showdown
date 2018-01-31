import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatInputModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule
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
        MatInputModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatToolbarModule,
        MatButtonModule,
        MatListModule,
        MatSidenavModule,
        MatIconModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}