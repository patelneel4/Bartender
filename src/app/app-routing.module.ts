import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiquidsComponent } from './liquids/liquids.component';
import { DrinksComponent } from './drinks/drinks.component';


const routes: Routes = [{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
  { path: 'liquids', component: LiquidsComponent },
  { path: 'drinks', component: DrinksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
