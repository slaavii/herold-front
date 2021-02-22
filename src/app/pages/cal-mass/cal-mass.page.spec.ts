import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalMassPage } from './cal-mass.page';

describe('CalMassPage', () => {
  let component: CalMassPage;
  let fixture: ComponentFixture<CalMassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalMassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalMassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
