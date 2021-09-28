import { Pipe, PipeTransform } from "@angular/core";
import { TranslationService } from "./translation.service";

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {

  constructor(private translationService: TranslationService) {}

  transform(value: string): any {
    return this.translationService.translate(value);
  }
}
