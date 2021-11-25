import { WordLog } from "../project/project.model";

export interface userData {
  email?: string;
  id?: string;
  penName?: string;
  age?: number;

  settings?: Settings;

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

  // filter
  showOnlyWip: boolean;
  isSortByDeadline: boolean;
}
