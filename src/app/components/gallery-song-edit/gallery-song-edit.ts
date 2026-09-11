import { FormsModule } from '@angular/forms';
import { AlbumData } from '../../interfaces/album-data';
import { ArtistData } from '../../interfaces/artist-data';
import { GallerySongWriteData } from '../../interfaces/gallery-song-write-data';
import { AlbumService } from './../../services/album-service';
import { ArtistService } from './../../services/artist-service';
import { GallerySongService } from './../../services/gallery-song-service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-gallery-song-edit',
  styleUrl: './gallery-song-edit.css',
  templateUrl: './gallery-song-edit.html',
  // Angular 22 預設使用 OnPush
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class GallerySongEdit implements OnInit{

  editId: number = 0;
  formSongData: GallerySongWriteData = {
    id: 0,
    songName: "",
    relatedAlbumIds: [],
    relatedArtistIds: [],
  }

  artistList: ArtistData[] = [];
  albumList: AlbumData[] = [];

  inputSongData: GallerySongWriteData = {
    id: 0,
    songName: "",
    relatedAlbumIds: [],
    relatedArtistIds: [],
  }

  constructor(
    private gallerySongService: GallerySongService,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.editId = this.activatedRoute.snapshot.params['id'];
    this.loadArtistsData();
    this.loadAlbumsData();
    this.loadGaSongDataById(this.editId) ?? {
      id: 0,
      songName: "",
      relatedAlbumIds: [],
      relatedArtistIds: [],
    };
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
  private loadGaSongDataById(id: number){
    this.gallerySongService.getGaSongById(id).subscribe((data)=>{
      this.formSongData.id = data.id;
      this.formSongData.songName = data.songName;
      this.formSongData.relatedAlbumIds = data.relatedAlbums.map(x => x.id);
      this.formSongData.relatedArtistIds = data.relatedArtists.map(x => x.id);
      this.inputSongData = structuredClone(this.formSongData);
    })
  }
}
