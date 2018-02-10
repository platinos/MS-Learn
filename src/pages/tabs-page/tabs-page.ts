import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { DashboardPage } from '../dashboard/dashboard';
import { ScansPage } from '../scans/scans';
import { AllTestsPage } from '../all-tests/all-tests';
import { ProfilePage } from '../profile/profile';
import { TalkPage } from '../talk/talk';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = DashboardPage;
  tab2Root: any = ScansPage;
  tab3Root: any = AllTestsPage;
  tab4Root: any = ProfilePage;
  tab5Root: any = TalkPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
