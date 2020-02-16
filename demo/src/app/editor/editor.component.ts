import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ShowdownComponent } from 'ngx-showdown';
import * as Showdown from 'showdown';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild(ShowdownComponent, {static: true}) showdownComponent: ShowdownComponent;

  schema: any = Showdown.getDefaultOptions(false);
  optionsKeys: string[] = Object.keys(this.schema);
  flavors: Showdown.Flavor[] = ['allOn', 'ghost', 'github', 'original', 'vanilla'];

  markdown: string = '';
  options: Showdown.ShowdownOptions;
  sanitize: boolean = false;
  flavor: Showdown.Flavor;

  constructor(public http: HttpClient) {
  }

  ngOnInit(): void {
    this.flavor = this.showdownComponent.getFlavor();
    this.options = this.showdownComponent.getOptions();
    this
      .http
      .get('./assets/example.md', {responseType: 'text'})
      .subscribe((res) => this.markdown = res);
  }

  optionChange(key: string, value: any): void {
    this.showdownComponent.setOption(key, value);
    this.showdownComponent.render();
  }

  flavorChange(flavor: Showdown.Flavor): void {
    if (flavor !== 'vanilla' && flavor !== 'allOn') {
      this.showdownComponent.setFlavor('vanilla');
    }
    this.showdownComponent.setFlavor(flavor);
    this.showdownComponent.render();
  }

}
