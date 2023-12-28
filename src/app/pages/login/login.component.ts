import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  txt_cedula = ''; // Obtén el usuario del formulario
  txt_password = ''; // Obtén la contraseña del formulario

  constructor(private router: Router,
    private http: HttpClient,
    private authService: LoginService) { }

  ngOnInit(): void {

  }
  avanzar() {
    localStorage.setItem('TOKENS', '');

    if(this.txt_cedula == "" || this.txt_cedula == null || this.txt_cedula == undefined){
      alert("Llenar el campo de la cedula");
      return
    }
    if(this.txt_password == "" || this.txt_password == null || this.txt_password == undefined){
      alert("Llenar el campo de la contraseña");
      return
    }

    this.authService.validateSession(this.txt_cedula, this.txt_password).subscribe(response => {

      if (response.codResponse == "00") {
        localStorage.setItem('TOKENS', response.token);
        this.router.navigate(['/bienvenido'])
      }
      //  return response;
    }, error => {
      // Manejar errores aquí, por ejemplo: 401
      console.log(error.status);
      if (error.status === 401) {
        alert("Error de autenticación");
      } else {

        alert("Ocurrio un error al momento de ingresar");
      }
    });
    // this.router.navigate(['/dashboard'])
    // this.router.navigate(['/bienvenido'])
    // alert("Esta opción esta en desarrollo momentaneamente");
  }

  registrate() {
    this.router.navigate(['/registro'])
  }
}
