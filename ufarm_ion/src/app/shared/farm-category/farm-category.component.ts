import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { Subscription } from "rxjs";
import { Category } from "../../admin/category/category.model";
import { CategoryService } from "../../admin/category/category.service";

@Component({
  selector: "app-farm-category",
  templateUrl: "./farm-category.component.html",
  styleUrls: ["./farm-category.component.scss"],
})
export class FarmCategoryComponent implements OnInit, OnDestroy {
  categories: Category[];
  catsSub: Subscription;

  @Output() catgoryChange = new EventEmitter();

  constructor(private catService: CategoryService) {}

  ngOnInit() {
    this.catsSub = this.catService.categories.subscribe((cats: Category[]) => {
      this.categories = cats;
    });
  }

  onCatChange(event: CustomEvent) {
    this.catgoryChange.emit(event);
  }

  ngOnDestroy() {
    if (this.catsSub) {
      this.catsSub.unsubscribe();
    }
  }
}
