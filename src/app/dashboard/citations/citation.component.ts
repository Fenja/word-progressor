import { Component, Input } from "@angular/core";
import CitationJson from "../../../assets/data/citations.json";
import {TranslationService} from "../../translation/translation.service";

/**
 * {
 *     "id": "000",
 *     "en": "I think I did pretty well, considering I started out with nothing but a bunch of blank paper.",
 *     "de": "...",
 *     "author": "Steve Martin"
 *   },
 */

@Component({
  selector: 'app-citation',
  templateUrl: './citation.component.html'
})
export class CitationComponent {

  @Input() newUser: boolean = false;
  todaysCitation: any;
  citation: string;

  constructor(private translationService: TranslationService) {
    const todaysId = Math.round(Date.parse(new Date().toString()) / 1000000) % 9; // todo differ free and paid version
    this.todaysCitation = CitationJson.find(citation => citation.id === '00'+todaysId.toString());

    const locale = this.translationService.getLocale();
    /*if (locale == 'de' && !!this.todaysCitation.de && this.todaysCitation.de !== '...') {
      this.citation = this.todaysCitation.de;
    } else {*/
      this.citation = this.todaysCitation.en;
    //}
  }
}
