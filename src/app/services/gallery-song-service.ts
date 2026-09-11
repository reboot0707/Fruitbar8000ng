import { Service, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { GallerySongData } from '../interfaces/gallery-song-data';
import { GallerySongWriteData } from '../interfaces/gallery-song-write-data';

@Injectable({
  providedIn: 'root'
})
export class GallerySongService {
  private apiUrl = `${environment.endpointUrl}/gallery/songs`

  constructor(private httpClient: HttpClient){}


  getGaSong(){
    return this.httpClient.get<GallerySongData[]>(`${this.apiUrl}`);
  }

  getGaSongById(id: number){
    return this.httpClient.get<GallerySongData>(`${this.apiUrl}/${id}`);
  }

  addGaSong(addSongInfo: GallerySongWriteData){
    return this.httpClient.post(`${this.apiUrl}`,addSongInfo)
  }

  delGaSong(idToBeDeleted: number){
    return this.httpClient.delete(`${this.apiUrl}/${idToBeDeleted}`)
  }
}
