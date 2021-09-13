import {WordLog} from "../project/add-words-dialog/word-log.model";

export interface userData {
  id?: string;
  penName?: string;
  age?: number;

  achievements: string[]; // list of achievements
  wordLogs?: WordLog[]; // collected from all projects
}

export class User {
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
}
