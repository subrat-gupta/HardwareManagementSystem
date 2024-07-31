import { Component } from '@angular/core';
export interface NavigationItem {
  value: string;
  link: string;
}
@Component({
  selector: 'page-side-nav',
  templateUrl: './page-side-nav.component.html',
  styleUrl: './page-side-nav.component.scss'
})
export class PageSideNavComponent {
  panelName: string = 'Admin Panel';
  navItems: NavigationItem[] = [];

  constructor(){
    this.navItems=[
      { value: 'Home', link: 'home' },
      { value: 'Request', link: 'Request' },
      { value: 'Issue/Return', link: 'Issue-Return' },
      { value: 'Search', link: 'Search' },
      { value: 'HW Management', link: 'hardware/management' },
      { value: 'User Management', link: 'User-Management' },
      { value: 'About', link: 'About' },
    ]
  }
}
