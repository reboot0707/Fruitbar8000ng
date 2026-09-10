import { TestBed } from '@angular/core/testing';
import { GallerySongService } from './gallery-song-service';

describe('GallerySongService', () => {
  let service: GallerySongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GallerySongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
