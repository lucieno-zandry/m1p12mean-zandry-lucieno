import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestAppointmentComponent } from './nearest-appointment.component';

describe('NearestAppointmentComponent', () => {
  let component: NearestAppointmentComponent;
  let fixture: ComponentFixture<NearestAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NearestAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearestAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
