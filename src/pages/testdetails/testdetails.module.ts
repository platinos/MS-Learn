import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestdetailsPage } from './testdetails';

@NgModule({
  declarations: [
    TestdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TestdetailsPage),
  ],
})
export class TestdetailsPageModule {}
