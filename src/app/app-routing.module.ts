import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'configure',
    loadChildren: () => import('./configurator/configurator.module').then(m => m.ConfiguratorModule)
  },
  {
    path: '',
    redirectTo: 'configure',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
