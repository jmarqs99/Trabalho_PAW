import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilizador } from '../Models/Utilizador';
import { from } from 'rxjs';

@Component({
  selector: 'app-utilizadores',
  templateUrl: './utilizadores.component.html',
  styleUrls: ['./utilizadores.component.css']
})
export class UtilizadoresComponent implements OnInit {

  utilizadores: any = [];
  utilizador: any;
  currentUtilizador: any;
  viewingUtilizador: boolean;
  atualizar: boolean;
  atualizarUtilizador: boolean;
  novoEstado: String;


  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getUtilizadores();
  }


  getUtilizadores() {
    this.utilizadores = [];
    this.rest.getUtilizadores().subscribe((data: {}) => {
      this.utilizadores = data;
    });
  }

  getUtilizador(_id: String) {
    this.utilizador = null;
    this.rest.getUtilizador(_id).subscribe((data: {}) => {
      this.utilizador = data;
    })
  }

  utilizadorInfo(Id: string) {
    if (this.viewingUtilizador) {
      this.viewingUtilizador = false;
    } else {
      let utilizadorResult: any = null;
      new Promise((resolve, reject) => {
        const utilizadores = this.utilizadores;
        utilizadores.forEach(function (utilizador, index) {
          if (utilizador._id == Id) {
            utilizadorResult = utilizador;
            resolve();
          }
          if (index === utilizadores.length - 1) resolve();
        });

      }).then(() => {
        this.currentUtilizador = utilizadorResult;
        this.viewingUtilizador = true
      });
    }
  }


  update() {
    this.rest.updateUtilizador(this.currentUtilizador._id, this.novoEstado)
      .subscribe(res => {
        this.atualizar = false;
        this.getUtilizadores();
        this.viewingUtilizador = false;
        this.utilizadorInfo(this.currentUtilizador._id);
      }, (err) => {
        console.log(err);
      }
      );
  }
  /*  updateUtilizador(Id :string, dados:JSON){
     this.rest.updateUtilizador(this.route.snapshot.params['id'],dados)
   } */


}