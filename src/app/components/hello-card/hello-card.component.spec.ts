import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloCardComponent } from './hello-card.component';

describe('HelloCardComponent', () => {
  let component: HelloCardComponent;
  let fixture: ComponentFixture<HelloCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelloCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
