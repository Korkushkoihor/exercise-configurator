import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ExerciseConfigModel} from '../../models/exercise-config.model';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent {
  @Output() submitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  public availableSelectValues: number[] = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    15,
    16
  ];

  public configureGroup: FormGroup = new FormGroup({
    maxNumbers: new FormControl(4),
    exerciseCount: new FormControl(8),
    amountOfActions: new FormControl(9),
    allowLowerRankNumbers: new FormControl(false),
  });

  public getConfig(): ExerciseConfigModel {
    return {
      maxNumbers: this.configureGroup.controls.maxNumbers.value,
      exerciseCount: this.configureGroup.controls.exerciseCount.value,
      amountOfActions: this.configureGroup.controls.amountOfActions.value,
      allowLowerRankNumbers: this.configureGroup.controls.allowLowerRankNumbers.value,
    };
  }

  public submitGroup(): void {
    this.submitted.emit(true);
  }

}
