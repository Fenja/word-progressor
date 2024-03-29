import { RouterModule, Routes } from "@angular/router";
import { ProjectEditComponent } from "./project/project-edit/project-edit.component";
import { ProjectDetailComponent } from "./project/project-detail/project-detail.component";
import { NgModule } from "@angular/core";
import { ProjectsComponent } from "./project/projects.component";
import { ProjectListComponent } from "./project/project-list/project-list.component";
import { AuthComponent } from "./auth/auth.component";
import { SettingsComponent } from "./settings/settings.component";
import { PrivacyPolicyComponent } from "./settings/privacy-policy/privacy-policy.component";
import { VerifyEmailComponent } from "./auth/verify-email/verify-email.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BodyOfWorkComponent } from "./body-of-work/body-of-work.component";
import { SubmissionComponent } from "./submissions/submission.component";
import { SubmissionEditComponent} from "./submissions/submission-edit/submission-edit.component";
import { SubmissionListComponent } from "./submissions/submission-list/submission-list.component";
import { AuthGuard } from "./auth/auth.guard";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import {IdeasComponent} from "./ideas/ideas.component";
import {SubmissionDetailComponent} from "./submissions/submission-detail/submission-detail.component";

export const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'privacy_policy', component: PrivacyPolicyComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'body-of-work', component: BodyOfWorkComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, children: [
      { path: '', component: ProjectListComponent, canActivate: [AuthGuard] },
      { path: 'new', component: ProjectEditComponent, canActivate: [AuthGuard] },
      { path: 'new/:subid', component: ProjectEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: ProjectDetailComponent, canActivate: [AuthGuard] },
      { path: ':id/edit', component: ProjectEditComponent, canActivate: [AuthGuard] },
    ] },
  { path: 'ideas', component: IdeasComponent, canActivate: [AuthGuard] },
  { path: 'submissions', component: SubmissionComponent, children: [
      { path: '', component: SubmissionListComponent },
      { path: 'new', component: SubmissionEditComponent, /*canActivate: [AdminGuard]*/ },
      { path: ':id', component: SubmissionDetailComponent, /*canActivate: [AdminGuard] */},
      { path: ':id/edit', component: SubmissionEditComponent, /*canActivate: [AdminGuard] */},
    ] },

  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
