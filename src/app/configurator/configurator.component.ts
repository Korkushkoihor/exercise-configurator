import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {StepOneComponent} from './step-one/step-one.component';
import {ExerciseConfigModel} from '../models/exercise-config.model';
import {StepTwoComponent} from './step-two/step-two.component';
import {MatHorizontalStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {
  @ViewChild('stepOneComponent', {static: true}) stepOneComponent: StepOneComponent;
  @ViewChild('stepTwoComponent', {static: true}) stepTwoComponent: StepTwoComponent;
  @ViewChild('stepper', {static: true}) stepper: MatHorizontalStepper;

  public stepOneConfig: ExerciseConfigModel;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  public changedStep(step: number): void {
    if (step === 1) {
      this.stepOneConfig = this.stepOneComponent.getConfig();
      this.changeDetectorRef.detectChanges();
      this.stepTwoComponent.init();
    }
  }

  public submittedStepOne(): void {
    this.stepper.next();
  }

  public pressedBackStepTwo(): void {
    this.stepper.previous();
  }

}
