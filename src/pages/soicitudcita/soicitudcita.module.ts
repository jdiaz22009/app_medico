import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoicitudcitaPage } from './soicitudcita';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SoicitudcitaPage,
  ],
  imports: [
    IonicPageModule.forChild(SoicitudcitaPage),
    ComponentsModule
  ],
})
export class SoicitudcitaPageModule {}
