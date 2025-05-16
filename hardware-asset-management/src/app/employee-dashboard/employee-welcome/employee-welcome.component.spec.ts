import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWelcomeComponent } from './employee-welcome.component';

describe('EmployeeWelcomeComponent', () => {
  let component: EmployeeWelcomeComponent;
  let fixture: ComponentFixture<EmployeeWelcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeWelcomeComponent]
    });
    fixture = TestBed.createComponent(EmployeeWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
