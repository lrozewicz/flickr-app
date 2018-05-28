import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpModule } from '@angular/http';
import { HackerNewsService } from '../hackernews.service'
import { InfiniteScrollerDirective } from '../infinite-scroller.directive';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {

  

  constructor(private activatedRoute: ActivatedRoute, private hackerNewsSerivce: HackerNewsService) { 
    this.title = 'Angular Infinite Scroller with RxJS';
    this.scrollCallback = this.getStories.bind(this);
    console.log(activatedRoute.snapshot.url[0].path);
    console.log(activatedRoute.snapshot.params['id']);
    this.photoID = activatedRoute.snapshot.params['id'];
  }

  photoID: string;

  title = '';

  currentPage: number = 1;

  photos: Array<any> = [];

  scrollCallback;


  getStories() {
    return this.hackerNewsSerivce.getLatestStories(this.currentPage).do(this.processData);
  }

  private processData = (news) => {
    this.currentPage++;
    let data = JSON.parse(news._body);
    this.photos = this.photos.concat(data.photos.photo);
  }

}
