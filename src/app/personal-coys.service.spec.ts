import { TestBed } from '@angular/core/testing';

import { PersonalCoysService } from './personal-coys.service';

describe('PersonalCoysService', () => {
  let service: PersonalCoysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalCoysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
