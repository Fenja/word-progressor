import { Component } from '@angular/core';
import {DataStorageService} from "../services/data-storage.service";
import {Idea} from "./idea.model";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html'
})
export class IdeasComponent {

  text = '';
  ideas: Idea[] = [];
  isLoading = true;

  constructor(
    private dataStorageService: DataStorageService,
  ) {
    this.ideas = this.dataStorageService.getIdeas();
    this.dataStorageService.ideasList
      .pipe(filter(ideas => !!ideas))
      .subscribe(ideas => {
        this.ideas = ideas;
      });
    this.isLoading = false;
  }


  saveIdea() {
    if (this.text.trim() === '') return;
    let newIdea: Idea = { text: this.text.trim() }
    this.ideas.push(newIdea);
    this.dataStorageService.addIdea(newIdea)
    this.text = '';
  }
}
