import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SellerActivationPage } from './seller-activation.page';

describe('SellerActivationPage', () => {
  let component: SellerActivationPage;
  let fixture: ComponentFixture<SellerActivationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerActivationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SellerActivationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
