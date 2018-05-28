import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment  } from '../environments/environment';

const API_URL = environment.API_URL;
const api_key = environment.api_key;
const BASE_URL = API_URL + '&api_key='+api_key+'&text=dogs&format=json&nojsoncallback=1&extras=url_q,geo,owner_name,date_taken&has_geo=1&per_page=50&page=';
const BASE_URL_AUTHOR = API_URL + '&api_key='+api_key+'&format=json&nojsoncallback=1&extras=url_q,geo,owner_name,date_taken&has_geo=1&per_page=50&page=';
@Injectable()
export class HackerNewsService {

  constructor(private http: Http) { }

  getLatestStories(page: number = 1, currenPage = 'home', userId = 0) {
    //const currenPage: string = this.route.url.join('') === '' ? 'home' :  this.route.url.join('');
    if(currenPage == 'author' && userId != 0) {
      return this.http.get(`${BASE_URL_AUTHOR}${page}&user_id=${userId}`);
    } else {
      return this.http.get(`${BASE_URL}${page}`);
    }
    
  }
}
