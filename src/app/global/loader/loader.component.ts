import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Input() margin: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  getMargin() {
    if (this.margin) return 35;
    return 0;
  }
}
