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

  formAlbumData: AlbumData = {
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
    this.formAlbumData.albumName = this.inputAlbumName;
    this.formAlbumData.albumType = this.inputAlbumType;
    this.formAlbumData.releaseDate = this.inputReleaseDate;
    this.albumService.addAlbum(this.formAlbumData).subscribe({
      next:()=>{
        console.log("song added");
        this.router.navigate(['/albums']);
      },
      error:(errResponse) => {
        console.error(errResponse);
        console.log("delete failed");
      }
    });
  }
}
