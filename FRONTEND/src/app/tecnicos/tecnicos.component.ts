import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.css']
})
export class TecnicosComponent implements OnInit {
  tecnicos : any;
  addingTecnico: boolean;
  userId: string;
  currentTecnico : any;
  viewingTecnico: boolean;

  constructor(private router: Router,public rest:RestService) { }

  ngOnInit(): void {
    this.getTecnicos();
  }

  getTecnicos(){
    this.tecnicos = [];
    this.rest.getTecnicos().subscribe((data:{})=>{
      this.tecnicos = data;
    });
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
    });
  }
  tecnicoInfo(tecnicoId :string){
    if (this.viewingTecnico) {
      this.viewingTecnico = false;
    } else {
      var tecnicoResult:any = null;
      new Promise((resolve, reject) => {
      this.tecnicos.forEach(function(tecnico,index){
        if (tecnico._id == tecnicoId){
          tecnicoResult = tecnico;
          resolve();
        }
        if (index === this.tecnicos.length -1) resolve();
      });
      }).then(() => {
        this.currentTecnico = tecnicoResult;
        this.viewingTecnico = true
      });
    }
  }
}
