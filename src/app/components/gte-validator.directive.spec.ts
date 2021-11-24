import { ComponentFixture, TestBed } from "@angular/core/testing";
import { gteValidatorDirective } from "./gte-validator.directive";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

describe('gteValidatorDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let input: any;
  let el: any;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [gteValidatorDirective, HostComponent],
    });

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

  });

  it('validates', () => {
    fixture.whenStable().then(() => {
      input = fixture.debugElement.query(By.css('[data-test-id="count-input"]')).nativeElement;
      expect(input).toBeTruthy();
      el = input.nativeElement;
      expect(el).toBeTruthy();
      console.log(JSON.stringify(el).toString());

      let result = new gteValidatorDirective().validate(input);
      expect(result).toBe(null);
    });
  });

  it('is valid with input gte num', () => {
    fixture.whenStable().then(() => {
      input = fixture.debugElement.query(By.css('[data-test-id="count-input"]')).nativeElement;
      el = input.nativeElement;
      el.value = 600;
      el.dispatchEvent(new Event('input'));

      let result = new gteValidatorDirective().validate(input);
      expect(result).toBe(null);
    });
  });

});


@Component({
  template: `<input
    type="number"
    data-test-id="count-input"
    gteValidator gteNum="500"
  >`
})
class HostComponent {}
