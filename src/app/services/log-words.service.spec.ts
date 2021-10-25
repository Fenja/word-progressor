import { TestBed } from '@angular/core/testing';
import { LogWordsService, WordLog } from './log-words.service';
import { ProjectService } from "../project/project.service";
import { userData } from "../auth/user.model";
import {CountEntity, Project, ProjectState, ProjectType} from "../project/project.model";
import { DataStorageService } from "./data-storage.service";
import { Inject } from "@angular/core";

describe('LogWordsService', () => {
  let service: LogWordsService;

  const mockDate1: Date = new Date(2017, 10, 5);
  const mockDate2: Date = new Date(2017, 10, 6);
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
      creationDate: mockDate1,
      currentCount: 1000,
      deadline: undefined,
      description: "",
      goalCount: 50000,
      imagePath: "",
      isWorkInProgress: false,
      lastUpdate: mockDate1,
      state: ProjectState.draft_1,
      type: ProjectType.novel,
      workingTitle: "MockProject"
    }

    mockProject2 = {
      countEntity: CountEntity.words,
      creationDate: mockDate1,
      currentCount: 1000,
      deadline: undefined,
      description: "",
      goalCount: 50000,
      imagePath: "",
      isWorkInProgress: false,
      lastUpdate: mockDate1,
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
    let testWordLog: WordLog = {date: mockDate1, words: 100};
    service.logWords(mockUserId1, mockProject, testWordLog);
    expect(mockProject.wordLogs).toBeTruthy();
    expect(mockProject.wordLogs).toContain(testWordLog);
    expect(mockUser.wordLogs).toBeTruthy();
    expect(mockUser.wordLogs).toEqual([testWordLog]);
  });

  it('logs negative words', () => {
    let testWordLog: WordLog = {date: mockDate1, words: -100};
    service.logWords(mockUserId1, mockProject, testWordLog);
    expect(mockProject.wordLogs).toContain(testWordLog);
    expect(mockUser.wordLogs).toContain(testWordLog);
  });

  it('adds more word logs', () => {
    let testWordLog1: WordLog = {date: mockDate1, words: 100};
    let testWordLog2: WordLog = {date: mockDate2, words: 200};
    service.logWords(mockUserId1, mockProject, testWordLog1);
    service.logWords(mockUserId1, mockProject, testWordLog2);
    expect(mockProject.wordLogs?.length).toBe(2);
    expect(mockUser.wordLogs?.length).toBe(2);
    expect(mockProject.wordLogs).toContain(testWordLog1);
    expect(mockProject.wordLogs).toContain(testWordLog2);
    expect(mockUser.wordLogs).toContain(testWordLog1);
    expect(mockUser.wordLogs).toContain(testWordLog2);
  });

  it('adds words to existing entry', () => {
    let testWordLog1: WordLog = {date: mockDate1, words: 100};
    let testWordLog2: WordLog = {date: mockDate1, words: 200};
    service.logWords(mockUserId1, mockProject, testWordLog1);
    service.logWords(mockUserId1, mockProject, testWordLog2);

    expect(mockProject.wordLogs?.length).toBe(1);
    expect(mockUser.wordLogs?.length).toBe(1);

    let wordLogProject = mockUser.wordLogs?.find(l => l.date === mockDate1);
    expect(wordLogProject?.words).toBe(300);

    let wordLogUser = mockUser.wordLogs?.find(l => l.date === mockDate1);
    expect(wordLogUser?.words).toBe(300);
  });

  it('logs words for different projects', () => {
    let testWordLog1: WordLog = {date: mockDate1, words: 100};
    let testWordLog2: WordLog = {date: mockDate2, words: 200};
    service.logWords(mockUserId1, mockProject, testWordLog1);
    service.logWords(mockUserId1, mockProject2, testWordLog2);
    expect(mockProject.wordLogs?.length).toBe(1);
    expect(mockProject2.wordLogs?.length).toBe(1);
    expect(mockUser.wordLogs?.length).toBe(2);

    expect(mockProject.wordLogs).toContain(testWordLog1);
    expect(mockProject2.wordLogs).toContain(testWordLog2);
    expect(mockUser.wordLogs).toContain(testWordLog1);
    expect(mockUser.wordLogs).toContain(testWordLog2);
  });

  it('combines logs for user from different projects', () => {
    let testWordLog1: WordLog = {date: mockDate1, words: 100};
    let testWordLog2: WordLog = {date: mockDate1, words: 200};
    service.logWords(mockUserId1, mockProject, testWordLog1);
    service.logWords(mockUserId1, mockProject2, testWordLog2);

    expect(mockUser.wordLogs?.length).toBe(1);
    let wordLog = mockUser.wordLogs?.find(l => l.date === mockDate1);
    expect(wordLog?.words).toBe(300);
  });
});
