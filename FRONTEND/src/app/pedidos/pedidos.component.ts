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
  user: any;
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
  infetado: String = "infetado";
  pdf: any;
  page = 1;
  pageSize = 10;
  collectionSize;
  viewingFiltros: boolean = false;
  filtro: String;

  ccFiltro: String;
  IDfiltro: String;

  viewingListarID: boolean = false;
  viewingListarCC: boolean = false;

  pesquisar: boolean = false;

  fileChanged(e) {
    this.pdf = e.target.files[0];
  }

  @Input() pedido: Pedido = new Pedido();


  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getPedidos()
    this.user = JSON.parse(localStorage.getItem("currentUser"))
  }

  get pedidosP(): any[] {
    return this.pedidos
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  getPedidos() {
    this.pedidos = [];
    this.viewingListar = true;
    this.viewingListarCC = false;
    this.viewingListarID = false;
    this.pesquisar = false;
    this.rest.getPedidos().subscribe((data: {}) => {
      this.pedidos = data;
      this.collectionSize = this.pedidos.length;
    });

  }


  addPedido() {

    if (this.pedido.informacao == null) {
      alert("Faltam preencher campos!");
    }
    else {
      this.pedido.nmrCC = this.user.nmrCC;
      this.rest.addPedido(this.pedido).subscribe((result: Pedido) => {
        this.addingPedido = false;
        this.getPedidos();

        this.pedido.estadoUtilizador = null;
        this.pedido.informacao = null;

      }, (err) => {
        console.log(err);
        if (err.error.invalidArguments) {
          alert("Faltam preencher campos!");
        }
      })
    }
  }



  filtroNCC() {

    if (this.ccFiltro == null) {
      alert("Não foi introduzido nenhum CC!");
      return;
    }
    else {
      this.rest.getPedidos().subscribe((data: {}) => {

        this.pedidos = data;
        this.viewingListarCC = true;
        var pedidosTemp = [];
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
          this.ccFiltro = null;
        });
      });
    }
  }

  filtroID() {

    if (this.IDfiltro == null) {
      alert("Não foi introduzido nenhum ID!");
      return;
    }
    else {

      this.rest.getPedidos().subscribe((data: {}) => {

        this.pedidos = data;
        this.viewingListarID = true;
        var pedidosTemp = [];
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
          this.IDfiltro = null;
        });
      });
    }
  }

  filtros() {
    this.rest.getPedidos().subscribe((data: {}) => {

      this.pedidos = data;
      this.viewingFiltros = false;
      var pedidosTemp = [];
      this.viewingFiltros = true;
      this.pesquisar = true;

      new Promise((resolve, reject) => {
        const pedidos = this.pedidos;
        const resultToSearch = this.resultado;
        const resultToSearch2 = this.estadosTeste;
        const resultToSearch3 = this.estadosUser;
        const resultToSearch4 = this.informacaoPedido;
        //const resultToSearch5 = this.cc;

        pedidos.forEach(function (pedido, index) {

          if (pedido.resultadoTeste == resultToSearch && pedido.estadoTeste == resultToSearch2 && resultToSearch3 == undefined && resultToSearch4 == undefined) {
            pedidosTemp.push(pedido);
            resolve();
          }

          else if (pedido.resultadoTeste == resultToSearch && resultToSearch2 == undefined && resultToSearch3 == undefined && resultToSearch4 == undefined) {
            pedidosTemp.push(pedido);
            resolve();
          }
          else if (pedido.estadoTeste == resultToSearch2 && resultToSearch == undefined && resultToSearch3 == undefined && resultToSearch4 == undefined) {
            pedidosTemp.push(pedido);
            resolve();
          }
          else if (pedido.resultadoTeste == resultToSearch && pedido.estadoTeste == resultToSearch2 && pedido.estadoUtilizador == resultToSearch3 && resultToSearch4 == undefined) {
            pedidosTemp.push(pedido);
            resolve();
          }
          else if (resultToSearch == undefined && pedido.estadoTeste == resultToSearch2 && pedido.estadoUtilizador == resultToSearch3 && resultToSearch4 == undefined) {
            pedidosTemp.push(pedido);
            resolve();
          }

          else if (pedido.resultadoTeste == resultToSearch && resultToSearch2 == undefined && pedido.estadoUtilizador == resultToSearch3 && resultToSearch4 == undefined) {
            pedidosTemp.push(pedido);
            resolve();
          }
          else if (resultToSearch == undefined && resultToSearch2 == undefined && pedido.estadoUtilizador == resultToSearch3 && resultToSearch4 == undefined) {
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
          else if (pedido.resultadoTeste == resultToSearch && resultToSearch2 == undefined && resultToSearch3 == undefined && resultToSearch4 == pedido.informacao) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //informaçao + estado user
          else if (resultToSearch == undefined && resultToSearch2 == undefined && pedido.estadoUtilizador == resultToSearch3 && resultToSearch4 == pedido.informacao) {
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

          else if (pedido.resultadoTeste == resultToSearch && pedido.estadoTeste == resultToSearch2 && pedido.estadoUtilizador == resultToSearch3 && resultToSearch4 == pedido.informacao) {
            pedidosTemp.push(pedido);
            resolve();
          }

          //informação + estado teste + resultado teste + estado user 

          else if (pedido.resultadoTeste == resultToSearch && pedido.estadoTeste == resultToSearch2 && pedido.estadoUtilizador == resultToSearch3 && resultToSearch4 == pedido.informacao) {
            pedidosTemp.push(pedido);
            resolve();
          }

          if (index === pedidos.length - 1) resolve();
        });
      }).then(() => {

        this.pedidos = pedidosTemp;
        this.resultado = null;
        this.estadosTeste = null;
        this.estadosUser = null;
        this.informacaoPedido = null;
      });
    });
  }


  getPedido(_id: String) {
    this.pedido = null;
    this.rest.getPedido(_id).subscribe((data: Pedido) => {
      this.pedido = data;
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
    if (this.pdf == null) {
      alert("Ficheiro não submetido!");
    }
    else {
      let formData = new FormData();
      formData.append('pdf', this.pdf)

      this.rest.upload(pedidoId, formData).subscribe(res => {
        this.atualizarPedidoUpload = false;
        this.getPedidos();
        this.viewingListar = false;
        this.pedidoInfo(this.currentPedido._id)

      }, (err) => {
        console.log(err);
        if (err.error.invalidFile) {
          alert("Ficheiro não submetido!");
        }
      });
    }
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

  getPDF(id: String){
    console.log(id)
    this.rest.getPDF(id).subscribe((data)=>{
      window.open(window.URL.createObjectURL(data));});
  }

}