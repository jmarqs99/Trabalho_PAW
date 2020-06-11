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

  sessionExpired: boolean;


  isRegistering: boolean = false;
  constructor(private router: Router, private authServive: AuthenticationServiceService) { }
  ngOnInit(): void {
    this.sessionExpired = false;
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['']);
    } else if (localStorage.getItem('sessionExpired')) {
      localStorage.removeItem("sessionExpired")
      this.sessionExpired = true;
    }
  }
  login(): void {
    if (this.nmrCC && this.password) {
      this.authServive.login(this.nmrCC, this.password).subscribe((user: any) => {
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['']);
        }
      }, (err) => {
        alert("Credencias Invalidas!")
      })
    }
    else {
      alert("Faltam preencher campos!")
    }
  }
  register(): void {
    if (this.nmrCC && this.password && this.primeiroNome && this.ultimoNome) {
      this.authServive.register(this.nmrCC, this.password, this.primeiroNome, this.ultimoNome).subscribe((user: any) => {
        this.router.navigate(['/login']);
        this.isRegistering = false;
      }, (err) => {
        alert("Faltam preencher campos!")
      })
    } else {
      alert("Faltam preencher campos!")
    }
  }
}
