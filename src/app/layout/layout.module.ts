import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PageTitleComponent } from './page-title/page-title.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent, PagenotfoundComponent, PageTitleComponent],
  exports: [HeaderComponent, FooterComponent, SidebarComponent, PagenotfoundComponent, PageTitleComponent],
  imports: [CommonModule, RouterModule],
})
export class LayoutModule {}
