import { WordLog } from "../services/log-words.service";

export interface userData {
  email?: string;
  id?: string;
  penName?: string;
  age?: number;

  achievements?: string[]; // list of achievements
  wordLogs?: WordLog[]; // collected from all projects
  lastLogin?: Date;
}

/*export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string | null,
    private _tokenExpirationDate: Date
  ) {
  }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    } else {
      return this._token;
    }
  }
}*/

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}
