import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeAppPage } from './home-app';

@NgModule({
  declarations: [
    HomeAppPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeAppPage),
  ],
})
export class HomeAppPageModule {}
