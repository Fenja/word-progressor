import { TestBed } from '@angular/core/testing';

import { MeessagingService } from './messaging.service';

describe('MeessagingService', () => {
  let service: MeessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
