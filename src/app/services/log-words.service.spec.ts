import { TestBed } from '@angular/core/testing';

import { LogWordsService } from './log-words.service';

describe('LogWordsService', () => {
  let service: LogWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
