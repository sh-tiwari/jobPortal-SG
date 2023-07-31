import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterFooterComponent } from './recruiter-footer.component';

describe('RecruiterFooterComponent', () => {
  let component: RecruiterFooterComponent;
  let fixture: ComponentFixture<RecruiterFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterFooterComponent]
    });
    fixture = TestBed.createComponent(RecruiterFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
