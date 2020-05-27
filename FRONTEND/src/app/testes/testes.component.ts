import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testes',
  templateUrl: './testes.component.html',
  styleUrls: ['./testes.component.css']
})
export class TestesComponent implements OnInit {

  teste:any;
  testes:any=[];
  testeId:String;
  viewingTeste: boolean;
  currentTeste : any;
  atualizar: boolean;

  constructor(private router: Router,public rest:RestService) { }

  ngOnInit(): void {
    this.getTestes();
  }

  getTestes(){
    this.testes = [];
    this.rest.verTestes().subscribe((data:{})=>{
      this.testes = data;
    });
  }

  addTeste(){
    this.rest.criarTeste(this.teste).subscribe((data:{})=>{
      this.getTestes();
    });
  }

  testeInfo(testeId :string){
    if (this.viewingTeste) {
      this.viewingTeste = false;
    } else {
      var tecnicoResult:any = null;
      new Promise((resolve, reject) => {
      const testes = this.testes;
      testes.forEach(function(teste,index){
        if (teste._id == testeId){
          tecnicoResult = teste;
          resolve();
        }
        if (index === testes.length -1) resolve();
      });
      }).then(() => {
        this.currentTeste = tecnicoResult;
        this.viewingTeste = true
      });
    }
  }

 


}
