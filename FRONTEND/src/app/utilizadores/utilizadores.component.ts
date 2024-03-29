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
  atualizar: boolean = false;
  atualizarUtilizador: boolean;
  novoEstado: String;
  page = 1;
  pageSize = 10;
  collectionSize;
  numeroTestes: number;
  user: any


  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getUtilizadores();
    this.user = JSON.parse(localStorage.getItem("currentUser"))
  }

  get utilizadoresP(): any[] {
    return this.utilizadores
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  getUtilizadores() {
    this.utilizadores = [];
    this.rest.getUtilizadores().subscribe((data: {}) => {
      this.utilizadores = data;
      this.collectionSize = this.utilizadores.length;
    });
  }

  getUtilizador(_id: String) {
    this.utilizador = null;
    this.rest.getUtilizador(_id).subscribe((data: {}) => {
      this.utilizador = data;
    })
  }

  utilizadorInfo(Id: string) {
    if (this.viewingUtilizador && this.currentUtilizador._id == Id) {
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
        this.novoEstado = utilizadorResult.estado;
        this.atualizar = false;
        if (this.user.role == "ADMIN") {
          this.rest.testesPessoa(this.currentUtilizador.nmrCC).subscribe((data: number) => {
            this.viewingUtilizador = true
            this.currentUtilizador.NumeroTestes = data;
          })
        } else {
          this.viewingUtilizador = true
        }
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


}