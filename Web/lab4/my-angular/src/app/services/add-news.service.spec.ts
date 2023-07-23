import { TestBed } from '@angular/core/testing';

import { AddNewsService } from './add-news.service';

describe('AddNewsService', () => {
  let service: AddNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
