import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenidos',
  templateUrl: './bienvenidos.component.html',
  styleUrls: ['./bienvenidos.component.css']
})
export class BienvenidosComponent {
  constructor(private router: Router) { }
  dashboard() {
    this.router.navigate(['/dashboard']);
  }
}
