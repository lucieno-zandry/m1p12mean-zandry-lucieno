import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestGuardComponent } from './guest-guard.component';

describe('GuestGuardComponent', () => {
  let component: GuestGuardComponent;
  let fixture: ComponentFixture<GuestGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestGuardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
