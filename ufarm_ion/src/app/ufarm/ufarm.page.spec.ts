import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UfarmPage } from './ufarm.page';

describe('UfarmPage', () => {
  let component: UfarmPage;
  let fixture: ComponentFixture<UfarmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UfarmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UfarmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
