import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  photoID: string;

  constructor(private route: ActivatedRoute) { 
    this.photoID = route.snapshot.params['id'];
  }

  ngOnInit() {
  }

}
