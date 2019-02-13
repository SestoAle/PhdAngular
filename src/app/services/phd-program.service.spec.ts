import { TestBed, inject } from '@angular/core/testing';

import { PhdProgramService } from './phd-program.service';

describe('PhdProgramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhdProgramService]
    });
  });

  it('should be created', inject([PhdProgramService], (service: PhdProgramService) => {
    expect(service).toBeTruthy();
  }));
});
