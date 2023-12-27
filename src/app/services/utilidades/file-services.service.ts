import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileServicesService {

  constructor() { }

  // Método para convertir un archivo a base64
  convertToBase64(file: File): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        // El resultado es la representación base64 del archivo
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      // Leer el contenido del archivo como base64
      reader.readAsDataURL(file);
    });
  }
}
