import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiquidsComponent } from './liquids/liquids.component';

const routes: Routes = [{ path: '', redirectTo: '/liquids', pathMatch: 'full' },
  { path: 'liquids', component: LiquidsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
