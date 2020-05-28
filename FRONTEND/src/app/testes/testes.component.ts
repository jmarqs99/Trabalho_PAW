import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testes',
  templateUrl: './testes.component.html',
  styleUrls: ['./testes.component.css']
})
export class TestesComponent implements OnInit {

  testes: any = [];
  teste: any;
  currentTeste: any;
  viewingTeste: boolean;
  atualizar: boolean = false; 
  atualizarTeste: boolean;
  novoEstado: String;
  novoResultado: String;
  addingTeste: boolean;
  page = 1;
  pageSize = 10;
  collectionSize;

  constructor(private router: Router, public rest: RestService) { }

  ngOnInit(): void {
    this.getTestes();
    return this.testes
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  getTestes() {
    this.testes = [];
    this.rest.verTestes().subscribe((data: {}) => {
      this.testes = data;
      this.collectionSize = this.testes.length;
    });
  }

  addTeste() {
    this.rest.criarTeste(this.teste).subscribe((data: {}) => {
      this.getTestes();
      this.addingTeste = false;
    });
  }

  testeInfo(testeId: string) {
    if (this.viewingTeste && this.currentTeste._id == testeId) {
      this.viewingTeste = false;
    } else {
      let testeResult: any = null;
      new Promise((resolve, reject) => {
        const testes = this.testes;
        testes.forEach(function (teste, index) {
          if (teste._id == testeId) {
            testeResult = teste;
            resolve();
          }
          if (index === testes.length - 1) resolve();
        });
      }).then(() => {
        this.currentTeste = testeResult;
        this.novoEstado = testeResult.estado;
        this.atualizar = false;
        this.viewingTeste = true
      });
    }
  }

  update() {
    this.rest.updateUtilizador(this.currentTeste._id, this.novoEstado)
      .subscribe(res => {
        this.atualizar = false;
        this.getTestes();
        this.viewingTeste = false;
        this.testeInfo(this.currentTeste._id);
      }, (err) => {
        console.log(err);
      }
      );
  }

  deleteTeste(testeId: string){

  }


}
