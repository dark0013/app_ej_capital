import { Component, OnInit } from '@angular/core';
import { FileServicesService } from '../../services/utilidades/file-services.service';
import { FormGroup, NgModel } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuario/usuarios.service';
import { Usuario } from 'src/app/model/usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registrousuario',
  templateUrl: './registrousuario.component.html',
  styleUrls: ['./registrousuario.component.css']
})
export class RegistrousuarioComponent implements OnInit {
  form: FormGroup;
  fileDataDocumento: string | ArrayBuffer | null = null;
  fileDataSelfie: string | ArrayBuffer | null = null;
  txtNombre: string = '';
  txtcedula: string = '';
  txtcelular: string = '';
  txtemail: string = '';
  txtdomicilio: string = '';
  txtcontrasenia: string = '';
  txtconfiContrasenia: string = '';

  usuario: Usuario[] = [];


  constructor(private fileService: FileServicesService,
    private usuarioService: UsuariosService,
    private router: Router) { }

  ngOnInit(): void {


  }

  soloNumeros(evt) {
    var code = (evt.which) ? evt.which : evt.keyCode;
    if (code == 8 || code == 46 || code == 44) {
      //backspace
      return true;
    } else if (code >= 48 && code <= 57) {
      //is a number
      return true;
    } else {
      return false;
    }
  }

  guardarUsuario() {
    let usuario = new Usuario();
    usuario.nombres = this.txtNombre;
    usuario.cedula = this.txtcedula;
    usuario.celular = this.txtcelular;
    usuario.email = this.txtemail;
    usuario.residencia = this.txtdomicilio;
    usuario.pass = this.txtcontrasenia;
    usuario.conf_pass = this.txtconfiContrasenia;
    usuario.filecedula = this.fileDataDocumento;
    usuario.fileselfie = this.fileDataSelfie;


    let contadorError = 0;
    for (var key in usuario) {
      if (usuario.hasOwnProperty(key)) {
        if (usuario[key] === null || usuario[key] === "") {
          contadorError += 1;
        }
      }
    }

    if (contadorError > 0) {
      alert(contadorError);
    } else {
      console.log(JSON.stringify(usuario));
    }

    /* this.usuarioService.saveUsuario(usuario); */
    /*   this.usuarioService.saveUsuario(usuario).subscribe(
        (response: any) => {
          alert('Exito al Guardar Registro');
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.error('Error:', error);
        }
      ); */
  }

  onFileIdentificacion(event: any) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];


      this.fileService.convertToBase64(file)
        .then(base64Data => {          // Aquí puedes hacer lo que desees con la representación base64
          console.log('Archivo en base64:', base64Data);


          this.fileDataDocumento = base64Data;
        })
        .catch(error => {
          console.error('Error al convertir a base64:', error);
        });
    }
  }

  onFileSelfie(event: any) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];

      // Utilizar el servicio para convertir a base64
      this.fileService.convertToBase64(file)
        .then(base64Data => {
          // Aquí puedes hacer lo que desees con la representación base64
          console.log('Archivo en base64:', base64Data);

          // Guardar la representación base64 en la propiedad fileData
          this.fileDataSelfie = base64Data;
        })
        .catch(error => {
          console.error('Error al convertir a base64:', error);
        });
    }
  }



  // Verificar si la representación es una imagen
  isImage(data: string | ArrayBuffer): boolean {
    // Verificar si el formato de datos comienza con "data:image"
    return typeof data === 'string' && data.startsWith('data:image');
  }
}
