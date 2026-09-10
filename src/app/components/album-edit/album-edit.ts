import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlbumService } from '../../services/album-service';
import { AlbumData } from '../../interfaces/album-data';
import { FormsModule } from "@angular/forms";

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-album-edit',
  styleUrl: './album-edit.css',
  templateUrl: './album-edit.html',
  // Angular 22 預設使用 OnPush
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AlbumEdit implements OnInit {
  formAlbumData: AlbumData = {
    id: 0,
    albumName: '',
    albumType: '',
    releaseDate: '',
  }

  formAlbumName = '';
  formAlbumType: string | null = '';
  formReleaseDate: string | null = '';

  constructor(
    private albumService: AlbumService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.loadAlbumDataById(this.activatedRoute.snapshot.params['id']) ?? {
      id: 0,
      albumName: '',
      albumType: '',
      releaseDate: '',
    };
  }

  private loadAlbumDataById(id: number) {
    this.albumService.getAlbumById(id).subscribe((data) => {
      this.formAlbumData = data;
      this.formAlbumName = data.albumName;
      this.formAlbumType = data.albumType;
      this.formReleaseDate = data.releaseDate;
    });
  }
}
