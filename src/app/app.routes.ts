import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { About } from './components/about/about';
import { blogPostDataResolver } from './resolvers/blog-post-data.resolver';
import { GeneralException } from './general-exception/general-exception';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: Dashboard,
    resolve: {
      blogPostData: blogPostDataResolver,
    },
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login-form/login-form').then(m => m.LoginForm),
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'error',
    component: GeneralException,
  },
];
