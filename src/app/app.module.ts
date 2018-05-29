import { FlickrApiService } from './flickr-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InfiniteScrollerDirective } from './infinite-scroller.directive';

import { MatCardModule, MatProgressBarModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { AuthorComponent } from './author/author.component';
import { MapComponent } from './map/map.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    InfiniteScrollerDirective,
    HomeComponent,
    AuthorComponent,
    MapComponent,
    NotFoundComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MatCardModule,
    MatProgressBarModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  providers: [FlickrApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
