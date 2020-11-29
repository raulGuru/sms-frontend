import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectoryComponent } from './directory/directory.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TagsComponent } from './tags/tags.component';

const routes: Routes = [
  {
    path: '', 
    component: DirectoryComponent,
    children: [
      { path: '', component: ContactsComponent },
      { path: 'contacttags', component: TagsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectoryRoutingModule { }
