import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmCategoryComponent } from './farm-category/farm-category.component';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FarmCategoryComponent, 
                  ImagePickerComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [
    FarmCategoryComponent,
    ImagePickerComponent
  ],
  entryComponents: [FarmCategoryComponent]
})
export class SharedModule { }
