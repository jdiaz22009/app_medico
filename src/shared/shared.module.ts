import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SafePipe } from './pipe/safe.pipe';

@NgModule({
  declarations: [SafePipe],
  imports: [IonicModule],
  exports: [SafePipe]
})
export class SharedModule {}
