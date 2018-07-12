import {NgModule} from '@angular/core';
import {AngularSharedModule} from '@core/shared/angular.shared.module';
import {UIRouterModule} from '@uirouter/angular';
import {PlantsComponent} from './plants.component';
import {PlantModule} from '@components/plants/plant/plant.module';

const routes = [
  {
    name: 'plants',
    url: '/plants',
    component: PlantsComponent,
    data: {
      canActivate: {
        authGuard: true
      }
    }
  }
];

@NgModule({
  imports: [
    AngularSharedModule,
    UIRouterModule.forChild({
      states: routes
    }),
    PlantModule
  ],
  declarations: [
    PlantsComponent
  ],
  exports: []
})
export class PlantsModule {
}
