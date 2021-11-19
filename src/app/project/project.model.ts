export interface Project {
  workingTitle: string;
  description: string;
  imagePath: string;

  type: ProjectType;
  state: ProjectState;
  deadline: Date | undefined;
  countEntity: CountEntity;
  currentCount: number;
  goalCount: number;
  maxGoalCount?: number;
  isWorkInProgress: boolean;

  creationDate: Date;
  lastUpdate: Date;

  id?: string;

  wordLogs?: WordLog[];
  notes?: Note[];
  genre?: string;
  reward?: string;
  eventLink?: string; // event or submission ids
  publication?: Publication;
}

export interface WordLog {
  date: string;
  words: number,
}

export interface Note {
  id?: string;
  index: number;
  content: string;
}

export interface Publication {
  date?: Date;
  title?: string; // collection or anthology title
  publisher?: string; // or selfpub
  link?: string;
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
  submited = 'submited',
  wait = 'wait',
  published = 'published',
  abandon = 'abandon'
}

export enum ProjectEvents {
  started = 'started',
  finish_first_draft = 'finish_first_draft',
  send_beta = 'send_beta',
  submit = 'submit',
  publish = 'publish',
  lay_aside = 'lay_aside'
}

export enum CountEntity {
  words = 'words',
  characters = 'characters',
  pages = 'pages'
}
