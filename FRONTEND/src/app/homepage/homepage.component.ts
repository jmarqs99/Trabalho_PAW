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
  user: any
  numeroInfetados: number;
  constructor(public rest: RestService, private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
    this.getNumeroInfetados();
    this.getTestesPorDia();
  }

  havePremission(roleRequired: string): boolean {
    if (roleRequired == this.user.role) {
      return true
    } else if (roleRequired == "TECNICO" && this.user.role == "ADMIN") {
      return true
    }
    return false
  }

  getNumeroInfetados() {
    this.rest.numInfetados().subscribe((numero: number) => {
      this.numeroInfetados = numero;
    })
  }

  getTestesPorDia() {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Número de testes realizados por dia"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "7 de Junho" },
          { y: 55, label: "6 de Junho" },
          { y: 50, label: "5 de Junho" },
          { y: 65, label: "4 de Junho" },
          { y: 95, label: "3 de Junho" },
          { y: 68, label: "2 de Junho" },
          { y: 28, label: "1 de Junho" },
          { y: 34, label: "31 de Maio" },
          { y: 14, label: "30 de Maio" }
        ]
      }]
    });
    chart.render();
  }

}
