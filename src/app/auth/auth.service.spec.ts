import { AuthService } from "./auth.service";
import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        {
          provide: HttpClient,
          useValue: {
            post: () => {},
          }
        }, {
          provide: Router,
          useValue: {
            navigate: () => {},
          }
        }
      ]
    });
    service = TestBed.inject(AuthService);
  });
})
