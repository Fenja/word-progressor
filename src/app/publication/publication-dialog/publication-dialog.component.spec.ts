import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationDialogComponent } from './publication-dialog.component';
import { CountEntity, Project, ProjectState, ProjectType } from "../../project/project.model";
import { Publication } from "../publication.model";

describe('PublicationDialogComponent', () => {
  let component: PublicationDialogComponent;
  let fixture: ComponentFixture<PublicationDialogComponent>;

  let mockProject: Project = {
    countEntity: CountEntity.words,
    creationDate: new Date(2017, 10, 5),
    currentCount: 1000,
    deadline: undefined,
    description: "",
    goalCount: 50000,
    imagePath: "",
    isWorkInProgress: false,
    lastUpdate: new Date(2017, 10, 5),
    state: ProjectState.idea,
    type: ProjectType.novel,
    workingTitle: "MockProject"
  }

  let mockPublication: Publication = {
    title: 'publication title',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adds publication', () => {
    component.publication = mockPublication;
    component.addPublication();
    expect(component.project.publication).toEqual(mockPublication);
  });

  it('closes dialog after adding pub', () => {
    let closeSpy = spyOn(component, "close");
    component.publication = mockPublication;
    component.addPublication();
    expect(closeSpy).toHaveBeenCalled();
  });
});
