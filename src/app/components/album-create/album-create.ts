import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AlbumData } from '../../interfaces/album-data';
import { AlbumService } from '../../services/album-service';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-album-create',
  styleUrl: './album-create.css',
  templateUrl: './album-create.html',
})
export class AlbumCreate {

  newAlbumData: AlbumData = {
    id: 0,
    albumName: '',
    albumType: '',
    releaseDate: '',
  }
  inputAlbumName = '';
  inputAlbumType = '';
  inputReleaseDate = '';

  constructor(
    private albumService: AlbumService,
    private router: Router
  ) {
  }

  goAddAlbum() {
    this.newAlbumData.albumName = this.inputAlbumName;
    this.newAlbumData.albumType = this.inputAlbumType;
    this.newAlbumData.releaseDate = this.inputReleaseDate;
    this.albumService.addAlbum(this.newAlbumData).subscribe({
      next:()=>{
        console.log("song added");
        this.router.navigate(['/albums']);
      },
      error:(errResponse) => {
        console.log(errResponse);
        console.log("delete failed");
      }
    });
  }
}
