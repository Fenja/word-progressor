import { WordLog } from "../project/project.model";

export interface userData {
  email?: string;
  id?: string;
  penName?: string;
  age?: number;

  settings?: {[key: string]: boolean }

  achievements?: string[]; // list of achievements
  wordLogs?: WordLog[]; // collected from all projects
  wordLogsString?: string;
  lastLogin?: Date;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}
