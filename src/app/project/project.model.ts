import {WordLog} from "./add-words-dialog/word-log.model";

export interface Project {
  workingTitle: string;
  description: string;
  imagePath: string;

  type: ProjectType;
  state: ProjectState;
  deadline: Date | undefined;
  currentWordcount: number;
  goalWordcount: number;
  maxGoalWordcount?: number;

  id?: string;

  wordLogs?: WordLog[];
  notes?: Note[];
}

export interface Note {
  id?: string;
  index: number;
  content: string;
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
  submit = 'submit',
  wait = 'wait',
  publish = 'publish',
  abandon = 'abandon'
}
