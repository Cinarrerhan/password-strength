import { Component } from '@angular/core';
import { strengthClassNames } from './consts/strength-class-name';
import {
  countSpaces,
  passwordContainsLowercaseLetter,
  passwordContainsNumber,
  passwordContainsSpaces,
  passwordContainsSymbol,
  passwordContainsUppercaseLetter,
} from './utils/regex-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'password-strength';

  points = {
    forEachCharacter: 1,
    forEachSpace: 1,
    containsLowercaseLetter: 2,
    containsUppercaseLetter: 2,
    containsNumber: 4,
    containsSymbol: 5,
  };

  secureStrength = 25;

  strengthClassName: { name: string; text: string };

  calculate(value) {
    let score = value.length * this.points.forEachCharacter;

    if (passwordContainsSpaces(value)) {
      score += countSpaces(value) * this.points.forEachSpace;
    }
    if (passwordContainsLowercaseLetter(value)) {
      score += this.points.containsLowercaseLetter;
    }
    if (passwordContainsUppercaseLetter(value)) {
      score += this.points.containsUppercaseLetter;
    }
    if (passwordContainsNumber(value)) {
      score += this.points.containsNumber;
    }
    if (passwordContainsSymbol(value)) {
      score += this.points.containsSymbol;
    }

    return score;
  }

  getStrengthClass(score) {
    let strengthIndex = parseInt(
      (
        Math.round(
          (score * (strengthClassNames.length - 1) * 100) / this.secureStrength
        ) / 100
      ).toString(),
      10
    );
    if (strengthIndex >= strengthClassNames.length) {
      strengthIndex = strengthClassNames.length - 1;
    }

    return strengthClassNames[strengthIndex];
  }

  onInput(event) {
    const score = this.calculate(event.target.value);
    this.strengthClassName = this.getStrengthClass(score);
  }
}
