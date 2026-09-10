import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GallerySongEdit } from './gallery-song-edit';

describe('GallerySongEdit', () => {
  let component: GallerySongEdit;
  let fixture: ComponentFixture<GallerySongEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GallerySongEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(GallerySongEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
