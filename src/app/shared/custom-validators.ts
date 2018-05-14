import {AbstractControl} from '@angular/forms';

export class CustomValidators {

  /**
   * Match two controls if they are the same
   * @param firstControlName
   * @param secondControlName
   * @returns {(AC: AbstractControl) => any}
   * @constructor
   */
  static Match(firstControlName, secondControlName) {
    return (AC: AbstractControl) => {
      let firstControlValue = AC.get(firstControlName).value; // to get value in input tag
      let secondControlValue = AC.get(secondControlName).value; // to get value in input tag
      if (firstControlValue != secondControlValue) {
        AC.get(secondControlName).setErrors({MatchFields: true});
      } else {
        return null
      }
    };
  }
}