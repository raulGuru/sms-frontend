import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { PagenotfoundComponent } from './layout/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'campaigns', 
    loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'directory', 
    loadChildren: () => import('./directory/directory.module').then(m => m.DirectoryModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'login', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
