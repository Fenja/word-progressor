import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordDialog } from './forgot-password.component';
import { AuthService } from "../auth.service";

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordDialog;
  let fixture: ComponentFixture<ForgotPasswordDialog>;
  let afAuth: any = {
    sendPasswordResetEmail: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordDialog ],
      providers: [{
        provide: AuthService,
        useValue: afAuth,
      }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls password forget function', () => {
    let spy = spyOn(afAuth, 'ForgotPassword').and.returnValue(true);
    component.sendNewPasswordTo('test@test.com');
    expect(spy).toHaveBeenCalled();
  });
});
