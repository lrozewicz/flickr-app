import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment  } from '../environments/environment';
import {map} from 'rxjs/operators';

const API_URL = environment.API_URL;
const api_key = environment.api_key;
const BASE_URL = API_URL + '&api_key='+api_key+'&text=dogs&format=json&nojsoncallback=1&extras=url_q,geo,owner_name,date_taken&has_geo=1&per_page=50&page=';
const BASE_URL_AUTHOR = API_URL + '&api_key='+api_key+'&format=json&nojsoncallback=1&extras=url_q,geo,owner_name,date_taken&has_geo=1&per_page=50&page=';

@Injectable()
export class FlickrApiService {

  constructor(private http: Http) { }

  public filter = '';

  public allPhotos: any = [];

  getLatestPhotos(page: number = 1, _currenPage = 'home', userId = '0') {
    if(_currenPage == 'author' && userId != '0') {
      return this.http.get(`${BASE_URL_AUTHOR}${page}&user_id=${userId}`);
    } else if(_currenPage == 'map') { 
      return this.http.get(`${BASE_URL}${page}`);
    } else {
      return this.http.get(`${BASE_URL}${page}`);
    }   
  }

  updatePhotos(photos) {
    this.allPhotos = photos;
  }

  getPhotos() {
    return this.allPhotos;
  }

  sortOn(key: string, photosArray: Array<any>) {
    this.filter = key;
    photosArray.sort(function(a, b){
        if(a[key].toLowerCase() < b[key].toLowerCase()) {
            return -1;
        } else if(a[key].toLowerCase() > b[key].toLowerCase()){
            return 1;
        }
        return 0;
    });
    return photosArray;
  }

  sortReverse(photosArray: Array<any>) {
    return photosArray.reverse();  
  }

  sortDate(key: string, photosArray: Array<any>) {
    this.filter = key;
    photosArray.sort(function(a, b){
        if(parseInt(a[key].replace(/\D/g,'')) < parseInt(b[key].replace(/\D/g,''))) {
            return -1;
        } else if(parseInt(a[key].replace(/\D/g,'')) > parseInt(b[key].replace(/\D/g,''))){
            return 1;
        }
        return 0;
    });
    return photosArray;
  }
}
