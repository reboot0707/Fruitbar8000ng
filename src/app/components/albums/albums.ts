import { AlbumService } from './../../services/album-service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AlbumData } from '../../interfaces/album-data';

@Component({
  imports: [RouterLink],
  selector: 'app-albums',
  styleUrl: './albums.css',
  templateUrl: './albums.html',
  // Angular 22 預設使用 OnPush
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Albums implements OnInit {

  albumList: AlbumData[] = [];
  constructor (private albumService: AlbumService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.albumService.getAlbum().subscribe((data) => {
      //console.log(data);
      this.albumList = data;
    })
  }
}
