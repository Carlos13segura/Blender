import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog').then(m => m.BlogComponent) },
  { path: 'proyectos', loadComponent: () => import('./pages/proyectos/proyectos').then(m => m.ProyectosComponent) },
  { path: 'precios', loadComponent: () => import('./pages/precios/precios').then(m => m.PreciosComponent) },
  { path: 'inscripcion', loadComponent: () => import('./pages/inscripcion/inscripcion').then(m => m.InscripcionComponent) },
  { path: 'caracteristicas', loadComponent: () => import('./pages/caracteristicas/caracteristicas').then(m => m.CaracteristicasComponent) },
  { path: 'instalacion', loadComponent: () => import('./pages/instalacion/instalacion').then(m => m.InstalacionComponent) },
  { path: 'recursos', loadComponent: () => import('./pages/recursos/recursos').then(m => m.RecursosComponent) },
  { path: 'novedades', loadComponent: () => import('./pages/novedades/novedades').then(m => m.NovedadesComponent) },
  { path: '**', redirectTo: '' }
];
