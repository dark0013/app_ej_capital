import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrousuarioComponent } from './pages/registrousuario/registrousuario.component';
import { BienvenidosComponent } from './pages/bienvenidos/bienvenidos.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'registro', component: RegistrousuarioComponent },
  { path: 'bienvenido', component: BienvenidosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
