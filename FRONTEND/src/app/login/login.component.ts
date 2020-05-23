import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() nmrCC: string;
  @Input() password: string;
  @Input() primeiroNome: string;
  @Input() ultimoNome: string;
 

  isRegistering: boolean = false;
  constructor(private router: Router, private authServive: AuthenticationServiceService) { }
  ngOnInit(): void {
    if (localStorage.getItem('currentUser')){
      this.router.navigate(['']);
    }
  }
  login(): void {
    this.authServive.login(this.nmrCC, this.password).subscribe((user: any) => {
      if (user) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['']);
      }
    })
  }
  register(): void {
    this.authServive.register(this.nmrCC,this.password,this.primeiroNome, this.ultimoNome).subscribe((user: any) => {
    this.router.navigate(['/login']);
    this.isRegistering = false;
    })
  }
}
