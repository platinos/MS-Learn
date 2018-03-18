import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  dashboardPage : any;
  responseTrending: any = {
    "status": null,
    "error": null,
    "response": []
  };
  listingTrending: [{}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private ms: MessageServiceProvider) {
  }

  ionViewDidLoad() {
    this.dashboardPage = "dashboard";
    this.ms.getData("searches/trending").subscribe(data => {
      this.responseTrending = data;
      this.listingTrending = this.responseTrending.response;
    });
  }

}
