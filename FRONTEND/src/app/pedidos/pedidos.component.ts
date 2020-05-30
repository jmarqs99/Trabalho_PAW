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

  addingPedido: boolean = false;
  currentPedido: any;
  viewingPedido: boolean;
  viewingListar: boolean = true;
  atualizarPedido: boolean = false;
  atualizarPedidoUpload: boolean = false;
  pedidos: any = [];
  estadoUtilizador: string;
  resultado: String;
  estadosTeste: String;
  estadosUser: String;
  informacaoPedido: String;
  cc: String;
  numero: Number;
  infetado: String = "infetado";
  pdf: any;
  page = 1;
  pageSize = 10;
  collectionSize;
  viewingFiltros: boolean = false;
  filtro: String;

  ccFiltro: String;
  IDfiltro: String;

  viewingListarID: boolean = true;
  viewingListarCC: boolean = true;

  fileChanged(e) {
    this.pdf = e.target.files[0];
  }

  @Input() pedido: Pedido = new Pedido();


  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getPedidos()

  }

  get pedidosP(): any[] {
    return this.pedidos
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  getPedidos() {
    this.pedidos = [];
    this.viewingListar = true;
    this.rest.getPedidos().subscribe((data: {}) => {
      this.pedidos = data;
      this.collectionSize = this.pedidos.length;
    });

  }

  resultadosPedido() {
    this.rest.getPedidos().subscribe((data: {}) => {

      this.pedidos = data;
      this.viewingFiltros = false;
      var pedidosTemp = [];
      this.viewingFiltros = true;
      new Promise((resolve, reject) => {
        const pedidos = this.pedidos;
        const resultToSearch = this.resultado;
        pedidos.forEach(function (pedido, index) {
          if (pedido.resultadoTeste == resultToSearch) {
            pedidosTemp.push(pedido);
            resolve();
          }
          if (index === pedidos.length - 1) resolve();
        });
      }).then(() => {

        this.pedidos = pedidosTemp;

      });
    });
  }

  filtroNCC() {
    this.rest.getPedidos().subscribe((data: {}) => {

      this.pedidos = data;
      //this.viewingFiltros = false;
      this.viewingListarCC = true;
      var pedidosTemp = [];
      //this.viewingFiltros = true;
      new Promise((resolve, reject) => {
        const pedidos = this.pedidos;
        
        const resultToSearchcc = this.ccFiltro;

        

        pedidos.forEach(function (pedido, index) {

         
          
          if (pedido.nmrCC == resultToSearchcc) {
            pedidosTemp.push(pedido);
            resolve();
          }
          

          if (index === pedidos.length - 1) resolve();
        });
      }).then(() => {

        this.pedidos = pedidosTemp;


      });
    });
  }

  filtroID() {
    this.rest.getPedidos().subscribe((data: {}) => {

      this.pedidos = data;
      this.viewingListarID = true;
      //this.viewingFiltros = false;
      var pedidosTemp = [];
      //this.viewingFiltros = true;
      new Promise((resolve, reject) => {
        const pedidos = this.pedidos;
        
        const resultToSearchID = this.IDfiltro;

        

        pedidos.forEach(function (pedido, index) {

         
          
          if (pedido._id == resultToSearchID) {
            pedidosTemp.push(pedido);
            resolve();
          }
          

          if (index === pedidos.length - 1) resolve();
        });
      }).then(() => {

        this.pedidos = pedidosTemp;


      });
    });
  }

  filtros() {
    this.rest.getPedidos().subscribe((data: {}) => {

      this.pedidos = data;
      this.viewingFiltros = false;
      var pedidosTemp = [];
      this.viewingFiltros = true;
      new Promise((resolve, reject) => {
        const pedidos = this.pedidos;
        const resultToSearch = this.resultado;
        const resultToSearch2 = this.estadosTeste;
        const resultToSearch3 = this.estadosUser;
        const resultToSearch4 = this.informacaoPedido;
        //const resultToSearch5 = this.cc;

        pedidos.forEach(function (pedido, index) {

          if (pedido.resultadoTeste == resultToSearch && pedido.estadoTeste == resultToSearch2 && resultToSearch3 == undefined && resultToSearch4 == undefined ) {
            pedidosTemp.push(pedido);
            resolve();
          }

          else if (pedido.resultadoTeste == resultToSearch && resultToSearch2 == undefined && resultToSearch3 == undefined && resultToSearch4 == undefined) {
            pedidosTemp.push(pedido);
            resolve();
          }
          else if (pedido.estadoTeste == resultToSearch2 && resultToSearch == undefined && resultToSearch3 == undefined && resultToSearch4 == undefined ) {
            pedidosTemp.push(pedido);
            resolve();
          }
          else if (pedido.resultadoTeste == resultToSearch && pedido.estadoTeste == resultToSearch2 && pedido.estadoUtilizador == resultToSearch3 && resultToSearch4 == undefined ) {
            pedidosTemp.push(pedido);
            resolve();
          }
          else if (resultToSearch == undefined && pedido.estadoTeste == resultToSearch2 && pedido.estadoUtilizador == resultToSearch3 && resultToSearch4 == undefined ) {
            pedidosTemp.push(pedido);
            resolve();
          }

          else if (pedido.resultadoTeste == resultToSearch && resultToSearch2 == undefined && pedido.estadoUtilizador == resultToSearch3 && resultToSearch4 == undefined) {
            pedidosTemp.push(pedido);
            resolve();
          }
          else if (resultToSearch == undefined && resultToSearch2 == undefined && pedido.estadoUtilizador == resultToSearch3 && resultToSearch4 == undefined ) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //informação solo
          else if (resultToSearch == undefined && resultToSearch2 == undefined && resultToSearch3 == undefined && resultToSearch4 == pedido.informacao) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //informação + estado teste
          else if (resultToSearch == undefined && pedido.estadoTeste == resultToSearch2 && resultToSearch3 == undefined && resultToSearch4 == pedido.informacao) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //informação + resultado teste
          else if (pedido.resultadoTeste == resultToSearch && resultToSearch2 == undefined && resultToSearch3 == undefined && resultToSearch4 == pedido.informacao ) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //informaçao + estado user
          else if (resultToSearch == undefined && resultToSearch2 == undefined && pedido.estadoUtilizador == resultToSearch3 && resultToSearch4 == pedido.informacao ) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //informaçao + estado teste + resultado

          else if (pedido.resultadoTeste == resultToSearch && pedido.estadoTeste == resultToSearch2 && resultToSearch3 == undefined && resultToSearch4 == pedido.informacao) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //informacao + estado teste + estado user

          else if (resultToSearch == undefined && pedido.estadoTeste == resultToSearch2 && pedido.estadoUtilizador == resultToSearch3 && resultToSearch4 == pedido.informacao) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //informaçao + resultado teste + estado user

          else if (pedido.resultadoTeste == resultToSearch && pedido.estadoTeste == resultToSearch2 && pedido.estadoUtilizador == resultToSearch3 && resultToSearch4 == pedido.informacao ) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //informação + estado teste + resultado teste + estado user 

          else if (pedido.resultadoTeste == resultToSearch && pedido.estadoTeste == resultToSearch2  && pedido.estadoUtilizador == resultToSearch3 && resultToSearch4 == pedido.informacao) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //ncc solo
          /**
          else if (resultToSearch == undefined && resultToSearch2 == undefined &&  resultToSearch3 == undefined && resultToSearch4 == undefined && pedido.nmrCC == resultToSearch5 ) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //ncc +informacao

          else if (resultToSearch == undefined && resultToSearch2 == undefined &&  resultToSearch3 == undefined && pedido.informacao == resultToSearch4 && pedido.nmrCC == resultToSearch5 ) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //ncc + estado teste
          else if (resultToSearch == undefined && pedido.estadoTeste == resultToSearch2  &&  resultToSearch3 == undefined && resultToSearch4 == undefined && pedido.nmrCC == resultToSearch5 ) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //ncc + resultado teste
          else if (pedido.resultadoTeste == resultToSearch  &&  resultToSearch2 == undefined  &&  resultToSearch3 == undefined && resultToSearch4 == undefined && pedido.nmrCC == resultToSearch5 ) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //ncc + estado user
          else if (resultToSearch == undefined  &&  resultToSearch2 == undefined  && pedido.estadoUtilizador == resultToSearch3  && resultToSearch4 == undefined && pedido.nmrCC == resultToSearch5 ) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //ncc + estado teste + resultado
          else if (pedido.resultadoTeste == resultToSearch  &&  pedido.estadoTeste == resultToSearch2   && resultToSearch3 == undefined && resultToSearch4 == undefined && pedido.nmrCC == resultToSearch5 ) {
            pedidosTemp.push(pedido);
            resolve();
          } */


          

          if (index === pedidos.length - 1) resolve();
        });
      }).then(() => {

        this.pedidos = pedidosTemp;


      });
    });
  }


  estadoTeste() {
    var pedidosTemp = [];
    this.viewingFiltros = false;
    new Promise((resolve, reject) => {
      const pedidos = this.pedidos;
      const resultToSearch = this.estadosTeste;
      pedidos.forEach(function (pedido, index) {
        if (pedido.estadoTeste == resultToSearch) {
          pedidosTemp.push(pedido);
          resolve();
        }
        if (index === pedidos.length - 1) resolve();
      });
    }).then(() => {

      this.pedidos = pedidosTemp;

    });
  }

  estadoUser() {
    var pedidosTemp = [];
    this.viewingFiltros = false;
    new Promise((resolve, reject) => {
      const pedidos = this.pedidos;
      const resultToSearch = this.estadosUser;
      pedidos.forEach(function (pedido, index) {
        if (pedido.estadoUtilizador == resultToSearch) {
          pedidosTemp.push(pedido);
          resolve();
        }
        if (index === pedidos.length - 1) resolve();
      });
    }).then(() => {

      this.pedidos = pedidosTemp;

    });
  }
  informacao() {

    var pedidosTemp = [];
    this.viewingFiltros = false;
    new Promise((resolve, reject) => {
      const pedidos = this.pedidos;
      const resultToSearch = this.informacaoPedido;
      pedidos.forEach(function (pedido, index) {
        if (pedido.informacao == resultToSearch) {
          pedidosTemp.push(pedido);
          resolve();
        }
        if (index === pedidos.length - 1) resolve();
      });
    }).then(() => {

      this.pedidos = pedidosTemp;

    });
  }

  nmrCC() {
    var pedidosTemp = [];
    this.viewingFiltros = false;
    new Promise((resolve, reject) => {
      const pedidos = this.pedidos;
      const resultToSearch = this.cc;
      pedidos.forEach(function (pedido, index) {
        if (pedido.nmrCC == resultToSearch) {
          pedidosTemp.push(pedido);
          resolve();
        }
        if (index === pedidos.length - 1) resolve();
      });
    }).then(() => {

      this.pedidos = pedidosTemp;

    });
  }

  getPedido(_id: String) {
    this.pedido = null;
    this.rest.getPedido(_id).subscribe((data: Pedido) => {
      this.pedido = data;
    })
  }

  addPedido() {
    console.log(this.pedido)
    this.rest.addPedido(this.pedido).subscribe((result: Pedido) => {
      this.addingPedido = false;
      this.getPedidos();
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

  update() {
    this.rest.updatePedido(this.currentPedido._id, this.pedido)
      .subscribe(res => {
        this.atualizarPedido = false;
        this.getPedidos();
        this.viewingPedido = false;
        this.pedidoInfo(this.currentPedido._id)
      }, (err) => {
        console.log(err);
      }
      );
  }

  uploadFicheiro(pedidoId: String) {
    let formData = new FormData();
    formData.append('pdf', this.pdf)
    this.rest.upload(pedidoId, formData).subscribe(res => {
      this.atualizarPedidoUpload = false;
      this.getPedidos();
      this.viewingListar = false;
      this.pedidoInfo(this.currentPedido._id)

    }, (err) => {
      console.log(err);
    });
  }

  pedidoInfo(pedidoId: String) {
    if (this.viewingPedido && this.currentPedido._id == pedidoId) {
      this.viewingPedido = false;
    } else {

      var pedidoResult: any = null;

      new Promise((resolve, reject) => {
        const pedidos = this.pedidos;
        pedidos.forEach(function (pedido, index) {
          if (pedido._id == pedidoId) {
            pedidoResult = pedido;
            resolve();
          }
          if (index === pedidos.length - 1) resolve();
        });
      }).then(() => {
        this.currentPedido = pedidoResult;
        this.viewingPedido = true
      });


    }
  }
  nrinfetados() {

    this.rest.numeroInfetados(this.infetado).subscribe((data: Number) => {
      console.log(data);
      alert(data);

    });

  }



}