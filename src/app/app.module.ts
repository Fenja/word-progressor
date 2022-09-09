import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectItemComponent } from './project/project-item/project-item.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { RouterModule } from "@angular/router";
import {appRoutes, AppRoutingModule} from "./app-routing.module";
import { ProjectFooterComponent } from './project/project-footer/project-footer.component';
import { MatTableModule } from "@angular/material/table";
import { ProjectsComponent } from "./project/projects.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { WordlogAddDialogComponent } from './wordlogs/wordlag-add-dialog/wordlog-add-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { TranslatePipe } from "./translation/translate.pipe";
import { ProjectProgressBarComponent } from './components/project-progress-bar/project-progress-bar.component';
import { AuthComponent } from './auth/auth.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AnonymousDialog } from './auth/anonymous-dialog/anonymous-dialog.component';
import { SettingsComponent } from './settings/settings.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTooltipModule } from "@angular/material/tooltip";
import { DeadlinePickerComponent } from './components/deadline-picker/deadline-picker.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { gteValidatorDirective } from "./components/gte-validator.directive";
import { PrivacyPolicyComponent } from './settings/privacy-policy/privacy-policy.component';
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { DashboardComponent } from './dashboard/dashboard.component';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import { ForgotPasswordDialog } from './auth/forgot-password/forgot-password.component';
import { ProjectOverviewComponent } from './project/project-overview/project-overview.component';
import { MatListModule } from "@angular/material/list";
import { SideNavComponent } from './header/side-nav/side-nav.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { NoteAddDialogComponent } from './notes/note-add-dialog/note-add-dialog.component';
import { TakeActionComponent } from './project/take-action/take-action.component';
import { PublicationComponent } from './publication/publication.component';
import { PublicationEditComponent } from './publication/publication-edit/publication-edit.component';
import { PublicationDialogComponent } from './publication/publication-dialog/publication-dialog.component';
import { RewardDialogComponent } from './project/reward-dialog/reward-dialog.component';
import { AchievementComponent } from './achievement/achievement.component';
import { WritingGoalsComponent } from './settings/writing-goals/writing-goals.component';
import { NotificationSettingsComponent } from './settings/notification-settings/notification-settings.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import {ServiceWorkerModule, SwRegistrationOptions} from '@angular/service-worker';
import { BarchartComponent } from './components/barchart/barchart.component';
import { WordlogListComponent } from './wordlogs/wordlog-list/wordlog-list.component';
import { WordlogItemComponent } from './wordlogs/wordlog-item/wordlog-item.component';
import { WordlogEditDialog } from './wordlogs/wordlog-edit-dialog/wordlog-edit-dialog.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { NoteItemComponent } from './notes/note-item/note-item.component';
import { NoteEditDialogComponent } from './notes/note-edit-dialog/note-edit-dialog.component';
import { BodyOfWorkComponent } from './body-of-work/body-of-work.component';
import { BowDetailComponent } from './body-of-work/bow-detail/bow-detail.component';
import { SubprojectEditComponent } from './project/subproject/subproject-edit/subproject-edit.component';
import { SubprojectItemComponent } from './project/subproject/subproject-item/subproject-item.component';
import { SubprojectOverviewComponent } from './project/subproject/subproject-overview/subproject-overview.component';
import { SubprojectDetailComponent } from './project/subproject/subproject-detail/subproject-detail.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { AuthGuard } from "./auth/auth.guard";
import { SubmissionComponent } from './submissions/submission.component';
import { SubmissionFooterComponent } from './submissions/submission-footer/submission-footer.component';
import { SubmissionListComponent } from './submissions/submission-list/submission-list.component';
import { SubmissionEditComponent } from './submissions/submission-edit/submission-edit.component';
import { SubmissionItemComponent } from './submissions/submission-item/submission-item.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {
  SubmissionSelectDialogComponent
} from "./submissions/submission-select-dialog/submission-select-dialog.component";
import {
  SubmissionReportDialogComponent
} from "./submissions/submission-report-dialog/submission-report-dialog.component";
import { OnlineStatusModule } from "ngx-online-status";
import {OverlayModule} from "@angular/cdk/overlay";
import {CitationComponent} from "./dashboard/citations/citation.component";
import {ThemeModule} from "./theme/theme.module";
import {wpTheme} from "./theme/wp-theme";
import {CustomizationComponent} from "./settings/customization/customization.component";
import {IdeasComponent} from "./ideas/ideas.component";
import {IdeaComponent} from "./ideas/idea/idea.component";
import {ProjectThumbnailComponent} from "./project/project-thumbnail/project-thumbnail.component";
import {DashboardSettingsComponent} from "./settings/dashboard-settings/dashboard-settings.component";
import {SubmissionDetailComponent} from "./submissions/submission-detail/submission-detail.component";

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectItemComponent,
    ProjectEditComponent,
    HeaderComponent,
    ProjectDetailComponent,
    ProjectFooterComponent,
    ProjectsComponent,
    WordlogAddDialogComponent,
    TranslatePipe,
    ProjectProgressBarComponent,
    AuthComponent,
    AnonymousDialog,
    SettingsComponent,
    DeadlinePickerComponent,
    gteValidatorDirective,
    PrivacyPolicyComponent,
    VerifyEmailComponent,
    DashboardComponent,
    ForgotPasswordDialog,
    ProjectOverviewComponent,
    ProjectThumbnailComponent,
    SideNavComponent,
    NoteAddDialogComponent,
    TakeActionComponent,
    PublicationComponent,
    PublicationEditComponent,
    PublicationDialogComponent,
    RewardDialogComponent,
    AchievementComponent,
    WritingGoalsComponent,
    NotificationSettingsComponent,
    BarchartComponent,
    WordlogListComponent,
    WordlogItemComponent,
    WordlogEditDialog,
    NoteListComponent,
    NoteItemComponent,
    NoteEditDialogComponent,
    BodyOfWorkComponent,
    BowDetailComponent,
    SubprojectEditComponent,
    SubprojectItemComponent,
    SubprojectOverviewComponent,
    SubprojectDetailComponent,
    SubmissionComponent,
    SubmissionFooterComponent,
    SubmissionListComponent,
    SubmissionEditComponent,
    SubmissionItemComponent,
    PagenotfoundComponent,
    SubmissionSelectDialogComponent,
    SubmissionReportDialogComponent,
    SubmissionDetailComponent,
    CitationComponent,
    CustomizationComponent,
    IdeasComponent,
    IdeaComponent,
    DashboardSettingsComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFirestoreModule,
    AngularFireAuthModule,

    AppRoutingModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    MatCardModule,
    MatProgressBarModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    RouterModule.forRoot(appRoutes),
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
    ServiceWorkerModule.register('ngsw-worker.js', /*{
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }*/),
    ThemeModule.forRoot({
      themes: [wpTheme],
      active: 'wp'
    }),
    MatAutocompleteModule,
    OnlineStatusModule,
    OverlayModule,
  ],
  providers: [
    AuthGuard,
    MatDatepickerModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {
      provide: SwRegistrationOptions,
      useFactory: () => ({ enabled: environment.production }),
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
