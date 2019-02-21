import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactoPage } from './contacto';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ContactoPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactoPage),
    ComponentsModule
  ],
})
export class ContactoPageModule {}
