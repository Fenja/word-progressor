export interface Milestone {
  id?: string;
  freeText?: string;
  milestoneType: MilestoneType;
  submissionOrPublisherId?: string;
  projectId: string;
  date: number;
  //tags?: Tag[];
}

export enum MilestoneType {
  other = 'other',
  submissionSubmit = 'submission_submit',
  published = 'published',
  submissionAccepted = 'submission_accept',
  submissionReject = 'submission_reject',
  projectCreated = 'project_created',
  projectStarted = 'project_started',
  projectDrafted = 'project_drafted',
  projectFinished = 'project_finished',
  projectAbandoned = 'project_abandoned'
}
