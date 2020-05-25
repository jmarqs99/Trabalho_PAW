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

  addingPedido: boolean;
  currentPedido : any;
  viewingPedido: boolean;
  atualizarPedido : boolean;
  pedidos:any=[];
  uinformação:boolean;


  @Input() pedido:Pedido = new Pedido();


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

  getPedido(_id:String){
    this.pedido=null;
    this.rest.getPedido(_id).subscribe((data:Pedido)=>{
      this.pedido=data;
    })
  }

  addPedido() {
    console.log(this.pedido)
    this.rest.addPedido(this.pedido).subscribe((result : Pedido) => {
     this.getPedidos();
     this.addingPedido = false;
      }, (err) => {
      console.log(err);
      })
  }

  delete(pedidoId: String) {
    var doRemove = confirm("Queres mesmo remover este pedido?");
    if (doRemove == true) {
    this.rest.deletePedido(pedidoId)
      .subscribe(res => {
        this.getPedidos();
      }, (err) => {
        console.log(err);
      }
      );
    }
  }
  /**
  update() {
    if (this.atualizarPedido) {
      this.atualizarPedido = false;
    }
    else {
    this.rest.updatePedido(this.route.snapshot.params["pedidoId"],this.pedido)
    .subscribe(res => {
      this.atualizarPedido = true;
      this.getPedidos();
    }, (err) => {
      console.log(err);
    }
    );
  }
  }
   */
  update(pedidoId: String) {
    this.rest.updatePedido(pedidoId,this.pedido)
    .subscribe(res => {
      this.atualizarPedido = true;
      this.getPedidos();
      this.atualizarPedido = false;
    }, (err) => {
      console.log(err);
    }
    );
  }
  pedidoInfo(pedidoId:String) {
    if (this.viewingPedido) {
      this.viewingPedido = false;
    } else {
      this.rest.getPedido(pedidoId).subscribe((data : Pedido[])=>{
        this.currentPedido = data;
        this.viewingPedido = true;
      });
    }
  }
  nrinfetados(pedidoId: String) {
    this.pedido=null;
    this.rest.getPedido(pedidoId).subscribe((data:Pedido)=>{
      this.pedido=data;
    })
  }

}