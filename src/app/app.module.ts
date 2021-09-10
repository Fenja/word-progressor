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
import { MatNativeDateModule } from "@angular/material/core";
import { FormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { AddWordsDialogComponent } from './project/add-words-dialog/add-words-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { TranslatePipe } from "./translation/translate.pipe";
import { ProjectProgressBarComponent } from './components/project-progress-bar/project-progress-bar.component';

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
  ],
  imports: [
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
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
