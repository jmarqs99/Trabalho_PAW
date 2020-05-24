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
  utilizador:any;
  currentUtilizador : any;
  viewingUtilizador: boolean;

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

  getUtilizador(_id:String){
    this.utilizador=null;
    this.rest.getUtilizador(_id).subscribe((data:{})=>{
      this.utilizador=data;
    })
  }

  utilizadorInfo(Id :string){
    if (this.viewingUtilizador) {
      this.viewingUtilizador = false;
    } else {
      this.rest.getUtilizador(Id).subscribe((data:{})=>{
        this.currentUtilizador = data;
        this.viewingUtilizador = true;
      });
    }
  }
  

}
