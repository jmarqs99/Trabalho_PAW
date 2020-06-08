import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { Teste } from '../Models/Teste';
//import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
//import datepicker from './datepicker';


@Component({
  selector: 'app-testes',
  templateUrl: './testes.component.html',
  styleUrls: ['./testes.component.css']
})
export class TestesComponent implements OnInit {

  user: any;

  testes: any = [];

  currentTeste: any;
  viewingTeste: boolean;
  atualizar: boolean = false;
  atualizarTeste: boolean;
  novoEstado: String;
  novoResultado: String;
  addingTeste: boolean = false;
  //date: NgbDate;
  page = 1;
  pageSize = 10;
  collectionSize;
  viewingPesquisarID: boolean = false;
  viewingPesquisarCC: boolean = false;
  IDpesquisa: String;
  ccpesquisa: String;

  //data: Date = new Date();
  //settings = {
  //  bigBanner: true,
  //timePicker: false,
  //format: 'dd-MM-yyyy',
  //defaultOpen: true
  //}



  @Input() teste: Teste = new Teste();

  constructor(private router: Router, public rest: RestService) { }

  ngOnInit(): void {
    this.getTestes();
    //this.user = JSON.parse(localStorage.getItem("currentTeste"))
  }


  get testesP(): any[] {
    return this.testes
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  getTestes() {
    this.testes = [];
    this.viewingPesquisarID = false;
    this.viewingPesquisarCC = false;
    this.rest.verTestes().subscribe((data: {}) => {
      this.testes = data;
      this.collectionSize = this.testes.length;
    });
  }

  addTeste() {
    this.rest.criarTeste(this.teste).subscribe((result: Teste) => {
      this.addingTeste = false;
      this.getTestes();
      this.teste.pedidoId = null;
      this.teste.date = null;
      
      //this.addingTeste = false;
    }, (err) => {
      console.log(err);
    })

  }

  validarTeste() {
    if(this.teste.pedidoId == null || this.teste.pedidoId == '' || this.teste.date == null) {
      window.alert("Faltam preencher campos!");
     }
  }
  

  listarID() {
    this.rest.verTestes().subscribe((data: {}) => {

      this.testes = data;
      this.viewingPesquisarID = true;
      var testesTemp = [];
      new Promise((resolve, reject) => {
        const testes = this.testes;

        const resultToSearchID = this.IDpesquisa;

        testes.forEach(function (teste, index) {

          if (teste._id == resultToSearchID) {
            testesTemp.push(teste);
            resolve();
          }

          if (index === testes.length - 1) resolve();
        });
      }).then(() => {

        this.testes = testesTemp;
        this.IDpesquisa = null;
      });
    });
  }

  

  validarId() {
   if(this.IDpesquisa == null || this.IDpesquisa == '') {
    window.alert("Faltam preencher campos!");
    this.getTestes()
   }
  }

  pesquisaCC() {
    this.rest.verTestes().subscribe((data: {}) => {

      this.testes = data;
      this.viewingPesquisarCC = true;
      var testesTemp = [];
      new Promise((resolve, reject) => {
        const testes = this.testes;

        const resultToSearchCC = this.ccpesquisa;

        testes.forEach(function (teste, index) {

          if (teste.nmrCC == resultToSearchCC) {
            testesTemp.push(teste);
            resolve();
          }

          if (index === testes.length - 1) resolve();
        });
      }).then(() => {

        this.testes = testesTemp;
        this.ccpesquisa = null;
      });
    });
  }

  validarCC() {
    if(this.ccpesquisa == null || this.ccpesquisa == '') {
     window.alert("Faltam preencher campos!");
     this.getTestes()
    }
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
        if (Date.parse(testeResult.date)) {
          const data = new Date(testeResult.date)
          this.currentTeste.date = (data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear() + " " + data.getHours() + "h")
        }
        this.novoEstado = testeResult.estado;
        this.atualizar = false;
        this.viewingTeste = true
      });
    }
  }

  update() {
    this.rest.updateTeste(this.currentTeste._id, this.teste)
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

  deleteTeste(testeId: string) {
    var doRemove = confirm("Queres mesmo remover este teste?");
    if (doRemove == true) {
      this.rest.deleteTeste(testeId)
        .subscribe(res => {
          this.getTestes();
        }, (err) => {
          console.log(err);
        }
        );
    }
  }


}
