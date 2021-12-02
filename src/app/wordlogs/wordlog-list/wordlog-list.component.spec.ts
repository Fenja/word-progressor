import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordlogListComponent } from './wordlog-list.component';

describe('WordlogListComponent', () => {
  let component: WordlogListComponent;
  let fixture: ComponentFixture<WordlogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordlogListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
