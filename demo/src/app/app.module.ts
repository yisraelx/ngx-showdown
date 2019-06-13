import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ShowdownModule } from 'ngx-showdown';
import * as Showdown from 'showdown';
import * as highlightExtension from 'showdown-highlight';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';

let mdToSdExtension: Showdown.RegexReplaceExtension = {
  type: 'lang',
  regex: new RegExp('`Markdown`', 'g'),
  replace: '`Showdown`'
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    // material
    MatInputModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTooltipModule,
    RouterModule,

    ShowdownModule.forRoot({
      flavor: 'github',
      underline: true,
      extensions: [mdToSdExtension, highlightExtension]
    }),

    AppRoutingModule
  ],
  declarations: [AppComponent, EditorComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
