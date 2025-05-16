import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-edit-project-dialog',
  templateUrl: './add-edit-project-dialog.component.html',
  styleUrls: ['./add-edit-project-dialog.component.scss'],
})
export class AddEditProjectDialogComponent implements OnInit {
  projectForm!: FormGroup;
  projectId?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.projectId = this.route.snapshot.params['id'];
    if (this.projectId) {
      this.isEditMode = true;
      this.projectService.getProjects().subscribe((projects) => {
        const project = projects.find(
          (p: { projectId: number | undefined }) =>
            p.projectId === this.projectId
        );
        if (project) {
          this.projectForm.patchValue(project);
        }
      });
    }
  }

  submitForm(): void {
    if (this.projectForm.invalid) return;

    const project: Project = this.projectForm.value;

    if (this.isEditMode) {
      this.projectService
        .updateProject(this.projectId!, project)
        .subscribe(() => {
          this.router.navigate(['/admin-dashboard/projects']);
        });
    } else {
      this.projectService.addProject(project).subscribe(() => {
        this.router.navigate(['/admin-dashboard/projects']);
      });
    }
  }
}
