import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { By } from "@angular/platform-browser";
import { AuthService } from "./auth.service";
import { DataStorageService } from "../services/data-storage.service";
import { of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslationService } from "../translation/translation.service";
import { TranslatePipe } from "../translation/translate.pipe";
import { FormsModule, NgForm } from "@angular/forms";

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthComponent, TranslatePipe ],
      imports: [
        RouterTestingModule.withRoutes([]),
        RouterTestingModule,
        FormsModule
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
    component.form = new NgForm([],[]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has form', fakeAsync(() => {
    expect(component.isLoading).toBeFalsy();
    expect(component.error).toBeUndefined();
    expect(component.form).toBeDefined();
    expect(component.form.value).toBeDefined();
  })); // https://embed.plnkr.co/EYawvS/

  it('needs form to be initially invalid', fakeAsync(() => {
    component.form.form.markAllAsTouched();
    expect(component.form.valid).toBeFalsy();
  }));

  it('displays login labels', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const loginButton: HTMLButtonElement = fixture.debugElement.query(By.css('[data-testid="login-button"]')).nativeElement;
    expect(loginButton).toBeTruthy();
    expect(loginButton.textContent).toEqual('Sign in');
  }));

  it('switches to register labels', fakeAsync(() => {
    component.onSwitchMode();
    fixture.detectChanges();
    tick();
    const loginButton: HTMLButtonElement = fixture.debugElement.query(By.css('[data-testid="login-button"]')).nativeElement;
    expect(loginButton).toBeTruthy();
    expect(loginButton.textContent).toEqual('Sign up');
  }));

  it('is fixed to login, when called to create user', () => {

  });


  it('rejects invalid email input', fakeAsync(() => {
    expect(component.form.value.email).toBeTruthy();
    component.form.value.email.setValue('invalid');
    fixture.detectChanges();
    tick();
    expect(component.form.value.email.valid).toBeFalsy();
  }));

  it('allows correctly filled login form', () => {
    component.form.form.get('email')?.setValue('test@test.com');
    fixture.detectChanges();
    tick();
    expect(component.form.form.get('email')?.value.toString).toEqual('test@test.com');
  });

  it('shows login only when requested by \'create account\' from anonymous user', () => {
    // TODO implement test
  });

});
