import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-farm-category',
  templateUrl: './farm-category.component.html',
  styleUrls: ['./farm-category.component.scss'],
})
export class FarmCategoryComponent implements OnInit {

  @Output() catgoryChange = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  private onCatChange(event: CustomEvent) {
    this.catgoryChange.emit(event);
  }

}
