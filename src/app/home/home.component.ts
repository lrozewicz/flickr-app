import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { HttpModule } from '@angular/http';
import { HackerNewsService } from '../hackernews.service';
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

  constructor(private hackerNewsSerivce: HackerNewsService) {
    this.title = 'Angular Infinite Scroller with RxJS';
    this.scrollCallback = this.getPhotos.bind(this);
   }

   getPhotos() {
    return this.hackerNewsSerivce.getLatestPhotos(this.currentPage).do(this.processData, (error) => {
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

      if(this.hackerNewsSerivce.filter != '') {
        this.sortTitle(this.hackerNewsSerivce.filter);  
      }

      this.hackerNewsSerivce.updatePhotos(this.photos);
    } else {    
      this.error = 1; 
      this.errorMessage = data.message;
    }

  }

  sortTitle(name) {
    this.clickedName[name] = (this.clickedName[name] == true || (this.clickedName[name] instanceof Boolean) == false) ? this.clickedName[name] = false : this.clickedName[name] = true;
    
    if(this.clickedName[name]) {
      this.photos = this.hackerNewsSerivce.sortOn(name, this.photos);   
    } else {
      if(name == this.hackerNewsSerivce.filter) {
        this.photos = this.hackerNewsSerivce.sortReverse(this.photos); 
      } else {
        this.photos = this.hackerNewsSerivce.sortOn(name, this.photos);
      }       
    }     
  }

  sortDate(name) {
    this.clickedName[name] = (this.clickedName[name] == true || (this.clickedName[name] instanceof Boolean) == false) ? this.clickedName[name] = false : this.clickedName[name] = true;
    
    if(this.clickedName[name]) {
      this.photos = this.hackerNewsSerivce.sortDate(name, this.photos);   
    } else {
      if(name == this.hackerNewsSerivce.filter) {
        this.photos = this.hackerNewsSerivce.sortReverse(this.photos); 
      } else {
        this.photos = this.hackerNewsSerivce.sortDate(name, this.photos);
      }       
    } 
  }

}
