import { CountEntity } from "../project/project.model";
import { Language } from "../auth/user.model";

export interface Submission {
  id?: string;
  title: string;
  publisher: string;
  deadline: Date | undefined;
  link: string;
  minCount: number;
  maxCount: number;
  countEntity: CountEntity;
  genre: string;
  description: string;
  restrictions?: string;
  language?: Language;
  creationDate: Date;
}
