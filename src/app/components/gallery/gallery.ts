import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GallerySongData } from '../../interfaces/gallery-song-data';
import { GallerySongListData } from '../../interfaces/gallery-song-list-data';
import { GallerySongService } from '../../services/gallery-song-service';
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: 'app-gallery',
  styleUrl: './gallery.css',
  templateUrl: './gallery.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Gallery implements OnInit {
  gaSongListRaw: GallerySongData[] = [];
  gaSongList: GallerySongListData[] = [];
  constructor(private gallerySongService: GallerySongService){
  }
  ngOnInit(): void {
    this.loadGaSongData();
  }

  songDelete(idToBeDeleted: number){
    const confirmResult: boolean = confirm('確定要永久刪除這首歌嗎？');
    if( confirmResult === true ) {
      this.gallerySongService.delGaSong(idToBeDeleted).subscribe({
        next:() => {
          console.log("song deleted");
          this.gaSongListRaw = this.gaSongListRaw.filter(x => x.id !== idToBeDeleted);
          this.gaSongList = this.gaSongList.filter(x => x.id !== idToBeDeleted);
        },
        error:(errResponse) => {
          console.error(errResponse)
          console.log("deleted failed.");;
        }
      })
      return;
    }
    console.log("cancelled.");
    return;
  }

  private loadGaSongData() {
    this.gallerySongService.getGaSong().subscribe((data) => {
      this.gaSongListRaw = data;
      this.gaSongList = data.flatMap((song) =>
        song.relatedAlbums.map<GallerySongListData>((album) => ({
          id: song.id,
          songName: song.songName,
          relatedAlbum: album,
          relatedArtistsString: song.relatedArtists.map(y => y.artistName).join('、')
        }))
      )
      console.log(this.gaSongList);
    })
  }
}

        // .map<GallerySongListData>((x) => {
        //   return {
        //     id: x.id,
        //     songName: x.songName,
        //     relatedAlbums: x.relatedAlbums,
        //     relatedArtistsString: x.relatedArtists.map(y => y.artistName).join('、')
        //   };
