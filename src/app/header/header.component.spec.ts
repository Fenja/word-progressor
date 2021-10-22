import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from "../auth/auth.service";
import { TranslatePipe } from "../translation/translate.pipe";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let isAnonymous: boolean;
  let isLoggedIn: boolean;

  beforeEach(async () => {
    isAnonymous = false;
    isLoggedIn = false;
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        TranslatePipe
      ],
      providers: [{
        provide: AuthService,
        useValue: {
          isAnonymous: () => isAnonymous,
          isLoggedIn: () => isLoggedIn,
          SignOut: () => isLoggedIn = false,
        }
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows \'Login\' when user is neither anonymous nor logged in', () => {

  });

  it('shows header elements when user is authenticated', () => {
    isLoggedIn = true;
  });

  it('shows header elements and \'Anonymous User\' for anonymous user', () => {
    isAnonymous = true;
  });

  it('shows no Login for anonymous user', () => {
    isAnonymous = true;
  });

  it('logs out on \'Logout\'', () => {
    isLoggedIn = true;
    component.onLogout();
    expect(isLoggedIn).toEqual(false);
  });
});
