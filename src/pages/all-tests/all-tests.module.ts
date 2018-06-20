import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllTestsPage } from './all-tests';

@NgModule({
  declarations: [
    AllTestsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllTestsPage),
  ],
})
export class AllTestsPageModule {}
