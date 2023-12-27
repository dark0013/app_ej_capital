import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
//import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url: string = `${environment.HOST}/register`;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',

    // Puedes agregar otras cabeceras según sea necesario
  });

  options = {
    headers: this.headers,
    // withCredentials: true, // Incluye esta línea si estás utilizando cookies y CORS lo permite
  };

  constructor(private http: HttpClient) { }

  /*  saveUsuario(usuario: Usuario) {
     //alert('vale')
     //console.log(JSON.stringify(usuario));
     this.http.post(this.url, usuario, this.options).pipe(
       tap(response => {
         alert('¡Exito al guardar!');
 
       }),
       catchError(this.handleHttpError)
     ).subscribe(
       // Puedes manejar la respuesta exitosa aquí
       (response: any) => {
         console.log('Respuesta exitosa:', response);
       },
       // Puedes manejar el error aquí
       (error: any) => {
         console.error('Error:', error);
       }
     );
     
   } */

  saveUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.url, usuario, this.options).pipe(
      tap(response => {
   //     console.log('¡Éxito al guardar!', response);
        console.log('¡Éxito al guardar!', response);
      }),
      catchError(this.handleHttpError)
    );
  }

  private handleHttpError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError('Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo más tarde.');
  }
}
