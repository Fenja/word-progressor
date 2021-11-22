import { Component, Input } from '@angular/core';
import { Publication } from "../publication.model";

@Component({
  selector: 'app-publication-edit',
  templateUrl: './publication-edit.component.html'
})
export class PublicationEditComponent {

  @Input() publication: Publication | undefined;

  deletePublication() {
    this.publication = undefined;
  }
}
