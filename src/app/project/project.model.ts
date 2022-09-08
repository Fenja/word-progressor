import { Publication } from "../publication/publication.model";
import { Subproject } from "./subproject/subproject.model";
import { Submission } from "../submissions/submission.model";
import { Milestone } from "../milestones/milestone.model";

export interface AbstractProject {
  id?: string;
  workingTitle: string;
  description: string;
  countEntity: CountEntity;
  currentCount: number;
  state: ProjectState;
  goalCount: number;
  maxGoalCount?: number;
  isWorkInProgress: boolean;
  submission?: Submission;
  milestones?: Milestone[];
}

export interface Project extends AbstractProject {
  imagePath: string;
  type: ProjectType;
  deadline: Date | undefined;
  creationDate: Date;
  lastUpdate: Date;
  genre?: string;
  reward?: string;
  eventLink?: string; // event or submission ids
  publication?: Publication;
  language?: string;

  wordLogs?: WordLog[];
  notes?: Note[];
  drafts?: Draft[];
  subprojects?: Subproject[];
}

export interface WordLog {
  date: string;
  words: number;
}

export interface Note {
  id?: string;
  index: number;
  content: string;
}

export interface Draft {
  name: string;
  countEntity: CountEntity;
  count: number;
}

export enum ProjectType {
  other = 'other',
  novel = 'novel',
  short_story = 'short_story',
  flash_fiction = 'flash_fiction',
  novelette = 'novelette',
  novella = 'novella',
  poem = 'poem',
  epic = 'epic',
  novel_series = 'novel_series',
  thesis = 'thesis',
  blog_post = 'blog_post',
  screenplay = 'screenplay',
  lyrics = 'lyrics',
}

export enum ProjectState {
  idea = 'idea',
  bunny = 'bunny',
  plan = 'plan',
  plot = 'plot',
  draft_1 = 'draft_1',
  draft_2 = 'draft_2',
  draft_3 = 'draft_3',
  edit = 'edit',
  revise = 'revise',
  alpha = 'alpha',
  beta = 'beta',
  editor = 'editor',
  finished = 'finished',
  submitted = 'submitted',
  wait = 'wait',
  published = 'published',
  abandon = 'abandon'
}

export enum ProjectEvent {
  start = 'start',
  finish = 'generic_finish',
  finish_first_draft = 'finish_first_draft',
  finish_revision = 'finish_revision',
  start_revision = 'start_revision',
  send_alpha = 'send_alpha',
  send_beta = 'send_beta',
  send_editor = 'send_editor',
  submit = 'submit',
  rejected = 'rejected',
  publish = 'publish',
  lay_aside = 'lay_aside'
}

export enum CountEntity {
  words = 'words',
  characters = 'characters',
  pages = 'pages'
}
