import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
  selector: '[gteValidator]',
  providers: [
    {
      provide: NG_VALIDATORS, useExisting: gteValidatorDirective, multi: true
    }
  ]
})
export class gteValidatorDirective implements Validator {

  @Input('gteNum') gteNum: number | undefined = 0;

  validate(control: FormControl): ValidationErrors | null {
    let v: number = +control.value;

    if (!v) return null;

    if (isNaN(v)) {
      return { 'gte': true, 'requiredValue': this.gteNum }
    }

    if (this.gteNum === undefined) {
      return { 'gte': true, 'requiredValue': this.gteNum }
    }

    if (v <= +this.gteNum) {
      return { 'gte': true, 'requiredValue': this.gteNum }
    }

    return null;
  }
}
