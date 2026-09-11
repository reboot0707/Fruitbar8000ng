export interface GallerySongWriteData {
  id: number;
  songName: string | null;
  relatedAlbumIds: number[];
  relatedArtistIds: number[];
}
