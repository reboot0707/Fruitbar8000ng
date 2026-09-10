import { ArtistData } from './../../interfaces/artist-data';
import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ArtistService } from '../../services/artist-service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-artist-create',
  styleUrl: './artist-create.css',
  templateUrl: './artist-create.html',
})
export class ArtistCreate {

  newArtistData: ArtistData = {
    id: 0,
    artistName: '',
    artistType: ''
  }
  inputArtistName = '';
  inputArtistType = '';

  constructor(
    private artistService: ArtistService,
    private router:Router
  ) {
  }

  goAddArtist() {
    this.newArtistData.artistName = this.inputArtistName;
    this.newArtistData.artistType = this.inputArtistType;
    this.artistService.addArtist(this.newArtistData).subscribe({
      next:()=>{
        console.log("song added");
        this.router.navigate(['/artists']);
      },
      error:(errResponse) => {
        console.log(errResponse);
        console.log("delete failed");
      }
    });
  }
}
