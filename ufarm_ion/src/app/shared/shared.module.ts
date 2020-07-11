import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmCategoryComponent } from './farm-category/farm-category.component';

@NgModule({
  declarations: [FarmCategoryComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FarmCategoryComponent
  ]
})
export class SharedModule { }
