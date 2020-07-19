import { Injectable } from '@angular/core';
import { Category } from '../category/category.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categories = new BehaviorSubject<Category[]>([
    new Category('1234', 'Veg', 'This is for all the vegitables', 'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg', true),
    new Category('123', 'Fish', 'This is for all the fishes', 'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg', true),
    new Category('12', 'Meat', 'This is for all the Meats', 'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg', true),
    new Category('1', 'EggsNmilk', 'This is for all the eggs and milka', 'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg', true)
  ]);

  constructor() { }

  get categories() {
    return this._categories.asObservable();
  }

  addCategory(imageData) {
    console.log(imageData);
    const category = new Category('1', 'EggsNmilk', 'This is for all the eggs and milka', imageData, true);
    this._categories.next([category]);
  }
}
