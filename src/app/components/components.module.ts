import {NgModule} from '@angular/core';
import {SharedModule} from '@components/shared/shared.module';
import {LoginModule} from '@components/login/login.module';
import {AlertsModule} from '@components/alerts/alerts.module';
import {BacklogModule} from '@components/backlog/backlog.module';
import {PlantsModule} from '@components/plants/plants.module';
import {AreasModule} from '@components/areas/areas.module';
import {LinesModule} from '@components/lines/lines.module';
import {MachinesModule} from '@components/machines/machines.module';
import {PartsModule} from '@components/parts/parts.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    LoginModule,
    AlertsModule,
    BacklogModule,
    PlantsModule,
    AreasModule,
    LinesModule,
    MachinesModule,
    PartsModule
  ],
  providers: [],
  exports: [
    SharedModule
  ]
})

export class ComponentsModule {

}
