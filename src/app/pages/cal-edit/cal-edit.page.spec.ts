import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalEditPage } from './cal-edit.page';

describe('CalEditPage', () => {
  let component: CalEditPage;
  let fixture: ComponentFixture<CalEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
