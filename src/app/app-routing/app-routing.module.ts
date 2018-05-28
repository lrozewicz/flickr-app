import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AuthorComponent } from '../author/author.component';
import { MapComponent } from '../map/map.component';
import { NotFoundComponent } from '../not-found/not-found.component';



const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'author/:id', component: AuthorComponent },
  { path: 'map', component: MapComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
