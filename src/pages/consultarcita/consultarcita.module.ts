import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultarcitaPage } from './consultarcita';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ConsultarcitaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultarcitaPage),
    ComponentsModule
  ],
})
export class ConsultarcitaPageModule {}
