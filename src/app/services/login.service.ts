import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModel } from '../model/auth';
//import { environment } from '../../environments/environment';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = `${environment.HOST}/login`;
  private isAuthenticated = false;
  private authToken: string | null = null;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',

    // Puedes agregar otras cabeceras según sea necesario
  });

  options = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }
  validateSession(cedula: string, contrasenia: string): Observable<any> {
    const credentials = { cedula: cedula, contrasenia: contrasenia };
    return this.http.post(this.url, credentials, this.options);
  }

}
