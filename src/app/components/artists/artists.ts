import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ArtistData } from '../../interfaces/artist-data';
import { ArtistService } from '../../services/artist-service';
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: 'app-artists',
  styleUrl: './artists.css',
  templateUrl: './artists.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Artists implements OnInit {

  artistList: ArtistData[] = [];
  constructor (private artistService: ArtistService) {}

  ngOnInit(): void {
    this.loadArtistData();
  }

  artistDelete(idToBeDeleted: number){
    const confirmResult: boolean = confirm('確定要永久刪除這位創作者嗎？');
    if(confirmResult === true) {
      this.artistService.delArtist(idToBeDeleted).subscribe({
        next:() => {
          console.log("song deleted");
          this.artistList = this.artistList.filter(x => x.id !== idToBeDeleted);
        },
        error:(errResponse) => {
          console.log(errResponse);
          console.log("delete failed");
        }
      })
    }
    console.log("cancelled.");
    return;
  }

  private loadArtistData() {
    this.artistService.getArtist().subscribe((data) => {
      this.artistList = data;
    })
  }

}
