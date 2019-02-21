import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CitaPage } from './cita';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CitaPage,
  ],
  imports: [
    IonicPageModule.forChild(CitaPage),
    ComponentsModule
  ],
})
export class CitaPageModule {}
