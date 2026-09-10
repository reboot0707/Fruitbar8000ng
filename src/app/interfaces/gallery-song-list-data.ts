import { AlbumData } from "./album-data";

export interface GallerySongListData {
  id: number;
  songName: string | null;
  relatedAlbum: AlbumData;
  relatedArtistsString: string;
}
