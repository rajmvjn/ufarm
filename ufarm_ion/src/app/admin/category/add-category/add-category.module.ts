import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCategoryPageRoutingModule } from './add-category-routing.module';

import { AddCategoryPage } from './add-category.page';
import { SharedModule } from './../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddCategoryPageRoutingModule,
    SharedModule
  ],
  declarations: [AddCategoryPage]
})
export class AddCategoryPageModule {}
