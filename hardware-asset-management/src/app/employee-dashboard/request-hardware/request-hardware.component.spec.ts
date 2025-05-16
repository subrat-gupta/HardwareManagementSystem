import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHardwareComponent } from './request-hardware.component';

describe('RequestHardwareComponent', () => {
  let component: RequestHardwareComponent;
  let fixture: ComponentFixture<RequestHardwareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestHardwareComponent]
    });
    fixture = TestBed.createComponent(RequestHardwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
