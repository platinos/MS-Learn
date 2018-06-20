import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScansPage } from './scans';

@NgModule({
  declarations: [
    ScansPage,
  ],
  imports: [
    IonicPageModule.forChild(ScansPage),
  ],
})
export class ScansPageModule {}
