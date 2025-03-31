import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedHomepageComponent } from './unauthorized-homepage.component';

describe('UnauthorizedHomepageComponent', () => {
  let component: UnauthorizedHomepageComponent;
  let fixture: ComponentFixture<UnauthorizedHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnauthorizedHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthorizedHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
