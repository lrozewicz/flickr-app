import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { HttpModule } from '@angular/http';
import { HackerNewsService } from '../hackernews.service'
import { InfiniteScrollerDirective } from '../infinite-scroller.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  title = '';

  currentPage: number = 1;

  photos: Array<any> = [];

  scrollCallback;

  constructor(private hackerNewsSerivce: HackerNewsService) {
    this.title = 'Angular Infinite Scroller with RxJS';
    this.scrollCallback = this.getPhotos.bind(this);
   }

   getPhotos() {
    return this.hackerNewsSerivce.getLatestPhotos(this.currentPage).do(this.processData);
  }

  private processData = (news) => {
    this.currentPage++;
    let data = JSON.parse(news._body);
    this.photos = this.photos.concat(data.photos.photo);
  }

}