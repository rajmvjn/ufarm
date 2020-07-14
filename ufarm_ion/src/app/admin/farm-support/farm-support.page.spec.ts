import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarmSupportPage } from './farm-support.page';

describe('FarmSupportPage', () => {
  let component: FarmSupportPage;
  let fixture: ComponentFixture<FarmSupportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmSupportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
