import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManualShellComponent } from './manual-shell/manual-shell.component';
import { ManualPageComponent } from './manual-page/manual-page.component';
import { LoginComponent } from './auth/login.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [authGuard] },
  {
    path: '',
    component: ManualShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'intro',
        component: ManualPageComponent,
        data: { file: 'intro.md', title: 'Introducción' },
      },
      {
        path: 'caja-registro/vista-general',
        component: ManualPageComponent,
        data: { file: 'caja-registro/vista-general.md', title: 'Caja de registro' },
      },
      {
        path: 'represa/vista-general',
        component: ManualPageComponent,
        data: { file: 'represa/vista-general.md', title: 'Represa' },
      },
      {
        path: 'potabilizacion/planta',
        component: ManualPageComponent,
        data: { file: 'potabilizacion/planta.md', title: 'Planta de potabilización' },
      },
      {
        path: 'hidroflow/planta',
        component: ManualPageComponent,
        data: { file: 'hidroflow/planta.md', title: 'Planta de Hidroflow' },
      },
      {
        path: 'gas/planta',
        component: ManualPageComponent,
        data: { file: 'gas/planta.md', title: 'Planta de gas' },
      },
      {
        path: 'calentadores/vista-general',
        component: ManualPageComponent,
        data: { file: 'calentadores/vista-general.md', title: 'Calentadores' },
      },
      {
        path: 'mantenimiento/rutinas',
        component: ManualPageComponent,
        data: { file: 'mantenimiento/rutinas.md', title: 'Rutinas de mantenimiento' },
      },
      {
        path: 'emergencias/protocolos',
        component: ManualPageComponent,
        data: { file: 'emergencias/protocolos.md', title: 'Protocolos de emergencia' },
      },
      {
        path: 'anexos/planos-fotos-videos',
        component: ManualPageComponent,
        data: { file: 'anexos/planos-fotos-videos.md', title: 'Cómo agregar fotos, PDFs y videos' },
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
