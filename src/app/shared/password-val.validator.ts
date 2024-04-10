import { AbstractControl, ValidatorFn } from '@angular/forms';

export function strongPassword(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    // Check if the value contains at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(value);

    // Check if the value contains at least one lowercase letter
    const hasLowercase = /[a-z]/.test(value);

    // Check if the value contains at least one digit
    const hasNumber = /\d/.test(value);

    // Check if the value contains at least one special character
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    // Check if all conditions are met
    const isValid = hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter;

    // If all conditions are met, return null (no validation error)
    // Otherwise, return an object with the validation error
    return isValid ? null : { strongPassword: true };
  };
}
