import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmCategoryComponent } from './farm-category/farm-category.component';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FarmCategoryComponent, 
                  ImagePickerComponent,
                  LocationPickerComponent,
                  MapModalComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [
    FarmCategoryComponent,
    ImagePickerComponent,
    LocationPickerComponent,
    MapModalComponent
  ],
  entryComponents: [FarmCategoryComponent]
})
export class SharedModule { }
