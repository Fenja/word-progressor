import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFooterComponent } from './project-footer.component';
import {TranslatePipe} from "../../translation/translate.pipe";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProjectFooterComponent', () => {
  let component: ProjectFooterComponent;
  let fixture: ComponentFixture<ProjectFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProjectFooterComponent,
        TranslatePipe,
      ],
      providers: [ HttpClientTestingModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
