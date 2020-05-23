import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-utilizadores',
  templateUrl: './utilizadores.component.html',
  styleUrls: ['./utilizadores.component.css']
})
export class UtilizadoresComponent implements OnInit {

  utilizadores:any=[]; 

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getUtilizadores();
  }


  getUtilizadores(){
    this.utilizadores = [];
    this.rest.getUtilizadores().subscribe((data:{})=>{
      this.utilizadores = data;
    });
  }

  

}
