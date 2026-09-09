import { AlbumService } from './../../services/album-service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AlbumData } from '../../interfaces/album-data';

@Component({
  imports: [RouterLink],
  selector: 'app-albums',
  styleUrl: './albums.css',
  templateUrl: './albums.html',
  // Angular 22 預設使用 OnPush
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Albums implements OnInit {

  albumList: AlbumData[] = [];
  constructor (private albumService: AlbumService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadAlbumData();
  }

  songDelete(idToBeDeleted: number){
    const confirmResult: boolean = confirm('確定要永久刪除這張專輯嗎？');
    if( confirmResult === true) {
      this.albumService.delAlbum(idToBeDeleted).subscribe({
        next:() => {
          console.log("song deleted.");
          // 前端快速濾除已刪除項目
          this.albumList = this.albumList.filter(x => x.id !== idToBeDeleted);
          // 其他方法: 重新載入所有 album 資料, 確保內容是否已同步, 與其正確性
          //this.loadAlbumData();
        },
        error:() => {
          console.log("delete failed");
        }
      });
      return;
    }
    console.log("cancelled.");
    return;
  }

  private loadAlbumData() {
    this.albumService.getAlbum().subscribe((data) => {
      //console.log(data);
      this.albumList = data;
    });
  }
}
