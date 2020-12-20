import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import { DirectoryRoutingModule } from './directory-routing.module';
import { DirectoryComponent } from './directory/directory.component';
import { LayoutModule } from '../layout/layout.module';
import { TagsComponent } from './tags/tags.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DirectoryService} from './directory.service'

@NgModule({
  declarations: [DirectoryComponent, TagsComponent, ContactsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbPaginationModule,
    DirectoryRoutingModule,
    LayoutModule,
  ],
  providers: [
    DirectoryService
  ]
})
export class DirectoryModule {}
