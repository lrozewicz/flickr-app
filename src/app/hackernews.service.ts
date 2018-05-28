import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

//const BASE_URL = 'https://node-hnapi.herokuapp.com';
const BASE_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f1139d5c6793d0a4e46d8a84cb729107&text=dogs&format=json&nojsoncallback=1&extras=url_q,geo,owner_name,date_taken&has_geo=1&per_page=50&page=';

@Injectable()
export class HackerNewsService {

  constructor(private http: Http) { }

  getLatestStories(page: number = 1) {
    //return this.http.get(`${BASE_URL}/news?page=${page}`);
    
    return this.http.get(`${BASE_URL}${page}`);
  }
}
