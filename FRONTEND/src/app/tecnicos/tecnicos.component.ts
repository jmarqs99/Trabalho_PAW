import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.css']
})
export class TecnicosComponent implements OnInit {
  tecnicos : any;
  addingTecnico: boolean = false;
  userId: string;
  currentTecnico : any;
  viewingTecnico: boolean;
  page = 1;
  pageSize = 10;
  collectionSize;

  constructor(private router: Router,public rest:RestService) { }

  ngOnInit(): void {
    this.getTecnicos();
  }

  getTecnicos(){
    this.tecnicos = [];
    this.rest.getTecnicos().subscribe((data:{})=>{
      this.tecnicos = data;
      this.collectionSize = this.tecnicos.length;
    });
  }

  get tecnicosP(): any[] {
    return this.tecnicos
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  demote(tecnicoId : string){
    var doRemove = confirm("Queres mesmo remover este técnico?");
    if (doRemove == true) {
      this.rest.removeTecnico(tecnicoId).subscribe((data:{})=>{
        this.getTecnicos();
      });
    }
    
  }

  addTecnico(){
    if (this.userId == null || this.userId == ''){
      alert("ID de utilizador inválido!")
      return;
    }
    this.rest.addTecnico(this.userId).subscribe((data:{})=>{
      this.getTecnicos();
      this.addingTecnico = false;
      this.userId = null;
    }, (err) => {
      alert("ID de utilizador inexistente")
  });
  }
  tecnicoInfo(tecnicoId :string){
    if (this.viewingTecnico && this.currentTecnico._id == tecnicoId) {
      this.viewingTecnico = false;
    } else {
      var tecnicoResult:any = null;
      new Promise((resolve, reject) => {
      const tecnicos = this.tecnicos;
      tecnicos.forEach(function(tecnico,index){
        if (tecnico._id == tecnicoId){
          tecnicoResult = tecnico;
          resolve();
        }
        if (index === tecnicos.length -1) resolve();
      });
      }).then(() => {
        this.currentTecnico = tecnicoResult;
        this.viewingTecnico = true
      });
    }
  }
}
