import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { Teste } from '../Models/Teste';
//import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
//import datepicker from './datepicker';


@Component({
  selector: 'app-testes',
  templateUrl: './testes.component.html',
  styleUrls: ['./testes.component.css'],
  /**
    template: `
        <div class="example-config">
            Only values between <strong>{{min | kendoDate:'g'}}</strong> and <strong>{{max | kendoDate:'g'}}</strong> are displayed in the Calendar and the TimePicker.
        </div>
        <div class="example-wrapper">
            <kendo-datetimepicker
                [min]="min"
                [max]="max"
            >
            </kendo-datetimepicker>
        </div>
        
    `
     */
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
  page = 1;
  pageSize = 10;
  collectionSize;
  viewingPesquisarID: boolean = false;
  viewingPesquisarCC: boolean = false;
  IDpesquisa: String;
  ccpesquisa: String;

  @Input() teste: Teste = new Teste();

  constructor(private router: Router, public rest: RestService) { }

  ngOnInit(): void {
    this.getTestes();
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
    const data = new Date();

    if (this.teste.date < data) {
      window.alert("Erro. Apenas é permitido agendamentos a partir do dia " + data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear());
    }

    else if (this.teste.date.getHours() < 8 || this.teste.date.getHours() > 17) {
      window.alert("Horario permitido da clinica: 8:00 até 17:00");
    }
    else {

      this.rest.criarTeste(this.teste).subscribe((result: Teste) => {
        this.addingTeste = false;
        this.getTestes();
        this.teste.pedidoId = null;
        this.teste.date = null;

      }, (err) => {

        console.log(err);
        if (err.error.dayFull) {
          window.alert("numero maximo de testes diarios alcançado!")
        }
        if(err.error.invalidArguments) {
          window.alert("Argumentos inválidos!");
        }
      })
    }
  }

  validarTeste() {
    if (this.teste.pedidoId == null || this.teste.pedidoId == '' || this.teste.date == null || this.teste.hora < 8 || this.teste.hora > 17) {
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
    if (this.IDpesquisa == null || this.IDpesquisa == '') {
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
    if (this.ccpesquisa == null || this.ccpesquisa == '') {
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
    let teste = {};
    if (this.teste.resultadoTeste == null && this.teste.date == null) {
      this.atualizar = false;
      this.viewingTeste = false;
    }
    else {
      if (this.teste.resultadoTeste != null) {
        teste["resultadoTeste"] = this.teste.resultadoTeste;
      }
      if (this.teste.date != null) {
        teste["date"] = this.teste.date;
      }

      this.rest.updateTeste(this.currentTeste._id, this.teste)
        .subscribe(res => {
          this.atualizar = false;
          this.getTestes();
          this.viewingTeste = false;
          this.testeInfo(this.currentTeste._id);
          this.teste.date = null;
        }, (err) => {
          console.log(err);
        }
        );
    }

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
