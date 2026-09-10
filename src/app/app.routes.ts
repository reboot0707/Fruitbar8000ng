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
    path: 'albums/create',
    loadComponent: () => import('./components/album-create/album-create').then(m => m.AlbumCreate)
  },
  {
    path: 'artists',
    loadComponent: () => import('./components/artists/artists').then(m => m.Artists)
  },
  {
    path: 'artists/create',
    loadComponent: () => import('./components/artist-create/artist-create').then(m => m.ArtistCreate)
  },
  {
    path: 'gallery',
    loadComponent: () => import('./components/gallery/gallery').then(m => m.Gallery)
  },
  // gallery-song-create
  {
    path: 'gallery/create',
    loadComponent: () => import('./components/gallery-song-create/gallery-song-create').then(m => m.GallerySongCreate)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./components/privacy/privacy').then(m => m.Privacy)
  },
];
