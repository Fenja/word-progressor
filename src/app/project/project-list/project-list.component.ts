import {Component, OnDestroy} from '@angular/core';
import {Project, ProjectState} from "../project.model";
import {ProjectService} from "../project.service";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {Settings} from "../../auth/user.model";
import Utils from "../../helpers/utils";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnDestroy {

  isLoading = true;
  projects: Project[] = [];
  private allProjects: Project[];
  private subscriptions: Subscription[] = [];
  private settings: Settings = Utils.getDefaultSettings();

  get totalProjectsLength() {
    return this.allProjects.length;
  }
  get displayProjectsLength() {
    return this.projects.length;
  }

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
  ) {
    this.allProjects = this.projectService.getProjects();
    this._filterProjects();

    if( !!this.userService.getSettings() ) {
      this.settings = this.userService.getSettings()!;
    }
    this.subscriptions.push( this.userService.$filterChange.subscribe(() => this._filterProjects()));

    this.subscriptions.push( this.projectService.projectList.subscribe(projects => {
        this.allProjects = projects;
        this._filterProjects();
        this.isLoading = false;
      }
    ));

    this.subscriptions.push( this.userService.getUser().subscribe(user => {
      if (user && user.settings) this.settings = user.settings;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private _filterProjects() {
    this.projects = this.allProjects.filter(project => {

      if (this.settings.isHideAbandoned && project.state === ProjectState.abandon) return false;
      if (this.settings.isHidePublished && project.state === ProjectState.published) return false;
      if (this.settings.isHideFinished && project.state === ProjectState.finished) return false;
      if (this.settings.isHideSubmitted && project.state === ProjectState.submitted) return false;

      if (!this.settings.filterWip && !this.settings.filterSubprojects && !this.settings.filterDeadline) return true;
      let showWip = false;
      let showSubprojects = false;
      let showDeadline = false;
        if (this.settings.filterWip) showWip = project.isWorkInProgress;
        if (this.settings.filterSubprojects) showSubprojects = !!project.subprojects;
        if (this.settings.filterDeadline) showDeadline = !!project.deadline;
        return showWip || showSubprojects || showDeadline;
      }
    );

    if (this.settings.isSortByDeadline) {
      const today = Utils.normalizedToday();
      this.projects.sort((a: Project, b: Project) => {
        if (!a.deadline || Utils.normalizeDate(a.deadline) < today) return 1;
        else if (!b.deadline || Utils.normalizeDate(b.deadline) < today) return -1;
        else return new Date(a.deadline).valueOf() - new Date(b.deadline).valueOf();
      });
    } else if (this.settings.isSortAlphabetical){
      // filter by last edit
      this.projects.sort((a: Project, b: Project) => {
        return a.workingTitle.localeCompare(b.workingTitle);
      });
    } else if (this.settings.isSortByUpdate){
      // filter by last edit
      this.projects.sort((a: Project, b: Project) => {
        return new Date(b.lastUpdate).valueOf() - new Date(a.lastUpdate).valueOf();
      });
    }
  }

}
