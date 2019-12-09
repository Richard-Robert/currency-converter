import { TestBed } from '@angular/core/testing';

import { CurrencyConverterService } from './currency-converter.service';

describe('CurrencyConverterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyConverterService = TestBed.get(CurrencyConverterService);
    expect(service).toBeTruthy();
  });
});
