import { TestBed } from '@angular/core/testing';
import { LogWordsService } from './log-words.service';
import { ProjectService } from "../project/project.service";
import { userData } from "../auth/user.model";
import { CountEntity, Project, ProjectState, ProjectType, WordLog } from "../project/project.model";
import { DataStorageService } from "./data-storage.service";
import { Inject } from "@angular/core";
import Utils from "../helpers/utils";

describe('LogWordsService', () => {
  let service: LogWordsService;

  const mockDate1: Date = new Date(2017, 10, 5);
  const mockDate2: Date = new Date(2017, 10, 6);
  const mockDate3: Date = new Date(2021, 10, 10);
  const mockUserId1: string = 'myUser1d';

  let mockUser: userData;
  let mockProject: Project;
  let mockProject2: Project;

  @Inject({})
  class mockStorageService extends DataStorageService {

  }

  beforeEach(() => {
    mockUser = {}
    mockProject = {
      countEntity: CountEntity.words,
      creationDate: mockDate3,
      currentCount: 1000,
      deadline: undefined,
      description: "",
      goalCount: 50000,
      imagePath: "",
      isWorkInProgress: false,
      lastUpdate: mockDate3,
      state: ProjectState.draft_1,
      type: ProjectType.novel,
      workingTitle: "MockProject"
    }

    mockProject2 = {
      countEntity: CountEntity.words,
      creationDate: mockDate3,
      currentCount: 1000,
      deadline: undefined,
      description: "",
      goalCount: 50000,
      imagePath: "",
      isWorkInProgress: false,
      lastUpdate: mockDate3,
      state: ProjectState.draft_1,
      type: ProjectType.novel,
      workingTitle: "MockProject2"
    }

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProjectService,
          useValue: {
            editProject: () => {}
          }
        }, {
          provide: DataStorageService,
          useValue: mockStorageService,
        }
      ]
    });
    service = TestBed.inject(LogWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('creates wordLogs', () => {
    expect(mockProject.wordLogs).toBeUndefined();
    expect(mockUser.wordLogs).toBeUndefined();
    service.logWords(mockUserId1, mockProject, mockDate1, 100);
    expect(mockProject.wordLogs).toBeTruthy();
    expect(mockProject.wordLogs?.find(l => l.date === Utils.normalizeDate(mockDate1).toString())).toBeTruthy();
    expect(mockUser.wordLogs).toBeTruthy();
    expect(mockUser.wordLogs?.find(l => l.date === Utils.normalizeDate(mockDate1).toString().toString())?.words).toEqual(100);
  });

  it('logs negative words', () => {
    let testWordLog: WordLog = {date: Utils.normalizeDate(mockDate1).toString().toString(), words: -100};
    service.logWords(mockUserId1, mockProject, mockDate1, -100);
    expect(mockProject.wordLogs).toContain(testWordLog);
    expect(mockUser.wordLogs).toContain(testWordLog);
  });

  it('adds more word logs', () => {
    let testWordLog1: WordLog = {date: Utils.normalizeDate(mockDate1).toString().toString(), words: 100};
    let testWordLog2: WordLog = {date: Utils.normalizeDate(mockDate2).toString().toString(), words: 200};
    service.logWords(mockUserId1, mockProject, mockDate1, 100);
    service.logWords(mockUserId1, mockProject, mockDate2, 200);
    expect(mockProject.wordLogs?.length).toBe(2);
    expect(mockUser.wordLogs?.length).toBe(2);
    expect(mockProject.wordLogs).toContain(testWordLog1);
    expect(mockProject.wordLogs).toContain(testWordLog2);
    expect(mockUser.wordLogs).toContain(testWordLog1);
    expect(mockUser.wordLogs).toContain(testWordLog2);
  });

  it('adds words to existing entry', () => {
    service.logWords(mockUserId1, mockProject, mockDate1, 100);
    service.logWords(mockUserId1, mockProject, mockDate1, 200);

    expect(mockProject.wordLogs?.length).toBe(1);
    expect(mockUser.wordLogs?.length).toBe(1);

    let wordLogProject = mockUser.wordLogs?.find(l => l.date === mockDate1.toString());
    expect(wordLogProject?.words).toBe(300);

    let wordLogUser = mockUser.wordLogs?.find(l => l.date === mockDate1.toString());
    expect(wordLogUser?.words).toBe(300);
  });

  it('logs words for different projects', () => {
    let testWordLog1: WordLog = {date: Utils.normalizeDate(mockDate1).toString().toString(), words: 100};
    let testWordLog2: WordLog = {date: Utils.normalizeDate(mockDate2).toString().toString(), words: 200};
    service.logWords(mockUserId1, mockProject, mockDate1, 100);
    service.logWords(mockUserId1, mockProject2, mockDate2, 200);
    expect(mockProject.wordLogs?.length).toBe(1);
    expect(mockProject2.wordLogs?.length).toBe(1);
    expect(mockUser.wordLogs?.length).toBe(2);

    expect(mockProject.wordLogs).toContain(testWordLog1);
    expect(mockProject2.wordLogs).toContain(testWordLog2);
    expect(mockUser.wordLogs).toContain(testWordLog1);
    expect(mockUser.wordLogs).toContain(testWordLog2);
  });

  it('combines logs for user from different projects', () => {
    service.logWords(mockUserId1, mockProject, mockDate1, 100);
    service.logWords(mockUserId1, mockProject2, mockDate1, 200);

    expect(mockUser.wordLogs?.length).toBe(1);
    let wordLog = mockUser.wordLogs?.find(l => l.date === mockDate1.toString());
    expect(wordLog?.words).toBe(300);
  });
});
