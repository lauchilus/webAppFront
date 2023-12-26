import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListGamesComponent } from './search-list-games.component';

describe('SearchListGamesComponent', () => {
  let component: SearchListGamesComponent;
  let fixture: ComponentFixture<SearchListGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchListGamesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchListGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
