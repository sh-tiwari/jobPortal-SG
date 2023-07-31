import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterLoginComponent } from './recruiter.login.component';

describe('RecruiterLoginComponent', () => {
  let component: RecruiterLoginComponent;
  let fixture: ComponentFixture<RecruiterLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterLoginComponent]
    });
    fixture = TestBed.createComponent(RecruiterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
