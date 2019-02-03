import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiquidsComponent } from './liquids/liquids.component';
import { PumpsComponent } from './pumps/pumps.component';
import { DrinksComponent } from './drinks/drinks.component';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';
import { PumpDetailComponent } from './pump-detail/pump-detail.component';

const routes: Routes = [{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
  { path: 'liquids', component: LiquidsComponent },
  { path: 'drink-detail/:id', component: DrinkDetailComponent },
  { path: 'drinks', component: DrinksComponent },
  { path: 'pumps', component: PumpsComponent },
  { path: 'pump-detail/:id', component: PumpDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
