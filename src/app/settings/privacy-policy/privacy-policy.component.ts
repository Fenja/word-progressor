import { Component, OnInit } from '@angular/core';
import {TranslationService} from "../../translation/translation.service";

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html'
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(public translationService: TranslationService) { }

  ngOnInit(): void {
  }

}
