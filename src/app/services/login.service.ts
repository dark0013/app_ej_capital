import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../model/auth';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  auth: Auth;
  url:string = `${environment.HOST}/login`;
  private isAuthenticated = false;
  private authToken: string | null = null;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    
    // Puedes agregar otras cabeceras según sea necesario
  });

  options = {
    headers: this.headers,
   // withCredentials: true, // Incluye esta línea si estás utilizando cookies y CORS lo permite
  };

  constructor(private http: HttpClient) { }
  validateSession(cedula: string, contrasenia: string): Observable<any> {
    const credentials = { cedula: cedula, contrasenia: contrasenia };
    return this.http.post(this.url, credentials, this.options);
  }

}
