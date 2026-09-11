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
    const paramId = Number(this.activatedRoute.snapshot.params['id']);
    if (
      paramId === null ||
      !Number.isSafeInteger(paramId) ||
      paramId <= 0
    ) {
      console.error("missing parameter!");
      this.router.navigate(['/gallery']);
    }
    this.editId = paramId;
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

  goUpdateGaSongData(){
    //console.log(this.inputSongData);
    if(this.inputSongData.id !== this.editId) {
      console.log(this.inputSongData, this.editId);
      console.log(typeof(this.inputSongData.id), typeof(this.editId));
      console.error("id does not match, aborted!");
      return;
    }
    this.gallerySongService.updateGaSong(this.editId, this.inputSongData).subscribe({
      next: () => {
        console.log("update success");
        this.router.navigate(['/gallery']);
      },
      error:(errResponse) => {
        console.error(errResponse);
        console.log("update song failed");
      }
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
