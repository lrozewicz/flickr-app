import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpModule } from '@angular/http';
import { HackerNewsService } from '../hackernews.service'
import { InfiniteScrollerDirective } from '../infinite-scroller.directive';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent {

  

  constructor(private activatedRoute: ActivatedRoute, private hackerNewsSerivce: HackerNewsService) { 
    this.title = 'Angular Infinite Scroller with RxJS';
    this.userID = activatedRoute.snapshot.params['id'];
    this._currentPage = activatedRoute.snapshot.url[0].path;
    this.scrollCallback = this.getPhotos.bind(this); 
  }

  userID: string;
  _currentPage: string;
  authorName: string = '';

  title = '';

  currentPage: number = 1;

  photos: Array<any> = [];

  scrollCallback;


  getPhotos() {
    return this.hackerNewsSerivce.getLatestPhotos(this.currentPage, this._currentPage, this.userID).do(this.processData);
  }

  private processData = (news) => {
    this.currentPage++;
    let data = JSON.parse(news._body);
    this.photos = this.photos.concat(data.photos.photo);
    this.authorName = (data.photos.photo)[0].ownername;
  }

}
