import { Injectable } from '@angular/core';
import { Note, Project } from "../project/project.model";
import { ProjectService } from "../project/project.service";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private projectService: ProjectService) { }

  editNote(project: Project, note: Note, newContent: any) {
    let existingNote = project.notes?.find(n => n.id === note.id);
    if (!existingNote || !project.notes) return;
    const index = project.notes?.indexOf(existingNote);
    existingNote.content = newContent;
    project.notes[index!] = existingNote;
    this.projectService.editProject(project.id!, project);
  }

  deleteNote(project: Project, note: Note) {
    let existingNote = project.notes?.find(n => n.id === note.id);
    if (!existingNote || !project.notes) return;
    const index = project.notes?.indexOf(existingNote);
    delete project.notes[index!];
    this.projectService.editProject(project.id!, project);
  }
}
