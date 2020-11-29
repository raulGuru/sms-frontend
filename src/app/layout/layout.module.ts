import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent, PagenotfoundComponent],
  exports: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [CommonModule, RouterModule],
})
export class LayoutModule {}
