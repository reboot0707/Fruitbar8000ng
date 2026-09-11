import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ArtistService } from '../../services/artist-service';
import { AlbumService } from '../../services/album-service';
import { GallerySongService } from '../../services/gallery-song-service';
import { ArtistData } from '../../interfaces/artist-data';
import { AlbumData } from '../../interfaces/album-data';
import { GallerySongWriteData } from '../../interfaces/gallery-song-write-data';
import { GallerySongData } from '../../interfaces/gallery-song-data';

@Component({
  imports: [RouterLink],
  selector: 'app-gallery-song-create',
  styleUrl: './gallery-song-create.css',
  templateUrl: './gallery-song-create.html',
  // Angular 22 預設使用 OnPush
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class GallerySongCreate implements OnInit {
  artistList: ArtistData[] = [];
  albumList: AlbumData[] = [];
  formSongData: GallerySongWriteData = {
    id: 0,
    songName: '',
    relatedAlbumIds: [],
    relatedArtistIds: []
  }

  inputSongName = ''
  inputRelAlbumIds:number[] = [];
  inputRelArtistIds:number[] = [];

  constructor(
    private gallerySongService: GallerySongService,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private router: Router,
  ){}
  ngOnInit(): void {
    this.loadArtistsData();
    this.loadAlbumsData();
  }
  loadArtistsData(){
    this.artistService.getArtist().subscribe((data) => {
      this.artistList = data;
    })
  }
  loadAlbumsData(){
    this.albumService.getAlbum().subscribe((data)=>{
      this.albumList = data;
    })
  }
  goAddGaSong(){
    this.formSongData.songName = this.inputSongName;
    this.formSongData.relatedAlbumIds = this.inputRelAlbumIds;
    this.formSongData.relatedArtistIds = this.inputRelArtistIds;
    this.gallerySongService.addGaSong(this.formSongData).subscribe({
      next: () => {
        console.log("song added!");
        this.router.navigate(['/gallery'])
      },
      error:(errResponse) => {
        console.error(errResponse);
        console.log("add song failed");
      }
    });
  }
}
