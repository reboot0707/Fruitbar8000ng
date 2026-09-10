import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { AlbumData } from '../interfaces/album-data';
import { environment } from '../../environments/environment.development';

// 學術用途, 暫時先不用 Angular 21 的 @Service() 搭配 inject 新招
@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private apiUrl = `${environment.endpointUrl}/albums`;

  // 學術用途, 暫時先不用 Angular 21 的 @Service() 搭配 inject 新招
  constructor(private httpClient: HttpClient){}

  getAlbum(){
    return this.httpClient.get<AlbumData[]>(`${this.apiUrl}`);
  }

  getAlbumById(id: number){
    return this.httpClient.get<AlbumData>(`${this.apiUrl}/${id}`);
  }

  addAlbum(newAlbumData: AlbumData) {
    return this.httpClient.post(`${this.apiUrl}`, newAlbumData);
  }

  delAlbum(idToBeDeleted: number){
    return this.httpClient.delete(`${this.apiUrl}/${idToBeDeleted}`);
  }
}
