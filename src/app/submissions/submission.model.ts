import { CountEntity } from "../project/project.model";

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
  language: string;
  creationDate: Date;
}
