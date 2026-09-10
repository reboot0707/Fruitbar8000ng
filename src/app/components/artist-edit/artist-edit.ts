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
export class ArtistEdit implements OnInit{

  formArtistData: ArtistData = {
    id: 0,
    artistName: '',
    artistType: ''
  }

  formArtistName = '';
  formArtistType: string | null = '';

  constructor(
    private artistService: ArtistService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.loadArtistDataById(this.activatedRoute.snapshot.params['id']) ?? {
      id: 0,
      artistName: '',
      artistType: ''
    };
  }

  private loadArtistDataById(id: number) {
    this.artistService.getArtistById(id).subscribe((data) => {
      this.formArtistData = data;
      this.formArtistName = data.artistName;
      this.formArtistType = data.artistType;
    });
  }
}
