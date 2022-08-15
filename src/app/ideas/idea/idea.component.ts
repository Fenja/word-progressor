import { Component, Input } from "@angular/core";
import { Idea } from "../idea.model";
import { DataStorageService } from "../../services/data-storage.service";
import { MatDialog } from "@angular/material/dialog";
import { TranslationService } from "../../translation/translation.service";

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html'
})
export class IdeaComponent {

  editMode = false;

  @Input() idea!: Idea;

  constructor(
    private dialog: MatDialog,
    private translationService: TranslationService,
    private dataStorageService: DataStorageService
  ) {}

  editIdea() {
    this.editMode = true;
  }

  saveIdea() {
    this.dataStorageService.editIdea(this.idea.id!, this.idea);
  }

  deleteIdea(idea: Idea) {
    this.dataStorageService.deleteIdea(idea.id!);
  }

  cancelEdit() {
    this.editMode = false;
  }
}
