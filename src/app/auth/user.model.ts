import {Project, WordLog} from "../project/project.model";
import { Time } from "@angular/common";

export interface userData {
  email?: string;
  id?: string;
  penName?: string;
  age?: number;

  settings?: Settings;
  favorites?: string[];
  submittedProjects?: SubmissionProjects[];

  achievements?: string[]; // list of achievements
  wordLogs?: WordLog[]; // collected from all projects
  lastLogin?: Date;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface Settings {
  // word goal
  dailyWordGoal: number;
  isWeekDayGoal: boolean;
  selectedDays: number[]; // 0=monday
  daysPerWeek: number;

  // filter
  filterPrep: boolean;
  filterWait: boolean;
  filterDraft: boolean;
  filterFinished: boolean;
  filterInactive: boolean;
  filterShort: boolean;
  filterLong: boolean;
  filterWip: boolean;
  filterSubprojects: boolean;
  filterDeadline: boolean;

  isSortByDeadline: boolean;
  isSortAlphabetical: boolean;
  isSortByUpdate: boolean;

  isHidePublished: boolean
  isHideFinished: boolean
  isHideAbandoned: boolean;
  isHideSubmitted: boolean;

  isAdmin: boolean | undefined; // added to firebase DB by hand

  // notifications
  notifyDailyWriting: boolean;
  timeDailyWriting: Time;
  notifyDeadline: boolean;
  daysBeforeDeadlineReminder: number[];

  // submissions
  filterFavorites: boolean;
  isHidePassed: boolean;
}

export interface SubmissionProjects {
  submissionId: string;
  projects: Project[];
}
