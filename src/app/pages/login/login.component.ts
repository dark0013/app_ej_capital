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
  constructor(private router: Router,
    private http: HttpClient,
    private authService: LoginService) { }


  cedula = '0945501933'; // Obtén el usuario del formulario
  password = '455016'; // Obtén la contraseña del formulario

  ngOnInit(): void {

  }
  avanzar() {

    this.authService.validateSession(this.cedula, this.password).subscribe(response => {
      console.log(response);
      return response;
    });
    // this.router.navigate(['/dashboard'])
    // this.router.navigate(['/bienvenido'])
    alert("Esta opción esta en desarrollo momentaneamente");
  }

  registrate(){
    this.router.navigate(['/registro'])
  }
}
