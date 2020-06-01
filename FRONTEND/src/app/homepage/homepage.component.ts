import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import * as CanvasJS from '../canvasjs.min';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user:any
  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Número de Infetados"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Apple" },
          { y: 55, label: "Mango" },
          { y: 50, label: "Orange" },
          { y: 65, label: "Banana" },
          { y: 95, label: "Pineapple" },
          { y: 68, label: "Pears" },
          { y: 28, label: "Grapes" },
          { y: 34, label: "Lychee" },
          { y: 14, label: "Jackfruit" }
        ]
      }]
    });
      
    chart.render();
  }

  havePremission(roleRequired : string) : boolean {
    if (roleRequired == this.user.role){
      return true
    } else if (roleRequired == "TECNICO" && this.user.role == "ADMIN"){
      return true
    }
    return false
  }
}
