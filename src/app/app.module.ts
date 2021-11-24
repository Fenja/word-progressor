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
import { AppRoutingModule } from "./app-routing.module";
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
import { AddWordsDialogComponent } from './project/add-words-dialog/add-words-dialog.component';
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
import { AddNoteDialogComponent } from './project/add-note-dialog/add-note-dialog.component';
import { TakeActionComponent } from './project/take-action/take-action.component';
import { PublicationComponent } from './publication/publication.component';
import { PublicationEditComponent } from './publication/publication-edit/publication-edit.component';
import { PublicationDialogComponent } from './publication/publication-dialog/publication-dialog.component';
import { RewardDialogComponent } from './project/reward-dialog/reward-dialog.component';
import { AchievementComponent } from './achievement/achievement.component';

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
    AddWordsDialogComponent,
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
    SideNavComponent,
    AddNoteDialogComponent,
    TakeActionComponent,
    PublicationComponent,
    PublicationEditComponent,
    PublicationDialogComponent,
    RewardDialogComponent,
    AchievementComponent,
  ],
    imports: [
        AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
        AngularFirestoreModule,
        AngularFireAuthModule,

        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatProgressBarModule,
        MatMenuModule,
        MatButtonModule,
        MatTabsModule,
        RouterModule,
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
    ],
  providers: [
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
