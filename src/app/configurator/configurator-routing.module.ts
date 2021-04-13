import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfiguratorComponent} from './configurator.component';
import {StepOneComponent} from './step-one/step-one.component';
import {StepTwoComponent} from './step-two/step-two.component';

const routes: Routes = [
  {
    path: '',
    component: ConfiguratorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguratorRoutingModule {
}
