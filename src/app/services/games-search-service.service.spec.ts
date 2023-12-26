import { TestBed } from '@angular/core/testing';

import { GamesSearchServiceService } from './games-search-service.service';

describe('GamesSearchServiceService', () => {
  let service: GamesSearchServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesSearchServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
