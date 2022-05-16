import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastWeekShiftsComponent } from './past-week-shifts.component';

describe('PastWeekShiftsComponent', () => {
  let component: PastWeekShiftsComponent;
  let fixture: ComponentFixture<PastWeekShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastWeekShiftsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastWeekShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
