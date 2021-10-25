import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      providers: [{
        provide: HttpClient,
        useValue: {
          post: () => {}
        }
      }, {
        provide: MatDialog,
        useValue: {
          open: () => {},
        }
      }, {
        provide: Router,
        useValue: {
          navigate: () => {},
        }
      }, {
        provide: ActivatedRoute,
        useValue: {
          queryParams: () => '',
        }
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('rejects submission of empty form', () => {
    // TODO implement test
  });

  it('rejects invalid email input', () => {
    // TODO implement test
  });

  it('allows correctly filled login form', () => {
    // TODO implement test
  });

  it('signs in automatically when token is still present', () => {
    // TODO implement test
  });

  it('shows login only when requested by \'create account\' from anonymous user', () => {
    // TODO implement test
  });

  it('signs up via google', () => {
    // TODO implement test
  });

  it('signs up via email and pw', () => {
    // TODO implement test
  });

  it('signs in via google', () => {
    // TODO implement test
  });

  it('signs in via email and pw', () => {
    // TODO implement test
  });

  it('proceeds as anonymous user', () => {
    // TODO implement test
  });
});
