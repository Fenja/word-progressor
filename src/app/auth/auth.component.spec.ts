import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";

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
    // TODO
  });

  it('rejects invalid email input', () => {

  });

  it('allows correctly filled login form', () => {

  });
});
