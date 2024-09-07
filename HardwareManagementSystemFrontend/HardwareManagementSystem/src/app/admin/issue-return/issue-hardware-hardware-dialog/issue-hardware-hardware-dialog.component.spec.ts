import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueHardwareHardwareDialogComponent } from './issue-hardware-hardware-dialog.component';

describe('IssueHardwareHardwareDialogComponent', () => {
  let component: IssueHardwareHardwareDialogComponent;
  let fixture: ComponentFixture<IssueHardwareHardwareDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueHardwareHardwareDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssueHardwareHardwareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
