import { TestBed } from '@angular/core/testing';

import { DishService } from './dish-service.service';

describe('DishServiceService', () => {
  let service: DishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
