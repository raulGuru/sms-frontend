import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DirectoryRoutingModule } from './directory-routing.module';
import { DirectoryComponent } from './directory/directory.component';
import { LayoutModule } from '../layout/layout.module';
import { TagsComponent } from './tags/tags.component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [DirectoryComponent, TagsComponent, ContactsComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DirectoryRoutingModule, LayoutModule],
})
export class DirectoryModule {}
