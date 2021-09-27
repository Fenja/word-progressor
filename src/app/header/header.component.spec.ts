import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from "../auth/auth.service";
import { of } from "rxjs";
import { User } from "../auth/user.model";
import { TranslatePipe } from "../translation/translate.pipe";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let mockUser: User | undefined = new User('test@test.com','id42', null, new Date());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        TranslatePipe
      ],
      providers: [{
        provide: AuthService,
        useValue: {
          user: of(mockUser),
          logout: () => {mockUser = undefined},
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

  it('shows authentication when user is found', () => {
    expect(component.isAuthenticated).toBe(true);
  });

  it('shows unauthenticated after logout', () => {
    component.onLogout();
    fixture.detectChanges();
    expect(component.isAuthenticated).toBe(false);
  });
});
