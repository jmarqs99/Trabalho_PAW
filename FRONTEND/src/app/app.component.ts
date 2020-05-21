import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from './authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  user : any ;

  constructor(private router: Router, private authServive: AuthenticationServiceService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
  }
  logout(): void {
    this.authServive.logout().subscribe(() => {
      this.router.navigate(['']);
    }
    );

  }
}
