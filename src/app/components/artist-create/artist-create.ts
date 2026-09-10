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

  formArtistData: ArtistData = {
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
    this.formArtistData.artistName = this.inputArtistName;
    this.formArtistData.artistType = this.inputArtistType;
    this.artistService.addArtist(this.formArtistData).subscribe({
      next:()=>{
        console.log("artist added");
        this.router.navigate(['/artists']);
      },
      error:(errResponse) => {
        console.error(errResponse);
        console.log("delete failed");
      }
    });
  }
}
