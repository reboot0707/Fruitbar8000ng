import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../interfaces/artist-data';
import { ArtistService } from '../../services/artist-service';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-artist-edit',
  styleUrl: './artist-edit.css',
  templateUrl: './artist-edit.html',
  // Angular 22 預設使用 OnPush
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ArtistEdit implements OnInit {

  editId: number = 0;

  formArtistData: ArtistData = {
    id: 0,
    artistName: '',
    artistType: ''
  }

  inputArtistName = '';
  inputArtistType: string | null = '';

  constructor(
    private artistService: ArtistService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const paramId = Number(this.activatedRoute.snapshot.params['id']);
    if (
      paramId === null ||
      !Number.isSafeInteger(paramId) ||
      paramId <= 0
    ) {
      console.error("missing parameter!");
      this.router.navigate(['/artists']);
    }
    this.editId = paramId;
    this.loadArtistDataById(this.editId) ?? {
      id: 0,
      artistName: '',
      artistType: ''
    };
  }

  goUpdateArtist() {
    this.formArtistData.artistName = this.inputArtistName;
    this.formArtistData.artistType = this.inputArtistType;
    this.artistService.updateArtist(this.editId, this.formArtistData).subscribe({
      next: () => {
        console.log("artist updated");
        this.router.navigate(['/artists']);
      },
      error: (errResponse) => {
        console.error(errResponse);
        console.log("update failed");
      }
    });
  }

  private loadArtistDataById(id: number) {
    this.artistService.getArtistById(id).subscribe((data) => {
      this.formArtistData = data;
      this.inputArtistName = data.artistName;
      this.inputArtistType = data.artistType;
    });
  }
}
