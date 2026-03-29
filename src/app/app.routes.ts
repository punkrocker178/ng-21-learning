import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { About } from './components/about/about';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'about',
    component: About,
  }
];
