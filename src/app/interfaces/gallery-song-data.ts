import { AlbumData } from "./album-data";
import { ArtistData } from "./artist-data";

export interface GallerySongData {
  id: number;
  songName: string | null;
  relatedAlbums: AlbumData[];
  relatedArtists: ArtistData[];
}
