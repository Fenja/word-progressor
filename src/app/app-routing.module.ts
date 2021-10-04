import { RouterModule, Routes } from "@angular/router";
import { ProjectEditComponent } from "./project/project-edit/project-edit.component";
import { ProjectDetailComponent } from "./project/project-detail/project-detail.component";
import { NgModule } from "@angular/core";
import { ProjectsComponent } from "./project/projects.component";
import { ProjectListComponent } from "./project/project-list/project-list.component";
import { AuthComponent } from "./auth/auth.component";
import { SettingsComponent } from "./settings/settings.component";
import { PrivacyPolicyComponent } from "./settings/privacy-policy/privacy-policy.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent, children: [
      { path: '', component: ProjectListComponent },
      { path: 'new', component: ProjectEditComponent },
      { path: ':id', component: ProjectDetailComponent },
      { path: ':id/edit', component: ProjectEditComponent },
    ] },
  { path: 'auth', component: AuthComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'privacy_policy', component: PrivacyPolicyComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
