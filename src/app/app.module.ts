import { HackerNewsService } from './hackernews.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InfiniteScrollerDirective } from './infinite-scroller.directive';

import { MatCardModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { AuthorComponent } from './author/author.component';
import { MapComponent } from './map/map.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    InfiniteScrollerDirective,
    HomeComponent,
    AuthorComponent,
    MapComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MatCardModule,
    AppRoutingModule
  ],
  providers: [HackerNewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
