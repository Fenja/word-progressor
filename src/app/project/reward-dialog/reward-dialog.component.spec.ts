import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardDialogComponent, RewardDialogData } from './reward-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { CountEntity, Project, ProjectEvent, ProjectState, ProjectType } from "../project.model";

describe('RewardDialogComponent', () => {
  let component: RewardDialogComponent;
  let fixture: ComponentFixture<RewardDialogComponent>;

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

  let dialogData: RewardDialogData = {
    event: ProjectEvent.finish_first_draft,
    project: mockProject
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardDialogComponent ],
      imports: [ MatDialogModule ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: dialogData
        },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows default texts when no reward is specified', () => {
    expect(component.msgSpecified).toEqual('msg_reward_unspecified');
  });

  it('shows default text when no rewardable event is matched', () => {
    let dialogData: RewardDialogData = {
      event: ProjectEvent.start,
      project: mockProject
    }
    TestBed.inject(MAT_DIALOG_DATA, dialogData);
    expect(component.msgReward).toEqual('msg_reward_default');
  });

  it('shows specific reward message for publishing', () => {
    mockProject.reward = 'reward myself';
    let dialogData: RewardDialogData = {
      event: ProjectEvent.publish,
      project: mockProject
    }
    TestBed.inject(MAT_DIALOG_DATA, dialogData);
    expect(component.msgSpecified).toEqual('msg_reward_specified');
    expect(component.msgReward).toEqual('msg_reward_publish');
  });

  it('deletes reward when accepting', () => {
    mockProject.reward = 'reward myself';
    let dialogData: RewardDialogData = {
      event: ProjectEvent.publish,
      project: mockProject
    }
    TestBed.inject(MAT_DIALOG_DATA, dialogData);
    component.rewardNow();
    expect(mockProject.reward).toBeUndefined();
  });

  it('does not delete reward when chosing \'later\'', () => {
    mockProject.reward = 'reward myself';
    let dialogData: RewardDialogData = {
      event: ProjectEvent.publish,
      project: mockProject
    }
    TestBed.inject(MAT_DIALOG_DATA, dialogData);
    component.rewardLater();
    expect(mockProject.reward).toEqual('reward myself');
  });

  it('closes dialog after choosing reward time', () => {
    let closeSpy = spyOn(component, 'close');
    component.rewardNow();
    component.rewardLater();
    expect(closeSpy).toHaveBeenCalledTimes(2);
  });
});
