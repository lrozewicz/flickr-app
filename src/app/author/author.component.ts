import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpModule } from '@angular/http';
import { FlickrApiService } from '../flickr-api.service'
import { InfiniteScrollerDirective } from '../infinite-scroller.directive';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent {

  

  constructor(private activatedRoute: ActivatedRoute, private flickrApiService: FlickrApiService) { 
    this.userID = activatedRoute.snapshot.params['id'];
    this._currentPage = activatedRoute.snapshot.url[0].path;
    this.scrollCallback = this.getPhotos.bind(this); 
  }

  userID: string;
  _currentPage: string;
  authorName: string = '';
  errorMessage: string = '';
  error: number = 1;


  currentPage: number = 1;

  photos: Array<any> = [];

  scrollCallback;


  getPhotos() {
    return this.flickrApiService.getLatestPhotos(this.currentPage, this._currentPage, this.userID).do(this.processData, (error) => {
      this.error = 1; 
      this.errorMessage = "Nie można połączyć się z serwerem!";
    });
  }

  private processData = (items) => {
    this.currentPage++;
    let data = JSON.parse(items._body);

    if(data.stat == 'ok') {
      this.error = 0;
      this.errorMessage = '';

      this.photos = this.photos.concat(data.photos.photo);
      this.flickrApiService.updatePhotos(this.photos);
      this.authorName = (data.photos.photo)[0].ownername;
    } else {    
      this.error = 1; 
      this.errorMessage = data.message;
    }
  }

}
