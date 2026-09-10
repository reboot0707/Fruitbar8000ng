import { Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ArtistData } from '../interfaces/artist-data';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private apiUrl = `${environment.endpointUrl}/artists`;

  // 學術用途, 暫時先不用 Angular 21 的 @Service() 搭配 inject 新招
  constructor(private httpClient: HttpClient){}

  getArtist() {
    return this.httpClient.get<ArtistData[]>(`${this.apiUrl}`);
  }

  getArtistById(id: number){
    return this.httpClient.get<ArtistData>(`${this.apiUrl}/${id}`);
  }

  addArtist(newArtistData: ArtistData) {
    return this.httpClient.post(`${this.apiUrl}`, newArtistData);
  }

  updateArtist(id:number, updatedArtistData: ArtistData) {
    return this.httpClient.put(`${this.apiUrl}/${id}`, updatedArtistData);
  }

  delArtist(idToBeDeleted: number) {
    return this.httpClient.delete(`${this.apiUrl}/${idToBeDeleted}`);
  }
}
