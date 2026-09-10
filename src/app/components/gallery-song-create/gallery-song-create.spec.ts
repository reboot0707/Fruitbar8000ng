import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GallerySongCreate } from './gallery-song-create';

describe('GallerySongCreate', () => {
  let component: GallerySongCreate;
  let fixture: ComponentFixture<GallerySongCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GallerySongCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(GallerySongCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
