import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { UserDetailsDialogComponent } from '../user-details-dialog/user-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  users: any[] = [];
  projects: any[] = [];
  hardware: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private dialog: MatDialog,
    private hardwareService: HardwareService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];
      this.searchService.search(this.searchQuery).subscribe(
        (response) => {
          this.users = response.users;
          this.projects = response.projects;
          this.hardware = response.hardware;
        },
        (error) => {
          console.error('Error during search:', error);
        }
      );
    });
  }
  openUserDialog(user: any): void {
  this.hardwareService
    .getMyIssuedHardware(user.userId)
    .subscribe((hardware) => {
      console.log('Issued hardware:', hardware); // ✅ Logs the response

      this.dialog.open(UserDetailsDialogComponent, {
        width: '1000px',
        data: {
          user: user,
          issuedHardware: hardware,
        },
      });
    });
}

}
