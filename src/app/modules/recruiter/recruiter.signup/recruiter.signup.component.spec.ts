import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterSignupComponent } from './recruiter.signup.component';

describe('RecruiterSignupComponent', () => {
  let component: RecruiterSignupComponent;
  let fixture: ComponentFixture<RecruiterSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterSignupComponent]
    });
    fixture = TestBed.createComponent(RecruiterSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
