import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.css']
})
export class TecnicosComponent implements OnInit {
  tecnicos : any;
  addingTecnico: boolean;
  userId: string;

  constructor(public rest:RestService) { }

  ngOnInit(): void {
    this.getTecnicos();
  }

  getTecnicos(){
    console.log("Here")
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
      this.addingTecnico = false;
      this.userId = null;
      this.getTecnicos();
    });
  }
}
