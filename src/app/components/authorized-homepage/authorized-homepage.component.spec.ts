import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedHomepageComponent } from './authorized-homepage.component';

describe('AuthorizedHomepageComponent', () => {
  let component: AuthorizedHomepageComponent;
  let fixture: ComponentFixture<AuthorizedHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizedHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizedHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
