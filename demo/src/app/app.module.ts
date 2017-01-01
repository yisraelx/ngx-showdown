import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { MdModule } from '../../../src';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MaterialModule.forRoot(),
        MdModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}