import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordlogItemComponent } from './wordlog-item.component';

describe('WordlogItemComponent', () => {
  let component: WordlogItemComponent;
  let fixture: ComponentFixture<WordlogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordlogItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordlogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
