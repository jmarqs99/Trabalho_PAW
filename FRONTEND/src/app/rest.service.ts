import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Pedido } from './Models/Pedido';
import { Utilizador } from './Models/Utilizador';
import { Teste } from './Models/Teste'
const endpoint = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const httpOptionsFile = {
  headers: new HttpHeaders({

    'Accept': 'application/json'
  })
};
const httpOptionsGetFile = {
  headers: new HttpHeaders({

    responseType: 'blob'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
 y
  getUtilizadores(): Observable<any> {
    return this.http.get<any>(endpoint + "utilizador")
  }

  getUtilizador(id: String): Observable<any> {
    return this.http.get<any>(endpoint + "utilizador/" + id);
  }

  updateUtilizador(id: String, estado: String): Observable<any> {
    return this.http.put<any>(endpoint + "utilizador/" + id, JSON.stringify({ estado }), httpOptions);
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(endpoint + "pedido")
  }


  getPedido(id: String): Observable<any> {
    return this.http.get<any>(endpoint + "pedido/" + id);
  }

  updatePedido(id: String, pedido: Pedido): Observable<any> {
    return this.http.put<any>(endpoint + "pedido/" + id, JSON.stringify(pedido), httpOptions);
  }

  upload(id: String, pdf: any): Observable<any> {
    return this.http.put<any>(endpoint + "pedido/pedidoUpload/" + id, pdf);
  }


  deletePedido(id: String): Observable<any> {
    return this.http.delete<any>(endpoint + "pedido/" + id);
  }
  addPedido(pedido: Pedido): Observable<any> {
    return this.http.post<any>(endpoint + "pedido/", JSON.stringify(pedido), httpOptions);
  }


  getTecnicos(): Observable<any> {
    return this.http.get<any>(endpoint + "tecnico");
  }
  getTecnico(id: string): Observable<any> {
    return this.http.get<any>(endpoint + "tecnico/" + id);
  }
  removeTecnico(id: string): Observable<any> {
    return this.http.delete<any>(endpoint + "tecnico/" + id);
  }
  addTecnico(id: string): Observable<any> {
    return this.http.post<any>(endpoint + "tecnico/" + id, {}, {});
  }

  getAdmins(): Observable<any> {
    return this.http.get<any>(endpoint + "admin");
  }
  getAdmin(id: string): Observable<any> {
    return this.http.get<any>(endpoint + "admin/" + id);
  }
  removeAdmin(id: string): Observable<any> {
    return this.http.delete<any>(endpoint + "admin/" + id);
  }
  addAdmin(id: string): Observable<any> {
    return this.http.post<any>(endpoint + "admin/" + id, {}, {});
  }


  criarTeste(teste: Teste): Observable<any> {
    return this.http.post<any>(endpoint + "testes/", JSON.stringify(teste), httpOptions);
  }
  verTestes(): Observable<any> {
    return this.http.get<any>(endpoint + "testes/");
  }
  verTeste(id: string): Observable<any> {
    return this.http.get<any>(endpoint + "testes/" + id);
  }
  updateTeste(id: String, teste: any): Observable<any> {
    return this.http.put<any>(endpoint + "testes/" + id, JSON.stringify(teste), httpOptions);
  }
 
  deleteTeste(id: String): Observable<any> {
    return this.http.delete<any>(endpoint + "testes/" + id);
  }

  testesPessoa(nmrCC: String): Observable<any> {
    return this.http.get<any>(endpoint + "testes/numeroTestesPessoa/" + nmrCC)
  }

  numInfetados(): Observable<any> {
    return this.http.get<any>(endpoint + "utilizador/nmrInfetados")
  }

  testesPorDia(data: Date): Observable<any> {
    return this.http.get<any>(endpoint + "testes/numeroTestesDia/" + data)
  }

  getPDF(id: String): Observable<any> {
    const requestOptions: Object = {
      responseType: 'blob'
    }
    return this.http.get<any>(endpoint + "pedido/download/" + id,requestOptions)
  }

}