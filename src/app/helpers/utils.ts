import {Note, ProjectEvent, ProjectState, WordLog} from "../project/project.model";
import {Settings} from "../auth/user.model";

export default class Utils {

  static normalizedToday(): number {
    let today = new Date();
    today.setHours(0,0,0,0);
    return Utils.normalizeDate(today);
  }

  static normalizeDate(date: Date): number {
    return new Date(date).getTime();
  }

  static getAvailableEventsForProjectState(state: ProjectState): ProjectEvent[] {
    let result = [ProjectEvent.lay_aside];
    switch (state) {
      case ProjectState.idea:
      case ProjectState.bunny:
      case ProjectState.plan:
      case ProjectState.plot:
        result.push(ProjectEvent.start); break;
      case ProjectState.draft_1:
        result.push(ProjectEvent.finish_first_draft);
        result.push(ProjectEvent.send_alpha);
        break;
      case ProjectState.editor:
      case ProjectState.draft_2:
      case ProjectState.draft_3:
      case ProjectState.alpha:
      case ProjectState.beta:
        result.push(ProjectEvent.start_revision); break;
      case ProjectState.revise:
        result.push(ProjectEvent.finish_revision);
        result.push(ProjectEvent.send_beta);
        result.push(ProjectEvent.send_editor);
        break;
      case ProjectState.finished:
        result.push(ProjectEvent.submit);
        result.push(ProjectEvent.publish);
        break;
      case ProjectState.submitted:
        result.push(ProjectEvent.rejected);
        result.push(ProjectEvent.publish);
        break;
      case ProjectState.abandon:
        result.push(ProjectEvent.start);
        result.push(ProjectEvent.start_revision);
    }
    return result;
  }

  static repairWordLogs(logs: WordLog[]): WordLog[] {
    logs = logs.filter(Utils.notEmpty);
    logs = logs.filter((log: WordLog) => (log.words !== 0));
    logs = logs.sort((a, b) => (+(a.date) < +(b.date) ? -1 : 1))
    return logs;
  }

  static repairNotes(notes: Note[]): Note[] {
    notes = notes.filter(Utils.notEmpty);
    notes = notes.filter((notes: Note) => (notes.content?.length > 0));
    return notes;
  }

  static notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    if (value === null || value === undefined) return false;
    const testDummy: TValue = value;
    return true;
  }

  static getDefaultSettings(): Settings {
    return {
      dailyWordGoal: 0,
      isWeekDayGoal: true,
      selectedDays: [],
      daysPerWeek: 0,

      filterDraft: true,
      filterWait: true,
      filterFinished: true,
      filterInactive: true,
      filterLong: true,
      filterPrep: true,
      filterShort: true,

      filterWip: false,
      filterSubprojects: false,
      filterDeadline: false,

      isSortAlphabetical: false,
      isSortByUpdate: false,
      isSortByDeadline: false,

      isHideAbandoned: false,
      isHideFinished: false,
      isHidePublished: false,
      isHideSubmitted: false,

      notifyDailyWriting: false,
      timeDailyWriting: {hours: 7, minutes: 0},
      notifyDeadline: false,
      daysBeforeDeadlineReminder: [],

      isAdmin: undefined,
      filterFavorites: false,
      isHidePassed: false,
      language: 'all',
    };
  }

  static isInPast(deadline: Date | undefined) {
    if (!deadline) return false;
    let today = new Date();
    return new Date(deadline).getTime() < today.getTime();
  }
}
