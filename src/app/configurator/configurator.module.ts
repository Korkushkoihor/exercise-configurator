import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ConfiguratorRoutingModule} from './configurator-routing.module';
import {ConfiguratorComponent} from './configurator.component';
import {StepOneComponent} from './step-one/step-one.component';
import {StepTwoComponent} from './step-two/step-two.component';

// Material
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {GroupByThreePipe} from '../pipes/group-by-three.pipe';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    ConfiguratorComponent,
    StepOneComponent,
    StepTwoComponent,
    GroupByThreePipe
  ],
  imports: [
    CommonModule,
    ConfiguratorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule
  ]
})
export class ConfiguratorModule {
}
