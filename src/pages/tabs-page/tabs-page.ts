import { Component } from '@angular/core';

import { NavParams, Events, NavController } from 'ionic-angular';

import { DashboardPage } from '../dashboard/dashboard';
import { ScansPage } from '../scans/scans';
import { ProfilePage } from '../profile/profile';
import { TalkPage } from '../talk/talk';
import { TestsPage } from '../tests/tests';
import { UserData } from '../../providers/user-data';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = DashboardPage;
  tab2Root: any = ScansPage;
  tab3Root: any = TestsPage;
  tab4Root: any = ProfilePage;
  tab5Root: any = TalkPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams, public events: Events,
    public userData: UserData,
    public navCtrl: NavController) {
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if(hasLoggedIn === true){
      this.mySelectedIndex = navParams.data.tabIndex || 0;
      }
      else{
        this.navCtrl.push(LoginPage);
      }
    });
    
  }

}
