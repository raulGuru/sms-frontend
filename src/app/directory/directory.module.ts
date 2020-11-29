import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryRoutingModule } from './directory-routing.module';
import { DirectoryComponent } from './directory/directory.component';
import { LayoutModule } from '../layout/layout.module';
import { TagsComponent } from './tags/tags.component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [DirectoryComponent, TagsComponent, ContactsComponent],
  imports: [CommonModule, DirectoryRoutingModule, LayoutModule],
})
export class DirectoryModule {}
