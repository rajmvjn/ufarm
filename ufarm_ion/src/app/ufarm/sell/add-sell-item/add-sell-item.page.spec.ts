import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSellItemPage } from './add-sell-item.page';

describe('AddSellItemPage', () => {
  let component: AddSellItemPage;
  let fixture: ComponentFixture<AddSellItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSellItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSellItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
