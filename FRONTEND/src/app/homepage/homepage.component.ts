import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user:any
  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
  }

}
