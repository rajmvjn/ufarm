import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit, OnDestroy {

  categories: Category[];
  private categoriesSub: Subscription;

  constructor(private catService: CategoryService) { }

  ngOnInit() {
    this.categoriesSub = this.catService.categories.subscribe( cats =>{
      this.categories = cats;      
    })
  }


  ngOnDestroy() {
    if(this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
  }
    
}
