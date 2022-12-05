import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProgressBarComponent } from './project-progress-bar.component';
import { By } from "@angular/platform-browser";

function getProgressBar(fixture: ComponentFixture<any>): any {
  const {debugElement} = fixture;
  return debugElement.query(By.css('mat-progress-bar'));
}

describe('ProjectProgressBarComponent', () => {
  let component: ProjectProgressBarComponent;
  let fixture: ComponentFixture<ProjectProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProgressBarComponent);
    component = fixture.componentInstance;
    component.goalCount = 50000;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('shows progress bar with wordcount', () => {
    component.currentCount = 1667;
    fixture.detectChanges();
    expect(getProgressBar(fixture)).toBeTruthy();
  });

  it('displays a full progress bar when word count goal is reached and above', () => {
    component.currentCount = component.goalCount + 1000;
    fixture.detectChanges();
    expect(getProgressBar(fixture)).toBeTruthy();
  });

  it('displays current and goal count as text', () => {
    component.currentCount = 25000;
    fixture.detectChanges();
    let {debugElement} = fixture;
    let countSpan = debugElement.query(By.css('[data-testid="project-word-count"]'));
    expect(countSpan).toBeTruthy();
    expect(countSpan.nativeElement.innerHTML).toContain('25000 / 50000');
  });

  it('displays current and goal count range as text', () => {
    component.currentCount = 25000;
    component.maxGoalCount = 60000;
    fixture.detectChanges();
    let {debugElement} = fixture;
    let countSpan = debugElement.query(By.css('[data-testid="project-word-count"]'));
    expect(countSpan).toBeTruthy();
    expect(countSpan.nativeElement.innerHTML).toContain('25000 / 50000<span>-60000</span>');
  });

  it('does not display a progress bar when there is no wordcount', () => {
    component.goalCount = 0;
    fixture.detectChanges();
    const {debugElement} = fixture;
    const progressBar = debugElement.query(By.css('mat-progress-bar'));
    expect(progressBar).toBeFalsy();
  });

  it('displays only current count when there is no goal count', () => {
    component.goalCount = 0;
    component.currentCount = 42000;
    fixture.detectChanges();
    const {debugElement} = fixture;
    const wordCountDisplay = debugElement.query(By.css('[data-testid="project-current-count"]'));
    expect(wordCountDisplay).toBeTruthy()
  });

  it('displays bar in accent color when goal is not met yet', () => {
    component.goalCount = 100;
    component.currentCount = 50;
    fixture.detectChanges();
    const {debugElement} = fixture;
    const progressBar = debugElement.query(By.css('mat-progress-bar'));
    expect(progressBar.attributes.color).toBe('primary');
  });

  it('displays bar in secondary color when goal is reached', () => {
    component.goalCount = 100;
    component.currentCount = 200;
    fixture.detectChanges();
    const {debugElement} = fixture;
    const progressBar = debugElement.query(By.css('mat-progress-bar'));
    expect(progressBar.attributes.color).toBe('accent');
  });

  it('displays bar in warn color when maximum is exceeded', () => {
    component.goalCount = 100;
    component.maxGoalCount = 500;
    component.currentCount = 600;
    fixture.detectChanges();
    const {debugElement} = fixture;
    const progressBar = debugElement.query(By.css('mat-progress-bar'));
    expect(progressBar.attributes.color).toBe('warn');
  });
});
