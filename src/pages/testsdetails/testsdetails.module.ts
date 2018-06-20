import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestsdetailsPage } from './testsdetails';

@NgModule({
  declarations: [
    TestsdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TestsdetailsPage),
  ],
})
export class TestsdetailsPageModule {}
