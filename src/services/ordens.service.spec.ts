/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrdensService } from './ordens.service';

describe('Service: Ordens', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdensService]
    });
  });

  it('should ...', inject([OrdensService], (service: OrdensService) => {
    expect(service).toBeTruthy();
  }));
});
