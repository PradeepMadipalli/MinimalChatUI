import { Directive } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidation]'
})
export class PasswordValidationDirective {

  constructor() { }

}
