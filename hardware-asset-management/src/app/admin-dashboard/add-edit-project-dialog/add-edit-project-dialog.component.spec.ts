import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProjectDialogComponent } from './add-edit-project-dialog.component';

describe('AddEditProjectDialogComponent', () => {
  let component: AddEditProjectDialogComponent;
  let fixture: ComponentFixture<AddEditProjectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditProjectDialogComponent]
    });
    fixture = TestBed.createComponent(AddEditProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
