import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpComingShiftComponent } from './up-coming-shift.component';

describe('UpComingShiftComponent', () => {
  let component: UpComingShiftComponent;
  let fixture: ComponentFixture<UpComingShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpComingShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpComingShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
