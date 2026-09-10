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

  editId: number = 0;

  formAlbumData: AlbumData = {
    id: 0,
    albumName: '',
    albumType: '',
    releaseDate: '',
  }

  inputAlbumName = '';
  inputAlbumType: string | null = '';
  inputReleaseDate: string | null = '';

  constructor(
    private albumService: AlbumService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.editId = this.activatedRoute.snapshot.params['id'];
    this.loadAlbumDataById(this.editId) ?? {
      id: 0,
      albumName: '',
      albumType: '',
      releaseDate: '',
    };
  }

  goUpdateAlbum() {
    this.formAlbumData.albumName = this.inputAlbumName;
    this.formAlbumData.albumType = this.inputAlbumType;
    this.formAlbumData.releaseDate = this.inputReleaseDate;
    this.albumService.updateAlbum(this.editId, this.formAlbumData).subscribe({
      next: () => {
        console.log("album updated");
        this.router.navigate(['/albums'])
      },
      error: (errResponse) => {
        console.error(errResponse);
        console.log("update failed");
      }
    })
  }

  private loadAlbumDataById(id: number) {
    this.albumService.getAlbumById(id).subscribe((data) => {
      this.formAlbumData = data;
      this.inputAlbumName = data.albumName;
      this.inputAlbumType = data.albumType;
      this.inputReleaseDate = data.releaseDate;
    });
  }
}
