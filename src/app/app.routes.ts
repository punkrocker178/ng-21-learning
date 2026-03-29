import { Routes } from '@angular/router';
import { App } from './app';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
  }
];
