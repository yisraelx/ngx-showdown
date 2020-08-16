import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ShowdownModule } from 'ngx-showdown';
import * as Showdown from 'showdown';
import highlightExtension from 'showdown-highlight';

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
