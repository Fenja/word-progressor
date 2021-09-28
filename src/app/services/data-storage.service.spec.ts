import { TestBed } from '@angular/core/testing';
import { DataStorageService } from "./data-storage.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";


describe('DataStorageService', () => {
  let service: DataStorageService;

  describe('Authenticated user', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: HttpClient,
            useValue: {
              post: () => {},
              delete: () => {},
            }
          },{
            provide: AuthService,
            useValue: {
              checkAnonymous: () => {},
              isAnonymous: () => false,
              userId: () => '42',
            }
          }
        ]
      });
      service = TestBed.inject(DataStorageService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

  });



  describe('Anonymous user', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: HttpClient,
            useValue: {
              post: () => {},
              delete: () => {},
            }
          }, {
            provide: AuthService,
            useValue: {
              checkAnonymous: () => {},
              isAnonymous: () => true,
              userId: () => '42',
            }
          }
        ]
      });
      service = TestBed.inject(DataStorageService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

  })
});
