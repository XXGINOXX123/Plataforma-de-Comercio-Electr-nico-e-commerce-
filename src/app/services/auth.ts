import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  get currentUser() {
    return this.userSubject.value;
  }

  /**
   * Inicia sesión con el backend. Devuelve un observable que, en caso de éxito,
   * almacena el usuario en memoria y en localStorage.
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login.php`, { username, password }).pipe(
      tap((res: any) => {
        if (res && res.user) {
          this.userSubject.next(res.user);
          localStorage.setItem('user', JSON.stringify(res.user));
        }
      })
    );
  }

  /**
   * Registra un nuevo usuario. Devuelve un observable con la respuesta del backend.
   */
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login.php`, { username, password, register: true });
  }

  /**
   * Cierra la sesión actual.
   */
  logout(): void {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  /**
   * Carga el usuario almacenado en localStorage al iniciar la aplicación.
   */
  loadUserFromStorage(): void {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.userSubject.next(JSON.parse(stored));
    }
  }
}