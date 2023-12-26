import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayedProfileComponent } from './played-profile.component';

describe('PlayedProfileComponent', () => {
  let component: PlayedProfileComponent;
  let fixture: ComponentFixture<PlayedProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayedProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
