import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos:any = [];

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getPedidos()
  }

  getPedidos() {
    this.pedidos = [];
    this.rest.getPedidos().subscribe((data: {}) => {
      console.log(data);
      this.pedidos = data;
    });
  }
  add() {

  }
  delete(id) {
    this.rest.deletePedido(id)
      .subscribe(res => {
        this.getPedidos();
      }, (err) => {
        console.log(err);
      }
      );
  }
  update(id) {
    this.rest.updatePedido(id)
    .subscribe(res => {
      this.getPedidos();
    }, (err) => {
      console.log(err);
    }
    );
  }

}
