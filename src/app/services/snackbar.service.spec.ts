import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';
import {MatSnackBar} from "@angular/material/snack-bar";

describe('SnackbarService', () => {
  let service: SnackbarService;
  let matSnackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: MatSnackBar,
        useValue: {open:() => {}}
      }]
    });
    service = TestBed.inject(SnackbarService);
    matSnackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('calls the MatSnackBar open method with string "test"', () => {
    const matSnackBarSpy = spyOn(matSnackBar, 'open').and.stub();
    service.showSnackBar('test');
    expect(matSnackBarSpy.calls.count()).toBe(1);
  });
});
