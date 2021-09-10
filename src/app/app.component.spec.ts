import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {By} from "@angular/platform-browser";

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`has 'WordProgressor' as title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('WordProgressor');
  });

  it('has an AppHeader', () => {
    fixture.detectChanges();
    const {debugElement} = fixture;
    const header = debugElement.query(By.css('app-header'));
    expect(header).toBeTruthy();
  });
});
