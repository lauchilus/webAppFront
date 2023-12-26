import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSearchComponent } from './landing-search.component';

describe('LandingSearchComponent', () => {
  let component: LandingSearchComponent;
  let fixture: ComponentFixture<LandingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
