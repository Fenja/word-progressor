export class Project {
  public workingTitle: string;
  public description: string;
  public imagePath: string;

  public type: ProjectType;
  public state: ProjectState;
  public deadline: Date | undefined;
  public currentWordcount: number;
  public goalWordcount: number;


  constructor(workingTitle: string = '', description: string = '', imagePath: string = '', type: ProjectType = ProjectType.short_story, state: ProjectState = ProjectState.idea, deadline: Date | undefined = undefined, currentWordcount: number = 0, goalWordcount: number = 0) {
    this.workingTitle = workingTitle;
    this.description = description;
    this.imagePath = imagePath;
    this.type = type;
    this.state = state;
    this.deadline = deadline;
    this.currentWordcount = currentWordcount;
    this.goalWordcount = goalWordcount;
  }

  getProjectState() {
    return this.state.toString();
  }

  getProjectType() {
    return this.type.toString();
  }


}

export enum ProjectType {
  other= 'other',
  novel = 'novel',
  short_story = 'short_story',
  flash_fiction = 'flash_fiction',
  novellette = 'novelette',
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
