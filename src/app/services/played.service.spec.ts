import { TestBed } from '@angular/core/testing';

import { PlayedService } from './played.service';

describe('PlayedService', () => {
  let service: PlayedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
