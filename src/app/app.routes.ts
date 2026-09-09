import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/homepage/homepage').then(m => m.Homepage)
  },
  {
    path: 'albums',
    loadComponent: () => import('./components/albums/albums').then(m => m.Albums)
  },
  {
    path: 'artists',
    loadComponent: () => import('./components/artists/artists').then(m => m.Artists)
  },
  {
    path: 'gallery',
    loadComponent: () => import('./components/gallery/gallery').then(m => m.Gallery)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./components/privacy/privacy').then(m => m.Privacy)
  },
];
