import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../Models/Pedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {




  pedidos:any;
  @Input() pedido:Pedido = new Pedido();


  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getPedidos()
  }

  getPedidos() {
    this.pedidos = [];
    this.rest.getPedidos().subscribe((data: Pedido[]) => {
      console.log(data);
      this.pedidos = data;
    });
  }

  addPedido() {
    console.log(this.pedido)
    this.rest.addPedido(this.pedido).subscribe((result : Pedido) => {
     this.getPedidos()
      }, (err) => {
      console.log(err);
      })
    
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
    this.rest.updatePedido(id,this.pedido)
    .subscribe(res => {
      this.getPedidos();
    }, (err) => {
      console.log(err);
    }
    );
  }

}
