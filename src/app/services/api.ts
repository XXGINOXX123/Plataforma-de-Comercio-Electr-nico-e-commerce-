import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de productos.
   */
  getProductos(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/productos.php`);
  }

  /**
   * Crea un producto (para el panel de administración).
   */
  crearProducto(producto: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/productos.php`, producto);
  }

  /**
   * Crea un pedido nuevo.
   */
  crearPedido(usuario_id: number, items: any[]): Observable<any> {
    return this.http.post(`${environment.apiUrl}/pedido.php`, { usuario_id, items });
  }

  /**
   * Obtiene los pedidos de un usuario dado.
   */
  getPedidos(usuario_id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/pedido.php?usuario_id=${usuario_id}`);
  }
}