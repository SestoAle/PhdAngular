import { TestBed, inject } from '@angular/core/testing';

import { ScholarService } from './scholar.service';

describe('ScholarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScholarService]
    });
  });

  it('should be created', inject([ScholarService], (service: ScholarService) => {
    expect(service).toBeTruthy();
  }));
});
