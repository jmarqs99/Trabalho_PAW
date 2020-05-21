import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.restService.test().subscribe((user: any) => {
      console.log(user)
    })
  }

}
