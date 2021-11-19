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
        submited: 'Eingesandt',
        wait: 'Abwarten...',
        published: 'Veröffentlicht!',
        abandon: 'Schublade',

        started: 'anfangen',
        finish_first_draft: 'ersten Entwurf beenden',
        send_beta: 'an Beta-Leser senden',
        submit: 'einsenden',
        publish: 'veröffentlichen',
        lay_aside: 'beiseite legen',

        words: 'Wörter',
        characters: 'Zeichen',
        pages: 'Seiten',

        info_no_projects: 'Keine Projekte gefunden',

        button_new_project: 'Neues Projekt',
        button_add: 'Hinzufügen',
        button_add_words: 'Wörter hinzufügen',
        button_add_characters: 'Zeichen hinzufügen',
        button_add_pages: 'Seiten hinzufügen',
        button_edit: 'Bearbeiten',
        button_details: 'Details',
        button_cancel: 'Abbrechen',
        button_create: 'Erstellen',
        button_save: 'Speichern',
        button_delete: 'Löschen',
        button_update: 'Aktualisieren',
        button_update_word_count: 'Wortzahl aktualisieren',
        button_close: 'Schließen',
        button_login: 'Anmelden',
        button_signup: 'Registrieren',
        button_switch_to_signup: 'Zur Registrierung wechseln',
        button_switch_to_login: 'Zur Anmeldung wechseln',
        button_proceed_without_login: 'Ohne Anmeldung fortfahren',
        button_google_login: 'Mit Google anmelden',
        button_google_register: 'Mit Google registrieren',
        button_send_reset_mail: 'Email zum Zurücksetzen versenden',
        button_add_note: 'Notiz hinzufügen',

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
        label_dashboard: 'Dashboard',
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
        label_logs: 'Statistik',
        label_count_entity: 'Einheiten',
        label_forgot_password: 'Passwort vergessen',
        label_last_updated_project: 'Zuletzt aktualisiertes Projekt',
        label_works_in_project: 'In Arbeit',
        label_words_today: 'Wörter heute',
        label_words_statistic: 'Wörter-Statistik',
        label_genre: 'Genre',
        label_reward: 'Belohnung',
        label_show_more: 'Mehr anzeigen',
        label_show_less: 'Weniger anzeigen',
        label_publication_date: 'Veröffentlichungsdatum',
        label_publisher: 'Verlag',
        label_collection_title: 'Titel des Bandes',
        label_shoplink: 'Link zur Veröffentlichung',
        label_event: 'Schreib-Event',
        label_notes: 'Notizen',

        placeholder_working_title: 'Arbeitstitel',
        placeholder_blurb: 'Inhaltsangabe',
        placeholder_reward: 'Für den Abschluss des Projekts belohnst du dich mit...',

        tooltip_sort: 'sortieren',
        tooltip_filter: 'filtern',
        tooltip_search: 'suchen',
        tooltip_wip: 'in arbeit',
        tooltip_sort_deadline: 'nach Einsendeschluss sortieren',

        headline_word_count: 'Wortzahl',
        headline_total: 'Gesamt',
        headline_new: 'Neu',
        headline_publication: 'Veröffentlichung',
        headline_submission: 'Ausschreibung',
        headline_event: 'Event',

        error_unknown: 'Ein unerwarteter Fehler ist aufgetreten.',
        error_email_exists: 'Die E-Mail-Adresse ist bereits von einem anderen Konto in Benutzung.',
        error_too_many_attempts_try_later: 'Alle Anfragen dieses Geräts wurden vorübergehend blockiert, aufgrund ungewöhnlicher Aktivitäten. Versuche es später erneut.',
        error_email_not_found: 'Ungültige Anmeldedaten.',
        error_invalid_password: 'Ungültige Anmeldedaten.',
        error_user_disabled: 'Das Benutzerkonto wurde vom Administrator gesperrt.',
        error_invalid_value: 'Ungültiger Wert',
        error_sign_in_failed: 'Anmeldung fehlgeschlagen - bitte Anmeldedaten überprüfen',
        error_sign_up_failed: 'Registrierung fehlgeschlagen',
        error_forgot_pw_failed: 'Neues Passwort konnte nicht angefordert werden',
        error_google_auth_failed: 'Authentifizierung über Google fehlgeschlagen.',

        msg_words_added: ' Wörter hinzugefügt',
        msg_created: ' erstellt',
        msg_saved: ' gespeichert',
        msg_deleted: ' gelöscht',
        msg_account_deleted: 'Account gelöscht',
        msg_email_verified: 'Email bestätigt',
        msg_reset_pw_email: 'Email zum Zurücksetzen des Passworts wurde versandt',
        msg_word_count_words_only: 'Zeichen und Seiten werden nicht zur Wort-Statistik hinzugefügt',
        msg_note_added: 'Notiz wurde zum Projekt hinzugefügt',

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
        submited: 'submitted',
        wait: 'wait...',
        published: 'published!',
        abandon: 'abandoned',

        started: 'start',
        finish_first_draft: 'finish first draft',
        send_beta: 'send to beta readers',
        submit: 'submit',
        publish: 'publish',
        lay_aside: 'lay aside',

        words: 'Words',
        characters: 'Characters',
        pages: 'Pages',

        info_no_projects: 'No Projects found',

        button_new_project: 'New Project',
        button_add: 'Add',
        button_add_words: 'Add Words',
        button_add_characters: 'Add Characters',
        button_add_pages: 'Add Pages',
        button_edit: 'Edit',
        button_details: 'Details',
        button_cancel: 'Cancel',
        button_create: 'Create',
        button_save: 'Save',
        button_delete: 'Delete',
        button_update: 'Update',
        button_update_word_count: 'Update Word Count',
        button_close: 'Close',
        button_login: 'Sign in',
        button_signup: 'Sign up',
        button_switch_to_signup: 'Switch to sign up',
        button_switch_to_login: 'Switch to sign in',
        button_proceed_without_login: 'Proceed without Login',
        button_google_login: 'Sign in with Google',
        button_google_register: 'Sign up with Google',
        button_send_reset_mail: 'Send email to reset password',
        button_add_note: 'Add note',

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
        label_dashboard: 'Dashboard',
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
        label_logs: 'Logs',
        label_count_entity: 'Entity',
        label_forgot_password: 'Forgot password',
        label_last_updated_project: 'Last updated project',
        label_works_in_project: 'Works in progress',
        label_words_today: 'Words today',
        label_words_statistic: 'Words statistic',
        label_genre: 'Genre',
        label_reward: 'Reward',
        label_show_more: 'Show more',
        label_show_less: 'Show less',
        label_publication_date: 'Publication date',
        label_publisher: 'Publisher',
        label_collection_title: 'Collection title',
        label_shoplink: 'Link to shop',
        label_event: 'Writing event',
        label_notes: 'Notes',

        placeholder_working_title: 'Working Title',
        placeholder_blurb: 'Blurb',
        placeholder_reward: 'Reward yourself for completing this project by...',

        tooltip_sort: 'sort',
        tooltip_filter: 'filter',
        tooltip_search: 'search',
        tooltip_wip: 'work in progress',
        tooltip_sort_deadline: 'sort by deadline',

        headline_word_count: 'Word Count',
        headline_total: 'Total',
        headline_new: 'New',
        headline_publication: 'Publication',
        headline_submission: 'Submission',
        headline_event: 'Event',

        error_unknown: 'An unexpected error occured.',
        error_email_exists: 'The email address is already in use by another account.',
        error_too_many_attempts_try_later: 'All requests from this device have been blocked due to unusual activity. Try again later.',
        error_email_not_found: 'Invalid credentials.',
        error_invalid_password: 'Invalid credentials.',
        error_user_disabled: 'The user account has been disabled by an administrator.',
        error_invalid_value: 'Invalid value',
        error_sign_in_failed: 'Sign In failed - please check credentials',
        error_sign_up_failed: 'Sign Up failed',
        error_forgot_pw_failed: 'Could not request new password',
        error_google_auth_failed: 'Authentication via google failed',

        msg_words_added: ' words added',
        msg_created: ' created',
        msg_saved: ' saved',
        msg_deleted: ' deleted',
        msg_account_deleted: 'Account deleted',
        msg_email_verified: 'Email verified',
        msg_reset_pw_email: 'Email to reset password has been send',
        msg_word_count_words_only: 'Characters and pages will not be added to word statistics',
        msg_note_added: 'Note was added to project',

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
