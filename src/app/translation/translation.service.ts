import { Injectable } from "@angular/core";

export class TranslationSet {
  public language!: string;
  public values: { [key: string]: string } = {}
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public languages = ['de', 'en'];
  public language = 'en';
  private dictionary: { [key: string]:
  TranslationSet } = {
    de: {
      language: 'de',
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
        lyrics: 'Songtext',

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

        words: 'Wörter',
        characters: 'Zeichen',
        pages: 'Seiten',

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
        button_google_login: 'Mit Google anmelden',
        button_google_register: 'Mit Google registrieren',

        label_current_word_count: 'Aktuelle Wortzahl',
        label_goal_word_count: 'Angestrebte Wortzahl',
        label_max_goal_word_count: 'Maximale Wortzahl',
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
        label_wip: 'In arbeit',
        label_date: 'Datum',
        label_create_account: 'Konto erstellen',
        label_delete_account: 'Konto löschen',
        label_account: 'Benutzerkonto',
        label_pseudonym: 'Autorenname',
        label_privacy_policy: 'Datenschutzerklärung',
        label_word_logs: 'Wörter Statistik',
        label_count_entity: 'Einheiten',

        placeholder_working_title: 'Arbeitstitel',
        placeholder_blurb: 'Inhaltsangabe',

        tooltip_sort: 'sortieren',
        tooltip_filter: 'filtern',
        tooltip_search: 'suchen',

        headline_word_count: 'Wortzahl',
        headline_total_words: 'Gesamtwortzahl',
        headline_new_words: 'Neue Wörter',

        error_unknown: 'Ein unerwarteter Fehler ist aufgetreten.',
        error_email_exists: 'Die E-Mail-Adresse ist bereits von einem anderen Konto in Benutzung.',
        error_too_many_attempts_try_later: 'Alle Anfragen dieses Geräts wurden vorübergehend blockiert, aufgrund ungewöhnlicher Aktivitäten. Versuche es später erneut.',
        error_email_not_found: 'Ungültige Anmeldedaten.',
        error_invalid_password: 'Ungültige Anmeldedaten.',
        error_user_disabled: 'Das Benutzerkonto wurde vom Administrator gesperrt.',
        error_invalid_value: 'Ungültiger Wert',

        msg_words_added: ' Wörter hinzugefügt',
        msg_created: ' erstellt',
        msg_saved: ' gespeichert',
        msg_deleted: ' gelöscht',
        msg_account_deleted: 'Account gelöscht',
        msg_email_verified: 'Email bestätigt',

        text_anonymous_dialog: `Wenn der WordProgressor ohne Konto genutzt wird, werden die Daten lokal gespeichert.\n
            Sie können dann weder synchronisiert, noch von einem anderen Gerät aus abgerufen werden.\n
            Wenn das Gerät verloren oder zurückgesetzt wird, sind die Daten verloren.\n
            Trotzdem kann der WordProgressor gerne anonym ausprobiert und - durch das Anlegen eines Kontos - die Daten später gesichert werden.\n
            Außerdem sind einige Funktionalitäten nur für Nutzer mit Konto verfügbar.`,
        text_create_account: 'Mit dem Erstellen eines Kontos werden die lokalen Daten synchronisiert und könne per Anmeldung von überall abgefragt werden.',
        text_delete_account: 'Die Löschung des Kontos kann nicht rückgängig gemacht werden!\nMit dem Konto werden auch alle gespeicherten Daten gelöscht.'
      }
    },
    en: {
      language: 'en',
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
        lyrics: 'Lyrics',

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

        words: 'Words',
        characters: 'Characters',
        pages: 'Pages',

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
        button_proceed_without_login: 'Proceed without Login',
        button_google_login: 'Sign in with Google',
        button_google_register: 'Sign up with Google',

        label_current_word_count: 'Current Word Count',
        label_goal_word_count: 'Goal Word Count',
        label_max_goal_word_count: 'Max Word Count',
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
        label_wip: 'Work in Progress',
        label_date: 'Date',
        label_create_account: 'Create Account',
        label_delete_account: 'Delete Account',
        label_account: 'User Account',
        label_pseudonym: 'Pen Name',
        label_privacy_policy: 'Privacy Policy',
        label_word_logs: 'Word Logs',
        label_count_entity: 'Entity',

        placeholder_working_title: 'Working Title',
        placeholder_blurb: 'Blurb',

        tooltip_sort: 'sort',
        tooltip_filter: 'filter',
        tooltip_search: 'search',

        headline_word_count: 'Word Count',
        headline_total_words: 'Total Words',
        headline_new_words: 'New Words',

        error_unknown: 'An unexpected error occured.',
        error_email_exists: 'The email address is already in use by another account.',
        error_too_many_attempts_try_later: 'All requests from this device have been blocked due to unusual activity. Try again later.',
        error_email_not_found: 'Invalid credentials.',
        error_invalid_password: 'Invalid credentials.',
        error_user_disabled: 'The user account has been disabled by an administrator.',
        error_invalid_value: 'Invalid value',

        msg_words_added: ' words added',
        msg_created: ' created',
        msg_saved: ' saved',
        msg_deleted: ' deleted',
        msg_account_deleted: 'Account deleted',
        msg_email_verified: 'Email verified',

        text_anonymous_dialog: `When using the WordProgressor without an account, your data is stored locally.\n
            You won't be able to sync them or access them from another access point.\n
            When loosing or resetting your device, your data is lost.\n
            Nonetheless, please feel free to try the WordProgressor anynomously, before creating an account, to save your data later.\n
            Also, some functionality is only available for users with an account.`,
        text_create_account: 'When creating an account, your local data is uploaded and can be accessed via authentication.',
        text_delete_account: 'Deleting your account can not be undone!\nWith your account, all data will be deleted too.'
      }
    }
  }

  constructor() {
    this.language = navigator.language.split('-')[0];
  }

  translate(key: string): string {
    if (this.dictionary[this.language] !== null) {
      return this.dictionary[this.language].values[key] ?? '!!missing_translation!!';
    }
    return '!!invalid_language!!';
  }

  getLocale() {
    return this.language;
  }
}
