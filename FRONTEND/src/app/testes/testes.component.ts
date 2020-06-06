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
    this.rest.verTestes().subscribe((data: {}) => {
      this.testes = data;
      this.collectionSize = this.testes.length;
    });
  }

  addTeste() {
    this.rest.criarTeste(this.teste).subscribe((result: Teste) => {
      this.addingTeste = false;
      this.getTestes();
      //this.addingTeste = false;
    }, (err) => {
      console.log(err);
    })

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
