import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {Pedido} from './Models/Pedido';
import { Utilizador } from './Models/Utilizador';
const endpoint = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
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
 /* getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(endpoint + 'products');
  }*/

  getUtilizadores() : Observable<any> {
    return this.http.get<any>(endpoint + "utilizador")
  }

  getUtilizador(id:String):Observable<any>{
    return this.http.get<any>(endpoint +"utilizador/" + id);
  }

  updateUtilizador(id:String,dados:JSON):Observable<any>{
    return this.http.put<any>(endpoint +"utilizador/"+ id,httpOptions);
  }

  getPedidos() : Observable<Pedido[]>{
    return this.http.get<Pedido[]>(endpoint + "pedido")
  }

 
  getPedido(id:String):Observable<any>{
    return this.http.get<any>(endpoint +"pedido/" + id);
  }

  updatePedido(id:String,pedido:Pedido):Observable<any>{
    return this.http.put<any>(endpoint +"pedido/"+ id,JSON.stringify(pedido),httpOptions);
  }
  
  deletePedido(id:String):Observable<any> {
    return this.http.delete<any>(endpoint + "pedido/" + id);
  }
  addPedido(pedido:Pedido):Observable<any>{
    return this.http.post<any>(endpoint +"pedido/",JSON.stringify(pedido), httpOptions);
  }
  
  getTecnicos():Observable<any> {
    return this.http.get<any>(endpoint + "tecnico");
  }
  getTecnico(id:string):Observable<any> {
    return this.http.get<any>(endpoint + "tecnico/" + id);
  }
  removeTecnico(id:string):Observable<any> {
    return this.http.delete<any>(endpoint + "tecnico/"+id);
  }
  addTecnico(id:string):Observable<any> {
    return this.http.post<any>(endpoint + "tecnico/"+id, {},{});
  }

  getAdmins():Observable<any> {
    return this.http.get<any>(endpoint + "admin");
  }
  getAdmin(id:string):Observable<any> {
    return this.http.get<any>(endpoint + "admin/" + id);
  }
  removeAdmin(id:string):Observable<any> {
    return this.http.delete<any>(endpoint + "admin/"+id);
  }
  addAdmin(id:string):Observable<any> {
    return this.http.post<any>(endpoint + "admin/"+id, {},{});
  }

}