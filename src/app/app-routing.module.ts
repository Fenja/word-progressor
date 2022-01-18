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
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'privacy_policy', component: PrivacyPolicyComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'body-of-work', component: BodyOfWorkComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, children: [
      { path: '', component: ProjectListComponent, canActivate: [AuthGuard] },
      { path: 'new', component: ProjectEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: ProjectDetailComponent, canActivate: [AuthGuard] },
      { path: ':id/edit', component: ProjectEditComponent, canActivate: [AuthGuard] },
    ] },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
