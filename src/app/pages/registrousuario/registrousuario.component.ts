import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FileServicesService } from '../../services/utilidades/file-services.service';
import { FormGroup, NgModel } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuario/usuarios.service';
import { Usuario } from 'src/app/model/usuario';
import { Router } from '@angular/router';

declare var $: any;

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
  MsjResponse: string = '';
  isButtonDisabled = false;

  usuario: Usuario[] = [];


  constructor(private fileService: FileServicesService,
    private usuarioService: UsuariosService,
    private router: Router, private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {


  }

  openModal(EntradaModal: string): void {
    const modal = this.el.nativeElement.querySelector(`#${EntradaModal}`);
    this.renderer.addClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'block');
  }

  closeModal(): void {
    const modal = this.el.nativeElement.querySelector('#myModal');
    this.renderer.removeClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'none');
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
    this.isButtonDisabled = true;
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
      this.MsjResponse = 'LLenar todos los campos';
      this.openModal("myModal");
      this.isButtonDisabled = false;
    } else {
      this.usuarioService.saveUsuario(usuario).subscribe(
        (response: any) => {
          this.MsjResponse = 'Exito al Guardar Registro';
          this.openModal("myModalOk");
        },
        (error: any) => {
          this.MsjResponse = error;
          this.openModal("myModal");
        }
      );
    }

    /* this.usuarioService.saveUsuario(usuario); */

  }

  Salir() {
    this.router.navigate(['/']);
  }

  onFileIdentificacion(event: any) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];


      this.fileService.convertToBase64(file)
        .then(base64Data => {          // Aquí puedes hacer lo que desees con la representación base64
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
