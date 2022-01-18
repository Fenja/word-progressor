import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "./auth.service";
import { DataStorageService } from "../services/data-storage.service";
import { of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslationService } from "../translation/translation.service";
import { TranslatePipe } from "../translation/translate.pipe";

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthComponent, TranslatePipe ],
      imports: [
        RouterTestingModule.withRoutes([]),
        RouterTestingModule,
      ],
      providers: [
        TranslationService,
      {
        provide: MatDialog,
        useValue: {
          open: () => {},
        }
      }, {
        provide: ActivatedRoute,
        useValue: { queryParams: of({mode:''}) },
      }, {
        provide: AuthService,
        useValue: {
          SignIn: () => of(true),
          SignUp: () => of(true),
          GoogleAuth: () => of(true),
        }
      }, {
        provide: DataStorageService,
        useValue: {

        }
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
