import {Injectable} from "@angular/core";

export class TranslationSet {
  public language!: string;
  public values: { [key: string]: string } = {}
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public languages = ['ger', 'eng'];
  public language = 'ger';
  private dictionary: { [key: string]:
  TranslationSet } = {
    ger: {
      language: 'ger',
      values: {
        example: 'Beispiel', // for testing purpose

        other: 'Sonstige',
        novel: 'Roman',
        short_story: 'Kurzgeschichte',
        flash_fiction: 'Flash Fiction',
        novelette: 'Kurz-Novelle',
        novella: 'Novelle',
        poem: 'Gedicht',
        epic: 'Epic',
        novel_series: 'Serien-Band',
        thesis: 'Hausarbeit',
        blog_post: 'Blogartikel',
        screenplay: 'Drehbuch',

        idea: 'Ideen-Phase',
        bunny: '\'Plot Bunny\'',
        plan: 'Planung',
        plot: 'Plotten/Outlinen',
        draft_1: 'Ersten Entwurf schreiben',
        draft_2: 'Zweiten Entwurf schreiben',
        draft_3: 'Dritten Entwurf schreiben',
        edit: 'Korrigieren',
        revise: 'Überarbeiten',
        alpha: 'Alpha-Leser',
        beta: 'Beta-Leser',
        editor: 'Korrektorat in Arbeit',
        submit: 'Eingesandt',
        wait: 'Abwarten...',
        publish: 'Veröffentlicht!',
        abandon: 'Schublade',

        info_no_projects: 'Keine Projekte gefunden',

        button_new_project: 'Neues Projekt',
        button_add_words: 'Wörter hinzufügen',
        button_edit: 'Bearbeiten',
        button_details: 'Details',
        button_cancel: 'Abbrechen',
        button_create: 'Erstellen',
        button_save: 'Speichern',
        button_delete: 'Löschen',
        button_update_word_count: 'Wortzahl aktualisieren',
        button_close: 'Schließen',
        button_login: 'Anmelden',
        button_signup: 'Registrieren',
        button_switch_to_signup: 'Zur Registrierung wechseln',
        button_switch_to_login: 'Zur Anmeldung wechseln',
        button_proceed_without_login: 'Ohne Anmeldung fortfahren',

        label_current_word_count: 'Aktuelle Wortzahl',
        label_goal_word_count: 'Angestrebte Wortzahl',
        label_choose_date: 'Datum auswählen',
        label_project_state: 'Projekt-Status',
        label_project_type: 'Projekt-Art',
        label_image: 'Bild',
        label_title: 'Titel',
        label_deadline: 'Deadline',
        label_submission_deadline: 'Einsendeschluss',
        label_login: 'Login',
        label_logout: 'Logout',
        label_email: 'e-Mail',
        label_password: 'Passwort',
        label_password_repeat: 'Passwort wiederholen',
        label_projects: 'Projekte',
        label_settings: 'Einstellungen',
        label_anonymous_user: 'Anonymer Nutzer',

        placeholder_working_title: 'Arbeitstitel',
        placeholder_blurp: 'Inhaltsangabe',

        headline_word_count: 'Wortzahl',
        headline_total_words: 'Gesamtwortzahl',
        headline_new_words: 'Neue Wörter',

        error_unknown: 'Ein unerwarteter Fehler ist aufgetreten.',
        error_email_exists: 'Die E-Mail-Adresse ist bereits von einem anderen Konto in Benutzung.',
        error_too_many_attempts_try_later: 'Alle Anfragen dieses Geräts wurden vorübergehend blockiert, aufgrund ungewöhnlicher Aktivitäten. Versuche es später erneut.',
        error_email_not_found: 'Ungültige Anmeldedaten.',
        error_invalid_password: 'Ungültige Anmeldedaten.',
        error_user_disabled: 'Das Benutzerkonto wurde vom Administrator gesperrt.',

      }
    },
    eng: {
      language: 'eng',
      values: {
        example: 'Example', // for testing purpose

        other: 'Other',
        novel: 'Novel',
        short_story: 'Short Story',
        flash_fiction: 'Flash Fiction',
        novelette: 'Novelette',
        novella: 'Novella',
        poem: 'Poem',
        epic: 'Epic',
        novel_series: 'Part of Series',
        thesis: 'Thesis',
        blog_post: 'Blog Post',
        screenplay: 'Screenplay',

        idea: 'idea phase',
        bunny: 'plot bunny',
        plan: 'planning phase',
        plot: 'plotting and outlining',
        draft_1: 'writing first draft',
        draft_2: 'writing second draft',
        draft_3: 'writing third draft',
        edit: 'editing',
        revise: 'revision',
        alpha: 'alpha reader phase',
        beta: 'beta reader phase',
        editor: 'editing in progress',
        submit: 'submitted',
        wait: 'wait...',
        publish: 'published!',
        abandon: 'abandoned',

        info_no_projects: 'No Projects found',

        button_new_project: 'New Project',
        button_add_words: 'Add Words',
        button_edit: 'Edit',
        button_details: 'Details',
        button_cancel: 'Cancel',
        button_create: 'Create',
        button_save: 'Save',
        button_delete: 'Delete',
        button_update_word_count: 'Update Word Count',
        button_close: 'Close',
        button_login: 'Sign in',
        button_signup: 'Sign up',
        button_switch_to_signup: 'Switch to sign up',
        button_switch_to_login: 'Switch to sign in',
        button_proceed_without_login: 'Proceeed without Login',

        label_current_word_count: 'Current Word Count',
        label_goal_word_count: 'Goal Word Count',
        label_choose_date: 'Choose Date',
        label_project_state: 'Project State',
        label_project_type: 'Project Type',
        label_image: 'Image',
        label_title: 'Title',
        label_deadline: 'Deadline',
        label_submission_deadline: 'Submission Deadline',
        label_login: 'Login',
        label_logout: 'Logout',
        label_email: 'Email',
        label_password: 'Password',
        label_password_repeat: 'Repeat Password',
        label_projects: 'Projects',
        label_settings: 'Settings',
        label_anonymous_user: 'Anonymous User',

        placeholder_working_title: 'Working Title',
        placeholder_blurp: 'Blurp',

        headline_word_count: 'Word Count',
        headline_total_words: 'Total Words',
        headline_new_words: 'New Words',

        error_unknown: 'An unexpected error occured.',
        error_email_exists: 'The email address is already in use by another account.',
        error_too_many_attempts_try_later: 'All requests from this device have been blocked due to unusual activity. Try again later.',
        error_email_not_found: 'Invalid credentials.',
        error_invalid_password: 'Invalid credentials.',
        error_user_disabled: 'The user account has been disabled by an administrator.',

      }
    }
  }

  constructor() {}

  translate(key: string): string {
    if (this.dictionary[this.language] !== null) {
      return this.dictionary[this.language].values[key] ?? '!!missing_translation!!';
    }
    return '!!invalid_language!!';
  }
}
