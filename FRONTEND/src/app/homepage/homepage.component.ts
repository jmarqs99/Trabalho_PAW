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
    if (this.havePremission('ADMIN')) {
      this.getNumeroInfetados();
      this.getTestesPorDia();
    }
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
    let testeData = [];
    new Promise((resolve, reject) => {
      let done = 0;
      for (let index = 0; index < 10; index++) {
        const data = new Date();
        data.setDate(data.getDate() - index)
        this.rest.testesPorDia(data).subscribe((numTestes: any) => {
          testeData.push({ y: numTestes, label: (data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear()) })
          done++;
          data.setDate(data.getDate() - 1)
          if (done == 10) resolve();
        })
      }
    }).then(() => {
      testeData.sort(function (a, b) {
        if (new Date(a.label) > new Date(b.label)) {
          return 1;
        }
        return -1;
      })
      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: false,
        theme: "light",
        title: {
          text: "Número de testes realizados por dia"
        },
        data: [{
          type: "area",
          dataPoints: testeData,
          markerColor: "#FF0000"
        }]
      });
      chart.render();
    });

  }

}
