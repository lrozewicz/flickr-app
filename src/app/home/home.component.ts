import { Component, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http';
import { FlickrApiService } from '../flickr-api.service';
import { InfiniteScrollerDirective } from '../infinite-scroller.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  title = '';
  errorMessage: string = '';
  error: number = 1;

  clickedName = {};

  currentPage: number = 1;

  photos: Array<any> = [];

  scrollCallback;

  constructor(private flickrApiService: FlickrApiService) {
    this.title = 'Flickr App - strona główna';
    this.scrollCallback = this.getPhotos.bind(this);
   }

   getPhotos() {
    return this.flickrApiService.getLatestPhotos(this.currentPage).do(this.processData, (error) => {
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

      if(this.flickrApiService.filter != '') {
        this.sortTitle(this.flickrApiService.filter);  
      }

      this.flickrApiService.updatePhotos(this.photos);
    } else {    
      this.error = 1; 
      this.errorMessage = data.message;
    }

  }

  sortTitle(name) {
    this.clickedName[name] = (this.clickedName[name] == true || (this.clickedName[name] instanceof Boolean) == false) ? this.clickedName[name] = false : this.clickedName[name] = true;
    
    if(this.clickedName[name]) {
      this.photos = this.flickrApiService.sortOn(name, this.photos);   
    } else {
      if(name == this.flickrApiService.filter) {
        this.photos = this.flickrApiService.sortReverse(this.photos); 
      } else {
        this.photos = this.flickrApiService.sortOn(name, this.photos);
      }       
    }     
  }

  sortDate(name) {
    this.clickedName[name] = (this.clickedName[name] == true || (this.clickedName[name] instanceof Boolean) == false) ? this.clickedName[name] = false : this.clickedName[name] = true;
    
    if(this.clickedName[name]) {
      this.photos = this.flickrApiService.sortDate(name, this.photos);   
    } else {
      if(name == this.flickrApiService.filter) {
        this.photos = this.flickrApiService.sortReverse(this.photos); 
      } else {
        this.photos = this.flickrApiService.sortDate(name, this.photos);
      }       
    } 
  }

}
