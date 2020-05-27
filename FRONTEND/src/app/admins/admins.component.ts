import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  admins : any;
  addingAdmin: boolean;
  userId: string;
  currentAdmin : any;
  viewingAdmin: boolean;

  constructor(private router: Router,public rest:RestService) { }

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(){
    this.admins = [];
    this.rest.getAdmins().subscribe((data:{})=>{
      this.admins = data;
    });
  }

  demote(tecnicoId : string){
    var doRemove = confirm("Queres mesmo remover este técnico?");
    if (doRemove == true) {
      this.rest.removeAdmin(tecnicoId).subscribe((data:{})=>{
        this.getAdmins();
      });
    }
    
  }

  addAdmin(){
    if (this.userId == null || this.userId == ''){
      alert("ID de utilizador inválido!")
      return;
    }
    this.rest.addAdmin(this.userId).subscribe((data:{})=>{
      this.getAdmins();
      this.addingAdmin = false;
      this.userId = null;
    });
  }
  adminInfo(tecnicoId :string){
    if (this.viewingAdmin) {
      this.viewingAdmin = false;
    } else {
      var adminResult:any = null;
      new Promise((resolve, reject) => {
      const admins = this.admins;
      admins.forEach(function(admin,index){
        if (admin._id == tecnicoId){
          adminResult = admin;
          this.currentAdmin = admin;
          this.viewingAdmin = true
          resolve();
        }
        if (index === admins.length -1) resolve();
      });
      }).then(() => {
        this.currentAdmin = adminResult;
        this.viewingAdmin = true
      });
    }
  }
}
