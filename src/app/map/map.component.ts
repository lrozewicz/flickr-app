import { Component, OnInit, ViewChild  } from '@angular/core';
import { } from '@types/googlemaps';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { FlickrApiService } from '../flickr-api.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  marker = [];
  infowindow = [];
  title = 'Mapa';

  constructor(private flickrApiService: FlickrApiService) {
    
  }

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    if(this.flickrApiService.getPhotos().length == 0) {
      return this.flickrApiService.getLatestPhotos(1, 'map').subscribe((getData: any) => {
      let data = JSON.parse(getData._body).photos.photo;
      this.flickrApiService.updatePhotos(data);
      this.addMarkers(data);
      });
    } else {
      this.addMarkers(this.flickrApiService.getPhotos());
    }

  }

  addMarkers(photos) {

    photos.forEach((element, index) => {
      let position = { lat: parseInt(element.latitude), lng: parseInt(element.longitude) };
      this.marker[index] = new google.maps.Marker({
          position: position,
          map: this.map,
          title: element.title
      });

      this.infowindow[index] = new google.maps.InfoWindow({
        content: '<img src="'+element.url_q +'" />'
      });

      this.marker[index].addListener('click', () => {
        this.markerHandler(index);
      });

    });
  }

  markerHandler(id) {
    this.infowindow[id].open(this.map, this.marker[id]); 
  }

}
