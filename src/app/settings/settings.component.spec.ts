import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { AuthService } from "../auth/auth.service";
import { TranslationService } from "../translation/translation.service";
import { Router } from "@angular/router";
import { DataStorageService } from "../services/data-storage.service";
import { By } from "@angular/platform-browser";
import { TranslatePipe } from "../translation/translate.pipe";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  describe('Authenticated user', () => {

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ SettingsComponent, TranslationService, TranslatePipe ],
        providers: [
          {
            provide: AuthService,
            useValue: {
              isAnonymous: () => false,
              isAuthenticated: () => true,
            }
          }, {
            provide: Router,
            useValue: {
              navigate: () => {}
            }
          },{
            provide: DataStorageService,
            useValue: {
              deleteUser: () => {}
            }
          }
        ]
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(SettingsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('displays delete button', () => {
      let {debugElement} = fixture;
      expect(debugElement.query(By.css('[data-testid="upload-button"]'))).toBeTruthy();
    });

  });
  describe('Authenticated user', () => {

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ SettingsComponent, TranslationService, TranslatePipe ],
        providers: [
          {
            provide: AuthService,
            useValue: {
              isAnonymous: () => true,
              isAuthenticated: () => false,
            }
          }, {
            provide: Router,
            useValue: {
              navigate: () => {}
            }
          }
        ]
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(SettingsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('displays upload button', () => {
      let {debugElement} = fixture;
      expect(debugElement.query(By.css('[data-testid="delete-button"]'))).toBeTruthy();
    });

  });
});
