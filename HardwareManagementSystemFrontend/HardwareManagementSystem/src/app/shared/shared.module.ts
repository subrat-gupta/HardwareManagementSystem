import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { PageSideNavComponent } from './components/page-side-nav/page-side-nav.component';





@NgModule({
  declarations: [PageHeaderComponent, PageFooterComponent, PageSideNavComponent],
  imports: [CommonModule,MaterialModule],
  exports:[CommonModule,MaterialModule,PageHeaderComponent,PageFooterComponent,PageSideNavComponent]
})
export class SharedModule { }
